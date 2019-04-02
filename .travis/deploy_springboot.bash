#!/usr/bin/env bash

IMAGE_NAME=borisskert/cats-n-dogs:springboot

docker build -t "${IMAGE_NAME}" ./springboot

docker push "${IMAGE_NAME}"
