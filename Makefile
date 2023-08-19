
NEST_CONTAINER=pong-backend
REACT_CONTAINER=pong-frontend
POSTGRES_CONTAINER=pong-database
POSTGRES_VOLUME=postgres_data
USERNAME = $(shell id -nu)
GROUPNAME = $(shell id -ng)

all:
	docker-compose up -d --build
	chown $(USERNAME):$(GROUPNAME) -R $(POSTGRES_VOLUME)

down:
	docker-compose down

stop:
	docker stop $(NEST_CONTAINER) $(REACT_CONTAINER) $(POSTGRES_CONTAINER) || true

rm:
	docker rm $(NEST_CONTAINER) $(REACT_CONTAINER) $(POSTGRES_CONTAINER) || true

prune:
	docker system prune -a

logs_nest:
	docker logs -f $(NEST_CONTAINER)

logs_react:
	docker logs -f $(REACT_CONTAINER)

re: down all

fclean: stop rm prune
	