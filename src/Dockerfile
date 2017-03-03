FROM node:7.7

# Update everything that needs to be updated
RUN apt-get update

# Set the working directory
WORKDIR /srv/src

# Environment Variables
ENV PORT 3000

# Copy & install files for third party dependencies
COPY package.json /srv/src/
RUN npm install

# Copy our application code
COPY . /srv/src/

# Start the app
CMD npm start
