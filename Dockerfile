
FROM node:18-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expose the port
EXPOSE 3000

# Use nodemon for development
CMD ["npx", "nodemon", "index.js"]
