
: '



    ############################# method-1 #############################
    # one time
    # info: add vm.overcommit_memory=1 in '/etc/sysctl.conf'  ( we did this )
    # sudo sysctl -p  # apply the changes

    docker compose up -d


'



############################# method-2 #############################

# one time
# add vm.overcommit_memory=1 in '/etc/sysctl.conf'  ( we did this )
# sudo sysctl -p  # apply the changes
# docker build --tag redis-local .

docker run --privileged -d -p 6379:6379 --name redis-local redis-local




