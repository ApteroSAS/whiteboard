FROM node:16 as base

# Create app directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Install app dependencies
COPY ./package.json package-lock.json ./
RUN npm ci

# Bundle frontend
COPY src ./src
COPY assets ./assets
COPY config ./config
RUN npm run build

#####################
# Final image
#####################

FROM node:16
ENV NODE_ENV=prod

MAINTAINER cracker0dks

# Install Puppeteer dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        fonts-liberation \
        libappindicator3-1 \
        libasound2 \
        libatk-bridge2.0-0 \
        libcups2 \
        libdbus-1-3 \
        libgtk-3-0 \
        libnspr4 \
        libnss3 \
        libx11-xcb1 \
        libxcomposite1 \
        libxdamage1 \
        libxext6 \
        libxfixes3 \
        libxrandr2 \
        libxss1 \
        lsb-release \
        wget \
        xdg-utils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*
# Install Puppeteer
# When installing Puppeteer, it downloads a recent version of Chromium (~170Mb),
# If you want to skip this download when building the Docker image, set
# the PUPPETEER_SKIP_CHROMIUM_DOWNLOAD environment variable.
RUN npm install -g puppeteer

# Create app directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY ./package.json ./package-lock.json config.default.yml ./
RUN npm ci --only=prod

COPY scripts ./scripts
COPY --from=base /opt/app/dist ./dist

EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]
