#!/bin/bash
set -m

mongodb_cmd="mongod --bind_ip 0.0.0.0 --logpath /data/db/log"
cmd="$mongodb_cmd"

if [ "$AUTH" == "yes" ]; then
    cmd="$cmd --auth"
fi

$cmd &

if [ ! -f /data/db/.mongodb_password_set ]; then
    /set_mongodb_password.sh
fi

fg
