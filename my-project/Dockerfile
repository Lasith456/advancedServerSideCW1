#Get the base image
FROM node:20-alpine
# set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all packages
RUN npm install

# copy all files
COPY . .

#expose port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
