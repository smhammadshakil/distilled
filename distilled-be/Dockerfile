# Use official Node.js LTS image
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (for caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port NestJS runs on
EXPOSE 3000

# Install development tools (like nodemon)
RUN npm install --save-dev @nestjs/cli

# Default command: start in dev mode with hot reload
CMD ["npm", "run", "start:dev"]