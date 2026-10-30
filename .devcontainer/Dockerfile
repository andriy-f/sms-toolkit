FROM mcr.microsoft.com/devcontainers/javascript-node:24-trixie

USER root

# [Optional] Uncomment this section to install additional OS packages.
#RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#	&& apt-get -y install --no-install-recommends caddy postgresql-client-common \
#	&& /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y \
#	&& apt-get -y install --no-install-recommends postgresql-client-18

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"

RUN npm uninstall -g pnpm \
	&& npm install -g corepack@latest

USER node

ARG PNPM_INSTALL_DIR=/home/node/.local/bin
RUN mkdir -p $PNPM_INSTALL_DIR

RUN corepack enable --install-directory $PNPM_INSTALL_DIR pnpm \
	&& corepack install -g "pnpm@12.16.1+sha512.091d1dee7927575661b25dab3c2ae31cafc1c54d6b71ed6a6600cf0c1cb10434a447eae14015f1b23e2e6bedeed79df94a932e2164d2832280dce3fb32f656d1" \
	&& pnpm --version

ENV IS_DEV_CONTAINER=true