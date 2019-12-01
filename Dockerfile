FROM node:12-alpine

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app

RUN npm install
RUN rm -f .npmrc

# TODO: - Add a build stage here.
COPY . /usr/src/app/

RUN npm run compile
CMD [ "npm", "run", "start" ]