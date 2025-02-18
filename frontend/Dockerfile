# Use the official Node.js image as the base image
FROM node:18.9.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Expose the development server's port (Vite default is 5173)
EXPOSE 5173

# Copy the rest of the application files to the container
COPY . .

# Set the default command to run the development server
CMD ["npm", "run", "dev"]
