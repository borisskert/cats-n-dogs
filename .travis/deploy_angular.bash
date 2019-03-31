#!/usr/bin/env bash

IMAGE_NAME=borisskert/cats-n-dogs:angular

docker build -t "${IMAGE_NAME}" ./angular

docker login -u "${DOCKER_USERNAME}" -p "${DOCKER_PASSWORD}"
docker push "${IMAGE_NAME}"
