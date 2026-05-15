# Makefile for building and running Aegis CRM docker containers.
# Set the tag and/or target build platform using make command-line variables assignments.
#
# Optional make variables:
# PLATFORM - defaults to 'linux/amd64'
# TAG      - defaults to 'latest'
#
# Example: make prod-build
# Example: make PLATFORM=linux/aarch64 TAG=my-tag prod-build
# Example: make postgres-on-docker (for local development)

PLATFORM ?= linux/amd64
TAG ?= latest
DOCKER_USER ?= u84u
DOCKER ?= podman
DOCKER_NETWORK=aegis_network

# =============================================================================
# Production Image Building
# =============================================================================

prod-build:
	@cd ../.. && $(DOCKER) build --target aegis -f ./packages/aegis-docker/aegis/Dockerfile --platform $(PLATFORM) --tag aegis:$(TAG) --tag $(DOCKER_USER)/aegis:$(TAG) . && cd -

prod-push:
	@$(DOCKER) push $(DOCKER_USER)/aegis:$(TAG)

prod-run:
	@$(DOCKER) run -d -p 3000:3000 --name aegis aegis:$(TAG)

prod-postgres-run:
	@$(DOCKER) run -d -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres --name aegis-postgres aegis-postgres:$(TAG)

prod-website-build:
	@cd ../.. && $(DOCKER) build -f ./packages/aegis-docker/aegis-website/Dockerfile --platform $(PLATFORM) --tag aegis-website:$(TAG) --tag $(DOCKER_USER)/aegis-website:$(TAG) . && cd -

prod-website-push:
	@$(DOCKER) push $(DOCKER_USER)/aegis-website:$(TAG)

prod-website-run:
	@$(DOCKER) run -d -p 3000:3000 --name aegis-website aegis-website:$(TAG)

# =============================================================================
# Local Development Services
# Run these from the repository root: make -C packages/aegis-docker <target>
# =============================================================================

ensure-docker-network:
	$(DOCKER) network inspect $(DOCKER_NETWORK) >/dev/null 2>&1 || $(DOCKER) network create $(DOCKER_NETWORK)

postgres-on-docker: ensure-docker-network
	$(DOCKER) run -d --network $(DOCKER_NETWORK) \
	--name aegis_pg \
	-e POSTGRES_USER=postgres \
	-e POSTGRES_PASSWORD=postgres \
	-e ALLOW_NOSSL=true \
	-v aegis_db_data:/var/lib/postgresql/data \
	-p 5432:5432 \
	postgres:16
	@echo "Waiting for PostgreSQL to be ready..."
	@until $(DOCKER) exec aegis_pg psql -U postgres -d postgres \
		-c 'SELECT pg_is_in_recovery();' 2>/dev/null | grep -q 'f'; do \
		sleep 1; \
	done
	$(DOCKER) exec aegis_pg psql -U postgres -d postgres \
		-c "CREATE DATABASE \"default\" WITH OWNER postgres;" \
		-c "CREATE DATABASE \"test\" WITH OWNER postgres;"

redis-on-docker: ensure-docker-network
	$(DOCKER) run -d --network $(DOCKER_NETWORK) --name aegis_redis -p 6379:6379 redis/redis-stack-server:latest

clickhouse-on-docker: ensure-docker-network
	$(DOCKER) run -d --network $(DOCKER_NETWORK) --name aegis_clickhouse -p 8123:8123 -p 9000:9000 -e CLICKHOUSE_PASSWORD=devPassword clickhouse/clickhouse-server:latest \

grafana-on-docker: ensure-docker-network
	$(DOCKER) run -d --network $(DOCKER_NETWORK) \
	--name aegis_grafana \
	-p 4000:3000 \
	-e GF_SECURITY_ADMIN_USER=admin \
	-e GF_SECURITY_ADMIN_PASSWORD=admin \
	-e GF_INSTALL_PLUGINS=grafana-clickhouse-datasource \
	-v $(PWD)/grafana/provisioning/datasources:/etc/grafana/provisioning/datasources \
	grafana/grafana-oss:latest

opentelemetry-collector-on-docker: ensure-docker-network
	$(DOCKER) run -d --network $(DOCKER_NETWORK) \
	--name aegis_otlp_collector \
	-p 4317:4317 \
	-p 4318:4318 \
	-p 13133:13133 \
	-v $(PWD)/otel-collector/otel-collector-config.yaml:/etc/otel-collector-config.yaml \
	otel/opentelemetry-collector-contrib:latest \
	--config /etc/otel-collector-config.yaml
