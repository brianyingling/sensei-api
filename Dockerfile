# Use the latest Node
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install packages
RUN npm install

# Expose ports
EXPOSE 80

# Run app
CMD ["npm", "start"]

