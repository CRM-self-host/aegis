# ===========================================================================
# Shared build stages (used by both targets)
# ===========================================================================

FROM node:24-alpine AS common-deps

RUN apk add --no-cache python3 make g++ cairo-dev pango-dev jpeg-dev giflib-dev

WORKDIR /app

COPY ./package.json ./yarn.lock ./.yarnrc.yml ./tsconfig.base.json ./nx.json /app/
COPY ./.yarn/releases /app/.yarn/releases
COPY ./.yarn/patches /app/.yarn/patches

COPY ./packages/emails/package.json /app/packages/emails/
COPY ./packages/server/package.json /app/packages/server/
COPY ./packages/server/patches /app/packages/server/patches
COPY ./packages/ui/package.json /app/packages/ui/
COPY ./packages/shared/package.json /app/packages/shared/
COPY ./packages/front/package.json /app/packages/front/
COPY ./packages/front-component-renderer/package.json /app/packages/front-component-renderer/

RUN yarn && yarn cache clean && npx nx reset


FROM common-deps AS aegis-server-build

COPY ./packages/emails /app/packages/emails
COPY ./packages/shared /app/packages/shared
COPY ./packages/ui /app/packages/ui
COPY ./packages/server /app/packages/server

RUN npx nx run server:lingui:extract && \
  npx nx run server:lingui:compile && \
  npx nx run emails:lingui:extract && \
  npx nx run emails:lingui:compile

RUN npx nx run server:build

# Clean server build output (type declarations and compiled tests are not needed at runtime;
# source maps are kept because aegis-infra extracts them from the image for Sentry uploads)
RUN find /app/packages/server/dist -name '*.d.ts' -delete \
 && rm -rf /app/packages/server/dist/packages/server/test

RUN yarn workspaces focus --production emails shared server


FROM common-deps AS aegis-front-build

ARG REACT_APP_SERVER_BASE_URL

COPY ./packages/front /app/packages/front
COPY ./packages/front-component-renderer /app/packages/front-component-renderer
COPY ./packages/ui /app/packages/ui
COPY ./packages/shared /app/packages/shared
RUN npx nx run front:lingui:extract && \
  npx nx run front:lingui:compile
# To skip the memory-intensive frontend build, pre-build on the host:
#  npx nx build front
# The check below will use packages/front/build/ if it already exists.
RUN if [ -d /app/packages/front/build ]; then \
   echo "Using pre-built frontend from host"; \
  else \
   NODE_OPTIONS="--max-old-space-size=8192" npx nx build front; \
  fi


# ===========================================================================
# Target: aegis-server (server only, no frontend)
#  docker build --target aegis-server -f packages/docker/aegis/Dockerfile .
# ===========================================================================

FROM node:24-alpine AS aegis-server

RUN apk add --no-cache curl jq postgresql-client

COPY ./packages/docker/aegis/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
WORKDIR /app/packages/server

ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION

# Workspace root config
COPY --chown=1000 --from=aegis-server-build /app/package.json /app/yarn.lock /app/.yarnrc.yml /app/
COPY --chown=1000 --from=aegis-server-build /app/tsconfig.base.json /app/nx.json /app/
COPY --chown=1000 --from=aegis-server-build /app/.yarn /app/.yarn
COPY --chown=1000 --from=aegis-server-build /app/node_modules /app/node_modules

# Server package (compiled dist + package.json only, no src/)
COPY --chown=1000 --from=aegis-server-build /app/packages/server/package.json /app/packages/server/
COPY --chown=1000 --from=aegis-server-build /app/packages/server/dist /app/packages/server/dist
COPY --chown=1000 --from=aegis-server-build /app/packages/server/patches /app/packages/server/patches

# Workspace packages (dist + package.json; node_modules symlinks resolve to these)
COPY --chown=1000 --from=aegis-server-build /app/packages/shared/package.json /app/packages/shared/
COPY --chown=1000 --from=aegis-server-build /app/packages/shared/dist /app/packages/shared/dist
COPY --chown=1000 --from=aegis-server-build /app/packages/emails/package.json /app/packages/emails/
COPY --chown=1000 --from=aegis-server-build /app/packages/emails/dist /app/packages/emails/dist
COPY --chown=1000 --from=aegis-server-build /app/packages/ui/package.json /app/packages/ui/
COPY --chown=1000 --from=aegis-server-build /app/packages/front/package.json /app/packages/front/

LABEL org.opencontainers.image.source=https://github.com/u84u/aegis
LABEL org.opencontainers.image.description="Aegis server image (no frontend)."

RUN mkdir -p /app/.local-storage /app/packages/server/.local-storage && \
  chown 1000:1000 /app/.local-storage /app/packages/server/.local-storage

USER 1000

CMD ["node", "dist/main"]
ENTRYPOINT ["/app/entrypoint.sh"]


# ===========================================================================
# Target: aegis-server-aws (server only + aws-cli, no frontend)
#  docker build --target aegis-server-aws -f packages/docker/aegis/Dockerfile .
# ===========================================================================

FROM aegis-server AS aegis-server-aws

USER root
RUN apk add --no-cache aws-cli
USER 1000


# ===========================================================================
# Target: aegis (server + frontend)
#  docker build --target aegis -f packages/docker/aegis/Dockerfile .
# ===========================================================================

FROM aegis-server AS aegis

ARG REACT_APP_SERVER_BASE_URL
ENV REACT_APP_SERVER_BASE_URL=$REACT_APP_SERVER_BASE_URL

COPY --chown=1000 --from=aegis-front-build /app/packages/front/build /app/packages/server/dist/front

LABEL org.opencontainers.image.description="Aegis image with backend and frontend."


# ===========================================================================
# Target: aegis-aws (server + frontend + aws-cli)
#  docker build --target aegis-aws -f packages/docker/aegis/Dockerfile .
# ===========================================================================

FROM aegis AS aegis-aws

USER root
RUN apk add --no-cache aws-cli
USER 1000


# ===========================================================================
# Target: aegis-app-dev (all-in-one with Postgres + Redis)
#  docker build --target aegis-app-dev -f packages/docker/aegis/Dockerfile .
# ===========================================================================

FROM alpine:3.20 AS s6-fetch
ARG S6_OVERLAY_VERSION=3.2.0.2
ARG TARGETARCH
RUN if [ "$TARGETARCH" = "arm64" ]; then echo "aarch64" > /tmp/s6arch; \
  else echo "x86_64" > /tmp/s6arch; fi
RUN S6_ARCH=$(cat /tmp/s6arch) && \
  wget -O /tmp/s6-overlay-noarch.tar.xz \
   "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz" && \
  wget -O /tmp/s6-overlay-noarch.tar.xz.sha256 \
   "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz.sha256" && \
  wget -O /tmp/s6-overlay-arch.tar.xz \
   "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_ARCH}.tar.xz" && \
  wget -O /tmp/s6-overlay-arch.tar.xz.sha256 \
   "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_ARCH}.tar.xz.sha256" && \
  cd /tmp && \
  NOARCH_SUM=$(awk '{print $1}' s6-overlay-noarch.tar.xz.sha256) && \
  ARCH_SUM=$(awk '{print $1}' s6-overlay-arch.tar.xz.sha256) && \
  echo "$NOARCH_SUM s6-overlay-noarch.tar.xz" | sha256sum -c - && \
  echo "$ARCH_SUM s6-overlay-arch.tar.xz" | sha256sum -c -

FROM node:24-alpine AS aegis-app-dev

# s6-overlay
COPY --from=s6-fetch /tmp/s6-overlay-noarch.tar.xz /tmp/
COPY --from=s6-fetch /tmp/s6-overlay-arch.tar.xz /tmp/
RUN tar -C / -Jxpf /tmp/s6-overlay-noarch.tar.xz \
 && tar -C / -Jxpf /tmp/s6-overlay-arch.tar.xz \
 && rm /tmp/s6-overlay-*.tar.xz

RUN apk add --no-cache \
  postgresql16 postgresql16-contrib \
  redis \
  curl jq su-exec

# Workspace root config
COPY --from=aegis-server-build /app/package.json /app/yarn.lock /app/.yarnrc.yml /app/
COPY --from=aegis-server-build /app/tsconfig.base.json /app/nx.json /app/
COPY --from=aegis-server-build /app/.yarn /app/.yarn
COPY --from=aegis-server-build /app/node_modules /app/node_modules

# Server package (compiled dist + package.json only, no src/)
COPY --from=aegis-server-build /app/packages/server/package.json /app/packages/server/
COPY --from=aegis-server-build /app/packages/server/dist /app/packages/server/dist
COPY --from=aegis-server-build /app/packages/server/patches /app/packages/server/patches

# Workspace packages (dist + package.json; node_modules symlinks resolve to these)
COPY --from=aegis-server-build /app/packages/shared/package.json /app/packages/shared/
COPY --from=aegis-server-build /app/packages/shared/dist /app/packages/shared/dist
COPY --from=aegis-server-build /app/packages/emails/package.json /app/packages/emails/
COPY --from=aegis-server-build /app/packages/emails/dist /app/packages/emails/dist
COPY --from=aegis-server-build /app/packages/ui/package.json /app/packages/ui/
COPY --from=aegis-server-build /app/packages/front/package.json /app/packages/front/

# Frontend static build
COPY --from=aegis-front-build /app/packages/front/build /app/packages/server/dist/front

# Source maps are not needed in the dev image (no Sentry)
RUN find /app/packages/server/dist -name '*.js.map' -delete

# s6 service definitions
COPY packages/docker/aegis-app-dev/rootfs/ /

RUN mkdir -p /data/postgres /data/redis /app/packages/server/.local-storage \
 && chown -R postgres:postgres /data/postgres \
 && chown 1000:1000 /data/redis /app/packages/server/.local-storage

ARG REACT_APP_SERVER_BASE_URL
ARG APP_VERSION=0.0.0

ENV S6_KEEP_ENV=1
ENV PG_DATABASE_URL=postgres://aegis:aegis@localhost:5432/default \
  SERVER_URL=http://localhost:2020 \
  REDIS_URL=redis://localhost:6379 \
  STORAGE_TYPE=local \
  APP_SECRET=aegis-app-dev-secret-not-for-production \
  REACT_APP_SERVER_BASE_URL=$REACT_APP_SERVER_BASE_URL \
  APP_VERSION=$APP_VERSION \
  NODE_ENV=development \
  NODE_PORT=2020 \
  DISABLE_DB_MIGRATIONS=true \
  DISABLE_CRON_JOBS_REGISTRATION=true \
  IS_BILLING_ENABLED=false \
  SIGN_IN_PREFILLED=true \
  APPLICATION_LOG_DRIVER=CONSOLE

EXPOSE 2020
VOLUME ["/data/postgres", "/app/packages/server/.local-storage"]

LABEL org.opencontainers.image.source=https://github.com/u84u/aegis
LABEL org.opencontainers.image.description="All-in-one Aegis image for local development and SDK usage. Includes PostgreSQL, Redis, server, and worker."

ENTRYPOINT ["/init"]
