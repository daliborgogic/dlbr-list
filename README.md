# dlbr-list

> A prelaunch sign up double opt-in microservice


## Subscribe [/{email}]

+ Parameters

    + email: name@example.com (string) - Subscribers email.


### Send email [GET]

+ Request JSON Message

    + Headers

            Accept: application/json

+ Response 200 (application/json)

    + Body

            {
              "sent": true
            }

## OptIn [/{uuid}]

+ Parameters

    + uuid: 5a40e9b5b753c100013d6cba (string) - Unique identifier.


### Authenticate [GET]

+ Request JSON Message

    + Headers

            Accept: application/json

+ Response 200 (application/json)

    + Body

            {
              "authenticate": true
            }

## OptOut [/{unsubscribe}]

+ Parameters

    + unsubscribe: 5a40e9b5b753c100013d6cba (string) - Unique identifier.


### Unsubscribe [GET]

+ Request JSON Message

    + Headers

            Accept: application/json

+ Response 200 (application/json)

    + Body

            {
               "unsubscribed": "name@example.com"
            }

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
