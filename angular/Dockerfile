FROM nginx:1.15.9

COPY ./dist/angular /usr/share/nginx/html
COPY ./docker/root /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
