FROM node:7.7

# Update everything that needs to be updated and install some extras
RUN apt-get -y update
RUN apt-get clean

# Set the working directory
WORKDIR /srv/src

# Environment Variables
ENV PORT 3000
ENV NODE_PATH /srv/src/packages

# Set some npm defaults
RUN echo "unsafe-perm = true" > /root/.npmrc

# Copy our package.json & install any third party dependencies
COPY package.json /srv/src/package.json
RUN yarn install

# Copy the rest of our application code, do this separately from above so
# that every change does not cause the node_modules to be installed on every build
COPY . /srv/src/

# Start the app
CMD npm start
