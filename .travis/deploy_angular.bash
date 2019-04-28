#!/usr/bin/env bash
set -e

echo "${DOCKER_PASSWORD}" | docker login --username "${DOCKER_USERNAME}" --password-stdin

IMAGE_NAME=borisskert/cats-n-dogs:angular

docker build -t "${IMAGE_NAME}" ./angular

docker push "${IMAGE_NAME}"
