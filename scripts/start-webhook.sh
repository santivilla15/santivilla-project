#!/bin/bash

# Script para iniciar el webhook de Stripe en desarrollo
# Ejecuta: ./scripts/start-webhook.sh

echo "🔔 Iniciando webhook de Stripe para desarrollo..."
echo ""
echo "📋 Este script reenviará eventos de Stripe a tu servidor local"
echo ""

# Verificar que el servidor esté corriendo en el puerto 3000
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Advertencia: No se detecta un servidor corriendo en el puerto 3000"
    echo "   Asegúrate de tener 'npm run dev' corriendo en otra terminal"
    echo ""
fi

# Iniciar el webhook
echo "🚀 Iniciando Stripe webhook listener..."
echo "   Reenviando eventos a: http://localhost:3000/api/webhook"
echo ""
echo "💡 Cuando aparezca el webhook secret (whsec_...), cópialo y agrégalo a .env.local"
echo ""

stripe listen --forward-to localhost:3000/api/webhook

