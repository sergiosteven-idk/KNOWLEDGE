#!/usr/bin/env bash
set -e

# Verificar variables de entorno
if [ -z "$MYSQLHOST" ] || [ -z "$MYSQLPORT" ] || [ -z "$MYSQLUSER" ] || [ -z "$MYSQLPASSWORD" ] || [ -z "$MYSQLDATABASE" ]; then
  echo "❌ ERROR: Faltan variables de entorno MySQL."
  echo "Debes definir MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD y MYSQLDATABASE."
  exit 1
fi

echo "🚀 Importando /app/Knowledge.sql a la base $MYSQLDATABASE en $MYSQLHOST:$MYSQLPORT..."

mysql \
  --protocol=TCP \
  --ssl-mode=REQUIRED \
  -h "$MYSQLHOST" \
  -P "$MYSQLPORT" \
  -u "$MYSQLUSER" \
  -p"$MYSQLPASSWORD" \
  "$MYSQLDATABASE" < /app/Knowledge.sql

echo "✅ Importación completada con éxito."
