FROM redis/redis-stack-server:latest

ENV REDIS_USERNAME=redis
ENV REDIS_PASSWORD=redis

# for redis configuration
COPY redis.conf /etc/redis/redis.conf
COPY users.acl /etc/redis/users.acl



# add dynamic configuration
RUN echo "user ${REDIS_USERNAME} on >${REDIS_PASSWORD} ~* &* +@all" > /etc/redis/users.acl
RUN echo "requirepass ${REDIS_PASSWORD}" >> /etc/redis/redis.conf


EXPOSE 6379

CMD ["redis-stack-server", "/etc/redis/redis.conf"]