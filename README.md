# dlbr-list

> A prelaunch sign up double opt-in microservice

```bash
# Create `.env` file
cat > .env << EOL
MONGODB_ADMIN_USER=
MONGODB_ADMIN_PASS=
MONGODB_APPLICATION_DATABASE=
MONGODB_APPLICATION_USER=
MONGODB_APPLICATION_PASS=
POSTMARK_FROM=
POSTMARK_KEY=
DOMAIN=
EOL

# Build and run all the containers in a deamon mode
$ docker-compose -f docker-compose.yml up -d

# Build independently

# mongodb
$ docker-compose -f docker-compose.yml build mongodb && \
  docker-compose -f docker-compose.yml up -d mongodb
# app
$ docker-compose -f docker-compose.yml build app && \
  docker-compose -f docker-compose.yml up -d app

# Or add to `.bash_aliases`
dcb () {
  docker-compose -f docker-compose.yml build "$@" && \ 
  docker-compose -f docker-compose.yml up -d "$@"
}

$ dcb [service_name]
```
