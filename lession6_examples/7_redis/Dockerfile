FROM redis:7.0-alpine

ENV REDIS_USERNAME=redis
ENV REDIS_PASSWORD=redis
ENV REDIS_DISABLE_DEFAULT_USER="true"

# for redis configuration
COPY redis.conf /usr/local/etc/redis/redis.conf

EXPOSE 6379

CMD redis-server /usr/local/etc/redis/redis.conf --requirepass "$REDIS_PASSWORD" --user "$REDIS_USERNAME" on ">${REDIS_PASSWORD}" ~* &>* +@all

