#!/usr/bin/env bash

DOCKER_BUILD_PATH="${PWD}/springboot"
WORKING_DIRECTORY=/tmp/src

chmod 777 -R "${DOCKER_BUILD_PATH}"

docker run \
  --rm \
  -v "${DOCKER_BUILD_PATH}":"${WORKING_DIRECTORY}" \
  -v "${HOME}/.m2":/root/.m2 \
  -w "${WORKING_DIRECTORY}" \
  maven:3.6-alpine \
  "${WORKING_DIRECTORY}/docker/compile/build.sh"
