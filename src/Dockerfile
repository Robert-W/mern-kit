FROM node:7.7

# Add Yarn repositories
# RUN curl -sS http://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list

# Update everything that needs to be updated and install some extras
RUN apt-get -y update
# RUN apt-get install -y --no-install-recommends yarn
RUN apt-get clean

# Set the working directory
WORKDIR /srv/src

# Environment Variables
ENV PORT 3000

# Copy & install files for third party dependencies
ADD package.json /srv/src/package.json
RUN npm install
# RUN yarn install --pure-lockfile

# Copy our application code
COPY . /srv/src/

# Start the app
CMD npm start
