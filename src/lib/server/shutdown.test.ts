import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupGracefulShutdown, isServerShuttingDown } from './shutdown';

describe('Graceful Shutdown Handler', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockServer: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let processExitSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let consoleLogSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let consoleErrorSpy: any;

  beforeEach(() => {
    // Mock server object
    mockServer = {
      close: vi.fn((callback) => callback())
    };

    // Mock process.exit
    processExitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called');
    });

    // Mock console methods
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Reset module state
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Remove all listeners to prevent memory leaks
    process.removeAllListeners('SIGTERM');
    process.removeAllListeners('SIGINT');
    process.removeAllListeners('uncaughtException');
    process.removeAllListeners('unhandledRejection');
  });

  it('should install signal handlers', () => {
    const sigTermListeners = process.listenerCount('SIGTERM');
    const sigIntListeners = process.listenerCount('SIGINT');

    setupGracefulShutdown(mockServer);

    expect(process.listenerCount('SIGTERM')).toBe(sigTermListeners + 1);
    expect(process.listenerCount('SIGINT')).toBe(sigIntListeners + 1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Graceful shutdown handler installed');
  });

  it('should handle SIGTERM signal', () => {
    setupGracefulShutdown(mockServer);

    // Trigger SIGTERM
    expect(() => {
      process.emit('SIGTERM');
    }).toThrow('process.exit called');

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('SIGTERM received'));
    expect(mockServer.close).toHaveBeenCalled();
    expect(processExitSpy).toHaveBeenCalledWith(0);
  });

  it('should handle SIGINT signal', () => {
    setupGracefulShutdown(mockServer);

    // Trigger SIGINT
    expect(() => {
      process.emit('SIGINT');
    }).toThrow('process.exit called');

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('SIGINT received'));
    expect(mockServer.close).toHaveBeenCalled();
    expect(processExitSpy).toHaveBeenCalledWith(0);
  });

  it('should prevent multiple shutdown attempts', () => {
    setupGracefulShutdown(mockServer);

    // First signal
    expect(() => {
      process.emit('SIGTERM');
    }).toThrow('process.exit called');

    // Reset mock to track second call
    mockServer.close.mockClear();
    consoleLogSpy.mockClear();

    // Second signal should be ignored
    process.emit('SIGTERM');

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Already shutting down'));
    expect(mockServer.close).not.toHaveBeenCalled();
  });

  it('should handle uncaught exceptions', () => {
    setupGracefulShutdown(mockServer);

    const error = new Error('Test uncaught exception');
    
    expect(() => {
      process.emit('uncaughtException', error);
    }).toThrow('process.exit called');

    expect(consoleErrorSpy).toHaveBeenCalledWith('Uncaught Exception:', error);
    expect(mockServer.close).toHaveBeenCalled();
  });

  it('should handle unhandled rejections', () => {
    setupGracefulShutdown(mockServer);

    const reason = 'Test rejection reason';
    const promise = Promise.reject(reason);
    
    expect(() => {
      process.emit('unhandledRejection', reason, promise);
    }).toThrow('process.exit called');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Unhandled Rejection at:',
      promise,
      'reason:',
      reason
    );
    expect(mockServer.close).toHaveBeenCalled();
  });

  it('should handle server close errors', () => {
    const errorServer = {
      close: vi.fn((callback) => callback(new Error('Server close failed')))
    };

    setupGracefulShutdown(errorServer);

    expect(() => {
      process.emit('SIGTERM');
    }).toThrow('process.exit called');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error during server shutdown:',
      expect.any(Error)
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });

  it('should work without a server', () => {
    setupGracefulShutdown(); // No server provided

    expect(() => {
      process.emit('SIGTERM');
    }).toThrow('process.exit called');

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('SIGTERM received'));
    expect(processExitSpy).toHaveBeenCalledWith(0);
  });

  it('should report shutdown status correctly', async () => {
    // Import fresh module to reset state
    const { setupGracefulShutdown: setup, isServerShuttingDown: isShuttingDown } = 
      await import('./shutdown');

    expect(isShuttingDown()).toBe(false);

    // Mock process.exit for this test
    const exitMock = vi.spyOn(process, 'exit').mockImplementation(() => {
      // Don't actually exit
      return undefined as never;
    });

    setup(mockServer);
    
    // Start shutdown
    process.emit('SIGTERM');
    
    // Should now be shutting down
    expect(isShuttingDown()).toBe(true);

    exitMock.mockRestore();
  });

  it('should handle force exit timeout', () => {
    vi.useFakeTimers();

    const slowServer = {
      close: vi.fn(() => {
        // Never calls callback - simulates hanging server
      })
    };

    setupGracefulShutdown(slowServer);

    // Start shutdown process
    try {
      process.emit('SIGTERM');
      
      // Fast forward past timeout
      vi.advanceTimersByTime(11000); // 11 seconds
    } catch {
      // Expected from process.exit
    }

    expect(consoleErrorSpy).toHaveBeenCalledWith('Graceful shutdown timeout, forcing exit');
    expect(processExitSpy).toHaveBeenCalledWith(1);

    vi.useRealTimers();
  });
});