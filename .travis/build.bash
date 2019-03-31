#!/usr/bin/env bash
set -e

.travis/build_springboot.bash
.travis/build_angular.bash
