
# don't edit the mapped files ( it'll affect on host machine )

mkdir -p "/etc/redis"
cp /redis/redis.conf /etc/redis/redis.conf
cp /redis/users.acl /etc/redis/users.acl


# single quote
# echo 'user ${REDIS_USERNAME} on >${REDIS_PASSWORD} ~* &* +@all' | envsubst >> /etc/redis/users.acl

echo "user ${REDIS_USERNAME} on >${REDIS_PASSWORD} ~* &* +@all" >> /etc/redis/users.acl

echo "requirepass ${REDIS_PASSWORD}" >> /etc/redis/redis.conf


: '
 to debug run the redid-stack-server without config files
 then enter into container & debus

 $ redis-stack-server

'

# redis-stack-server   # for debug
 redis-stack-server /etc/redis/redis.conf

# redis-stack-server --requirepass $REDIS_PASSWORD  # this also works