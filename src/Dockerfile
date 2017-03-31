FROM node:7.7

# Update everything that needs to be updated and install some extras
RUN apt-get -y update
RUN apt-get clean

# Set the working directory
WORKDIR /srv/src

# Environment Variables
ENV PORT 3000

# Set some npm defaults
RUN echo "unsafe-perm = true" > /root/.npmrc

# Copy & install files for third party dependencies and tests
COPY package.json yarn.lock .eslintrc /srv/src/
RUN yarn install

# Copy our application code
COPY . /srv/src/

# Start the app
CMD npm start
