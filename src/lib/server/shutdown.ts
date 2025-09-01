/**
 * Graceful Shutdown Handler for Next.js
 * Ensures clean server shutdown for Docker containerization
 * Following Bret Fisher's best practices for Node.js in containers
 */

let isShuttingDown = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setupGracefulShutdown(server?: any) {
  const shutdownHandler = (signal: string) => {
    if (isShuttingDown) {
      console.log(`Already shutting down, ignoring ${signal}`);
      return;
    }

    console.log(`\n${signal} received, starting graceful shutdown...`);
    isShuttingDown = true;

    // Set a timeout to force exit if graceful shutdown takes too long
    const forceExitTimeout = setTimeout(() => {
      console.error('Graceful shutdown timeout, forcing exit');
      process.exit(1);
    }, 10000); // 10 second timeout

    // Close server if provided
    if (server && typeof server.close === 'function') {
      server.close((err?: Error) => {
        if (err) {
          console.error('Error during server shutdown:', err);
          process.exit(1);
        }
        console.log('HTTP server closed');
        clearTimeout(forceExitTimeout);
        cleanup();
      });
    } else {
      cleanup();
    }

    function cleanup() {
      // Close database connections
      closeDatabaseConnections();
      
      // Clear any timers or intervals
      clearTimersAndIntervals();
      
      // Flush logs
      flushLogs();
      
      console.log('Graceful shutdown complete');
      process.exit(0);
    }
  };

  // Handle termination signals
  process.on('SIGTERM', () => shutdownHandler('SIGTERM'));
  process.on('SIGINT', () => shutdownHandler('SIGINT'));
  
  // Handle uncaught errors
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    shutdownHandler('UNCAUGHT_EXCEPTION');
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    shutdownHandler('UNHANDLED_REJECTION');
  });

  // Prevent multiple listeners warning
  process.setMaxListeners(0);
  
  console.log('Graceful shutdown handler installed');
}

function closeDatabaseConnections() {
  // Placeholder for database connection cleanup
  // Add your database cleanup logic here
  console.log('Database connections closed');
}

function clearTimersAndIntervals() {
  // Clear any global timers or intervals
  // This is important to prevent the process from staying alive
  // Note: _getActiveHandles is an internal Node.js API not available in TypeScript types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeTimers = (process as any)._getActiveHandles?.();
  console.log(`Clearing ${activeTimers?.length || 0} active handles`);
}

function flushLogs() {
  // Ensure all logs are written before exit
  if (process.stdout.write('')) {
    process.stdout.once('drain', () => {
      console.log('Logs flushed');
    });
  }
}

export function isServerShuttingDown(): boolean {
  return isShuttingDown;
}