FROM python:2.7-buster

SHELL ["/bin/bash", "--login", "-c"]

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
RUN nvm install 14
RUN npm install --global yarn

WORKDIR /ui-components
COPY . /ui-components
RUN git clean -fdx
RUN yarn install
RUN yarn pack
