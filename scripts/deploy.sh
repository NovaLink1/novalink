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
WWW_ROOT="/var/www/$ENV.novalink.at"
BUILD_CMD="npm run build:${ENV}"

echo ""
echo "🚀 Deploying [${ENV}] environment"

# 1) Wechsle ins Frontend-Verzeichnis
cd "$(dirname "$0")/.." || { echo "❌ Fehler beim Wechsel ins Projektverzeichnis"; exit 1; }

# 2) (Optional) Abhängigkeiten aktualisieren
# echo "📦 Installing dependencies..."
# npm ci || { echo "❌ npm ci fehlgeschlagen"; exit 1; }

# 3) Frontend bauen
echo "🛠️  Building frontend for $ENV..."
$BUILD_CMD || { echo "❌ Build fehlgeschlagen"; exit 1; }

# 4) Dateien synchronisieren
echo "📁 Syncing to $WWW_ROOT..."
sudo rsync -a --delete dist/ "$WWW_ROOT/" || { echo "❌ Rsync fehlgeschlagen"; exit 1; }

# 5) Dateirechte setzen
echo "🔐 Fixing permissions..."
sudo chown -R www-data:www-data "$WWW_ROOT"
sudo chmod -R 755 "$WWW_ROOT"

# 6) Nginx neu laden
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx || { echo "❌ Nginx reload fehlgeschlagen"; exit 1; }

# 7) Backend neustarten
echo "♻️  Restarting backend service..."
sudo systemctl restart novalink-backend.service || { echo "❌ Backend konnte nicht neugestartet werden"; exit 1; }

echo ""
echo "✅ Deployment [$ENV] erfolgreich abgeschlossen!"
