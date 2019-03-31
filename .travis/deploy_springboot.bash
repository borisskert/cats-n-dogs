#!/usr/bin/env bash

IMAGE_NAME=borisskert/cats-n-dogs:springboot

docker build -t "${IMAGE_NAME}" ./springboot

docker login -u "${DOCKER_USERNAME}" -p "${DOCKER_PASSWORD}"
docker push "${IMAGE_NAME}"
