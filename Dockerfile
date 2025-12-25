# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install root dependencies
COPY package*.json ./
RUN npm ci

# Install client dependencies
COPY client/package*.json ./client/
RUN cd client && npm ci

# Copy all source
COPY . .

# Build both
RUN npm run build:server
RUN cd client && npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files from builder (includes both dist/ and dist/client/)
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start the server
CMD ["node", "dist/server.js"]
