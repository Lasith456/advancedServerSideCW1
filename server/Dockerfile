#Get the base image
FROM node:20-alpine
# set the working directory
WORKDIR /app
#copy the package json files
COPY package*.json ./

# Install all packages
RUN npm install

RUN npm install nodemon
# copy all files
COPY . .

#expose port
EXPOSE 3001

#Strat application
CMD [ "npm","run","dev" ]