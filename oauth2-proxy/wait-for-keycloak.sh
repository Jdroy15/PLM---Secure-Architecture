#!/bin/sh
# wait-for-keycloak.sh

echo "Waiting for Keycloak to be ready..."

# Retry until Keycloak responds
until curl -s http://keycloak:8080/realms/demo/.well-known/openid-configuration > /dev/null; do
  echo "Keycloak is not ready yet. Sleeping 5s..."
  sleep 5
done

echo "Keycloak is up! Starting OAuth2 Proxy..."
exec /bin/oauth2-proxy --config=/etc/oauth2-proxy/oauth2-proxy.cfg
