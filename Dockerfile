FROM docker.io/node:22-trixie

WORKDIR /ui-components
COPY . /ui-components

RUN git clean -fdx
RUN yarn install
RUN yarn pack --out pkg/%s-%v.tgz
