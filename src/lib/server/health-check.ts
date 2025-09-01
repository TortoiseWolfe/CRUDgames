/**
 * Health Check Endpoint for Docker/Kubernetes
 * Returns server health status for container orchestration
 */

import { isServerShuttingDown } from './shutdown';

export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'shutting_down';
  timestamp: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  checks: {
    server: boolean;
    database?: boolean;
    redis?: boolean;
  };
}

const startTime = Date.now();

export async function getHealthStatus(): Promise<HealthStatus> {
  const memUsage = process.memoryUsage();
  const os = await import('os');
  const totalMem = os.totalmem();
  const usedMem = memUsage.heapUsed + memUsage.external;
  
  const status: HealthStatus = {
    status: isServerShuttingDown() ? 'shutting_down' : 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    memory: {
      used: Math.round(usedMem / 1024 / 1024), // MB
      total: Math.round(totalMem / 1024 / 1024), // MB
      percentage: Math.round((usedMem / totalMem) * 100)
    },
    checks: {
      server: !isServerShuttingDown(),
      // Add database check here
      // Add redis check here
    }
  };

  // Mark as unhealthy if any critical checks fail
  if (!status.checks.server) {
    status.status = 'unhealthy';
  }

  return status;
}

export function createHealthCheckHandler() {
  return async (): Promise<Response> => {
    const health = await getHealthStatus();
    const statusCode = health.status === 'healthy' ? 200 : 503;
    
    return new Response(JSON.stringify(health, null, 2), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  };
}