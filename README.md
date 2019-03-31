# Cats n' Dogs [![Build Status](https://travis-ci.com/borisskert/cats-n-dogs.svg?branch=master)](https://travis-ci.com/borisskert/cats-n-dogs)

This project contains code examples created for myself to reuse simple patterns in other projects.

## Folder structure

| sub-folder | description | documentation |
|------------|-------------|---------------|
| `./angular` | Angular with ngrx examples | [README](./angular/README.md) |
| `./springboot` | Spring boot examples written in java | [README](./springboot/README.md) |

## Build the solution

Consider corresponding README files within the sub-folders.

## Run the solution

### Run with images from docker hub

```bash
$ docker-compose --project-name hub.catsndocs --file hub.docker-compose.yml down --remove-orphans && docker-compose --project-name hub.catsndocs --file hub.docker-compose.yml up
```

## Run from the source code

You can run the solution after you built it within docker.

Use this command:

```bash
$ docker-compose down --remove-orphans && docker-compose up --build
```

## Further links

* [Repository on docker hub](https://cloud.docker.com/u/borisskert/repository/docker/borisskert/cats-n-dogs)
