# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.16.0

# Stage 1: Build the frontend client
FROM node:${NODE_VERSION}-alpine as builder
WORKDIR /app/client
# Copy client dependencies
COPY client/package*.json ./
RUN npm ci
# Copy client source and build
COPY client/ ./
RUN npm run build

# Stage 2: Setup the backend server
FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app

# Copy server dependencies
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev

# Copy server source
COPY server/ ./

# The server looks for the frontend client in "../client/dist"
# from "/usr/src/app" (which resolves to "/usr/src/client/dist").
# We copy the built client files to that expected location.
COPY --from=builder /app/client/dist /usr/src/client/dist

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
CMD ["npm", "start"]
