# Docker Environment PRP

## System Overview

### Purpose
Containerized development and production environments ensuring consistent Node.js runtime, system dependencies, and build processes across all developer machines and deployment targets. Eliminates "works on my machine" issues through environment standardization.

### Business Value
- **Problem it solves**: Environment inconsistencies causing bugs and deployment failures
- **Target users**: Developers, DevOps teams, CI/CD pipelines
- **Success metrics**: Zero environment-related bugs, 100% reproducible builds, reduced onboarding time

## Technical Specifications

### Docker Compose Configuration
```yaml
version: '3.8'

services:
  # Development environment
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
      args:
        NODE_VERSION: 22-alpine
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    ports:
      - "3000:3000"     # Next.js
      - "6006:6006"     # Storybook
    environment:
      - NODE_ENV=development
      - WATCHPACK_POLLING=true
    command: npm run dev

  # Test environment
  test:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=test
    command: npm run test:watch

  # Production build
  build:
    build:
      context: .
      dockerfile: Dockerfile
      target: builder
    volumes:
      - ./out:/app/out
    command: npm run build
```

### Development Dockerfile (Dockerfile.dev)
```dockerfile
# Pin exact Node.js version
FROM node:22-alpine AS base

# Install dependencies for native modules
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Install dependencies (cached layer)
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

# Copy application code
COPY . .

# Expose ports
EXPOSE 3000 6006

# Development command
CMD ["npm", "run", "dev"]
```

### Production Multi-Stage Dockerfile
```dockerfile
# Stage 1: Dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Runner (for API routes if needed)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]

# Stage 4: Static Export (for GitHub Pages)
FROM nginx:alpine AS static
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Configuration

### Required Environment Files
```bash
# .env.development
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# .env.test
NODE_ENV=test
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

### Docker Ignore File (.dockerignore)
```
node_modules
.next
out
.git
.gitignore
*.md
.env*.local
coverage
.vscode
.idea
*.log
.DS_Store
```

## Development Workflow

### Initial Setup
```bash
# Build development container
docker-compose build dev

# Start development environment
docker-compose up dev

# Run in background
docker-compose up -d dev

# View logs
docker-compose logs -f dev
```

### Common Commands
```bash
# Install new dependency
docker-compose exec dev npm install package-name

# Run tests
docker-compose run test

# Build for production
docker-compose run build

# Format code
docker-compose exec dev npm run format

# Lint
docker-compose exec dev npm run lint

# Type check
docker-compose exec dev npm run type-check
```

### Storybook Development
```bash
# Start Storybook in container
docker-compose exec dev npm run storybook

# Build Storybook
docker-compose exec dev npm run build-storybook
```

## CI/CD Integration

### GitHub Actions with Docker
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build test container
        run: docker-compose build test
      
      - name: Run tests
        run: docker-compose run test npm run test:ci
      
      - name: Run linting
        run: docker-compose run test npm run lint
      
      - name: Type check
        run: docker-compose run test npm run type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build production
        run: docker-compose run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: production-build
          path: out/
```

## Performance Optimization

### Docker Build Optimization
```dockerfile
# Cache mount for npm
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit

# Multi-stage parallel builds
FROM base AS deps
RUN npm ci --only=production

FROM base AS dev-deps
RUN npm ci

# Layer caching strategies
COPY package*.json ./
RUN npm ci
COPY . .
```

### Container Resource Limits
```yaml
services:
  dev:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4G
        reservations:
          cpus: '1'
          memory: 2G
```

## Security Considerations

### Security Best Practices
```dockerfile
# Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Minimal base image
FROM node:22-alpine

# No shell in production
FROM scratch AS final

# Security scanning
RUN npm audit --production
```

### Secret Management
```yaml
services:
  dev:
    env_file:
      - .env.development
    secrets:
      - source: api_key
        target: api_key
        mode: 0400

secrets:
  api_key:
    file: ./secrets/api_key.txt
```

## Troubleshooting

### Common Issues and Solutions

#### Port Already in Use
```bash
# Check what's using port 3000
lsof -i :3000

# Use different port
docker-compose run -p 3001:3000 dev
```

#### Node Modules Issues
```bash
# Rebuild node_modules
docker-compose run dev rm -rf node_modules
docker-compose run dev npm ci
```

#### Permission Issues
```bash
# Fix ownership
docker-compose exec dev chown -R node:node /app
```

#### Build Cache Issues
```bash
# Clear Docker cache
docker-compose build --no-cache dev

# Prune Docker system
docker system prune -a
```

## Platform-Specific Configurations

### macOS with Apple Silicon
```dockerfile
FROM --platform=linux/amd64 node:22-alpine
# or
FROM --platform=linux/arm64 node:22-alpine
```

### Windows with WSL2
```yaml
services:
  dev:
    environment:
      - CHOKIDAR_USEPOLLING=true
      - WATCHPACK_POLLING=true
```

### Linux Host
```yaml
services:
  dev:
    user: "${UID}:${GID}"
    environment:
      - HOME=/tmp
```

## Monitoring & Debugging

### Container Health Checks
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {r.statusCode === 200 ? process.exit(0) : process.exit(1)})"
```

### Debug Configuration
```yaml
services:
  dev:
    environment:
      - DEBUG=*
      - NODE_OPTIONS=--inspect=0.0.0.0:9229
    ports:
      - "9229:9229"  # Node.js debugger
```

## Acceptance Criteria

### Functional Requirements
- [ ] Development container starts successfully
- [ ] Hot reload works in container
- [ ] All npm scripts work in container
- [ ] Production build completes
- [ ] Tests run in container
- [ ] Storybook runs in container

### Non-Functional Requirements
- [ ] Build time < 5 minutes
- [ ] Container size < 500MB (production)
- [ ] Memory usage < 2GB (development)
- [ ] CPU usage reasonable
- [ ] Works on Mac/Windows/Linux
- [ ] CI/CD integration works

### Quality Gates
- [ ] No security vulnerabilities
- [ ] Non-root user in production
- [ ] Secrets properly managed
- [ ] Health checks implemented
- [ ] Logs properly configured
- [ ] Documentation complete

## Migration Guide

### From Local Development to Docker
```bash
# 1. Install Docker Desktop
# 2. Clone repository
git clone <repo>
cd <repo>

# 3. Create .env.development
cp .env.example .env.development

# 4. Build and start
docker-compose up dev

# 5. Access application
open http://localhost:3000
```

## Related PRPs
- `DeploymentPipeline.prp.md` - CI/CD configuration
- `PerformanceTargets.prp.md` - Performance requirements
- `SecurityRequirements.prp.md` - Security standards

---
**Last Updated**: 2025-08-30
**Version**: 1.0.0
**Review Status**: Ready