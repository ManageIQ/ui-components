FROM python:2.7-buster

ENV NVM_DIR /usr/local/nvm

RUN mkdir -p $NVM_DIR
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash \
  && . $NVM_DIR/nvm.sh && nvm install 14 && nvm use 14 && npm install --global yarn

WORKDIR /ui-components
COPY . /ui-components
RUN git clean -fdx
RUN . $NVM_DIR/nvm.sh && nvm use 14 && yarn install && yarn pack
