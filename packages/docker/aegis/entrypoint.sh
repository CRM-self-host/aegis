#!/bin/sh
set -e

wait_for_postgres() {
    echo "Waiting for PostgreSQL to be ready..."
    max_retries=30
    retry_count=0
    retry_interval=2

    while [ $retry_count -lt $max_retries ]; do
        if psql -tAc "SELECT 1" "${PG_DATABASE_URL}" >/dev/null 2>&1; then
            echo "PostgreSQL is ready!"
            return 0
        fi
        retry_count=$((retry_count + 1))
        echo "PostgreSQL not ready yet (attempt ${retry_count}/${max_retries}), retrying in ${retry_interval}s..."
        sleep $retry_interval
    done

    echo "ERROR: PostgreSQL did not become ready within $((max_retries * retry_interval)) seconds"
    exit 1
}

setup_and_migrate_db() {
    if [ "${DISABLE_DB_MIGRATIONS}" = "true" ]; then
        echo "Database setup and migrations are disabled, skipping..."
        return
    fi

    echo "Running database setup and migrations..."

    # Run setup and migration scripts
    has_schema=$(psql -tAc "SELECT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'core')" "${PG_DATABASE_URL}")
    if [ "$has_schema" = "f" ]; then
        echo "Database appears to be empty, running migrations."
        yarn database:init:prod
    fi

    yarn command:prod cache:flush
    yarn command:prod upgrade
    yarn command:prod cache:flush

    echo "Successfully migrated DB!"
}

register_background_jobs() {
    if [ "${DISABLE_CRON_JOBS_REGISTRATION}" = "true" ]; then
        echo "Cron job registration is disabled, skipping..."
        return
    fi

    echo "Registering background sync jobs..."
    if yarn command:prod cron:register:all; then
        echo "Successfully registered all background sync jobs!"
    else
        echo "Warning: Failed to register background jobs, but continuing startup..."
    fi
}

wait_for_postgres
setup_and_migrate_db
register_background_jobs

# Continue with the original Docker command
exec "$@"
