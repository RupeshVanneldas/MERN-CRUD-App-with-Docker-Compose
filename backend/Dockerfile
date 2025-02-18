# Use an official Node.js runtime as the base image
FROM node:18.9.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application's port (should match the Express server's port)
EXPOSE 5050

# Define the command to run the application
CMD ["npm", "start"]
