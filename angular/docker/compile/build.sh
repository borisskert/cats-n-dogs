#!/usr/bin/env sh

npm ci
npm run lint
npm run test
npm run build-storybook
npm run prod
