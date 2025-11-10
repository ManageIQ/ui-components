FROM docker.io/node:18-bullseye

RUN apt-get update && \
    apt-get install -y python2

WORKDIR /ui-components
COPY . /ui-components

RUN git clean -fdx
RUN yarn install
RUN yarn pack
