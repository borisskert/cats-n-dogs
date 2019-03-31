#!/usr/bin/env bash

DOCKER_BUILD_PATH="${PWD}/angular"
WORKING_DIRECTORY=/tmp/src

chmod 777 -R "${DOCKER_BUILD_PATH}"

docker run \
  --rm \
  -v "${DOCKER_BUILD_PATH}:${WORKING_DIRECTORY}" \
  -w "${WORKING_DIRECTORY}" \
  node:11-alpine \
  "${WORKING_DIRECTORY}/docker/compile/build.sh"
