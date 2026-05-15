FROM node:24-alpine AS aegis-website-build


WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./.yarnrc.yml .
COPY ./.yarn/releases /app/.yarn/releases
COPY ./.yarn/patches /app/.yarn/patches
COPY ./packages/aegis-ui/package.json /app/packages/aegis-ui/
COPY ./packages/aegis-shared/package.json /app/packages/aegis-shared/
COPY ./packages/aegis-website/package.json /app/packages/aegis-website/package.json

RUN yarn

ENV KEYSTATIC_GITHUB_CLIENT_ID="<fake build value>"
ENV KEYSTATIC_GITHUB_CLIENT_SECRET="<fake build value>"
ENV KEYSTATIC_SECRET="<fake build value>"
ENV NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG="<fake build value>"

COPY ./packages/aegis-ui /app/packages/aegis-ui
COPY ./packages/aegis-website /app/packages/aegis-website
RUN npx nx build aegis-website

FROM node:24-alpine AS aegis-website

WORKDIR /app/packages/aegis-website

COPY --from=aegis-website-build /app /app

WORKDIR /app/packages/aegis-website

LABEL org.opencontainers.image.source=https://github.com/u84u/aegis
LABEL org.opencontainers.image.description="This image provides a consistent and reproducible environment for the website."

RUN chown -R 1000 /app

# Use non root user with uid 1000
USER 1000

CMD ["/bin/sh", "-c", "npx nx start"]
