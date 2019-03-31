#!/usr/bin/env bash

IMAGE_NAME=borisskert/cats-n-dogs:angular

docker build -t "${IMAGE_NAME}" ./angular

docker push "${IMAGE_NAME}"
