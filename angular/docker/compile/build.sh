#!/usr/bin/env sh

whereis google-chrome
npm ci
npm run lint
npm run ci-test
npm run build-storybook
npm run prod
