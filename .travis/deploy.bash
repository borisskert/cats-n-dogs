#!/usr/bin/env bash
set -e

echo "${DOCKER_PASSWORD}" | docker login --username "${DOCKER_USERNAME}" --password-stdin

.travis/deploy_springboot.bash
.travis/deploy_angular.bash
