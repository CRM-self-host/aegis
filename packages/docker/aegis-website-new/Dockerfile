FROM node:24-alpine AS aegis-website-new-build


WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./.yarnrc.yml .
COPY ./tsconfig.base.json .
COPY ./nx.json .
COPY ./.yarn/releases /app/.yarn/releases
COPY ./.yarn/patches /app/.yarn/patches
COPY ./packages/aegis-website-new/package.json /app/packages/aegis-website-new/package.json

RUN yarn

COPY ./packages/aegis-website-new /app/packages/aegis-website-new
RUN npx nx build aegis-website-new

FROM node:24-alpine AS aegis-website-new

WORKDIR /app/packages/aegis-website-new

COPY --from=aegis-website-new-build /app /app

WORKDIR /app/packages/aegis-website-new

LABEL org.opencontainers.image.source=https://github.com/u84u/aegis
LABEL org.opencontainers.image.description="This image provides a consistent and reproducible environment for the new marketing website."

RUN chown -R 1000 /app

# Use non root user with uid 1000
USER 1000

CMD ["/bin/sh", "-c", "npx nx start aegis-website-new"]
