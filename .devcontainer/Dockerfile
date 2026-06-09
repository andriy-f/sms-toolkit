FROM mcr.microsoft.com/devcontainers/javascript-node:24-trixie

USER root

RUN npm uninstall -g pnpm \
	&& npm install -g corepack@latest

USER node

ENV MY_BIN_DIR=/home/node/bin
RUN mkdir -p $MY_BIN_DIR
ENV PATH=$PATH:$MY_BIN_DIR

RUN corepack enable --install-directory $MY_BIN_DIR pnpm \
	&& corepack install -g "pnpm@11.5.2+sha512.71c631e382066efc25625d5cf029075de07b61b37f6e27350fbd84b1bda5864c8c1967adc280776b45c30a715c0359a3be08fef42d5bb09e2b99029979692916"