#!/bin/bash
#
# deploy.sh <env>
# env: staging | production
#

if [[ "$1" != "staging" && "$1" != "production" ]]; then
  echo "Usage: bash deploy.sh staging|production"
  exit 1
fi

ENV=$1
WWW_ROOT="/var/www/$ENV.novalink.at"   # verändere nach Bedarf
BUILD_CMD="npm run build:${ENV}"

echo ""
echo "→ Deploying [$ENV]"

# 1) In den Frontend-Ordner
cd "$(dirname "$0")/.." || exit 1

# 2) Install (optional, falls neue Pakete)
# npm ci

# 3) Build
echo "• Building for $ENV..."
$BUILD_CMD || { echo "✖ Build failed"; exit 1; }

# 4) Deploy via rsync
echo "• Syncing to $WWW_ROOT..."
sudo rsync -a --delete dist/ "$WWW_ROOT/" \
  || { echo "✖ Rsync failed"; exit 1; }

# 5) Rechte setzen
echo "• Fixing permissions..."
sudo chown -R www-data:www-data "$WWW_ROOT"
sudo chmod -R 755 "$WWW_ROOT"

# 6) Nginx reload
echo "• Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ [$ENV] deployed!"
