#
# ---- Base Node ----
FROM node:12-alpine AS base

# install node
RUN apk add --no-cache nodejs-current tini
# set working directory
WORKDIR /app
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]
# copy project file
COPY package.json .

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm install --production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install

#
# ---- Test ----
# run linters, setup and tests
FROM dependencies AS test
COPY . .
RUN  npm run lint && npm run test

#
# ---- Build ----
FROM base AS build
# copy app sources
COPY . .
# copy dev node_modules
COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules
# build app
RUN npm run build

#
# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --chown=node:node --from=dependencies /app/prod_node_modules ./node_modules
# copy app build
COPY --chown=node:node . .
COPY --chown=node:node --from=build /app/dist ./dist
# expose port and define CMD
EXPOSE 3000
# set user
USER node
# set env variables
ENV NODE_ENV=production
# run app
CMD npm run start