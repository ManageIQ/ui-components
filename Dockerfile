FROM docker.io/node:20-trixie

WORKDIR /ui-components
COPY . /ui-components

RUN git clean -fdx
RUN yarn install
RUN yarn pack
