FROM node:21

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy the rest of your application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application using the start command
CMD ["npm", "run", "start:prod"]
