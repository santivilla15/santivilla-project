#!/bin/bash

# Script para iniciar el servidor y el webhook listener juntos
# Uso: ./scripts/start-dev.sh

echo "🚀 Iniciando servidor y webhook listener..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo procesos..."
    kill $SERVER_PID $WEBHOOK_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "${RED}❌ Error: No se encontró package.json${NC}"
    echo "   Ejecuta este script desde la raíz del proyecto"
    exit 1
fi

# Verificar que Stripe CLI está instalado
if ! command -v stripe &> /dev/null; then
    echo "${RED}❌ Error: Stripe CLI no está instalado${NC}"
    echo "   Instálalo con: brew install stripe/stripe-cli/stripe"
    exit 1
fi

# Verificar que las variables de entorno estén configuradas
if [ ! -f ".env.local" ]; then
    echo "${YELLOW}⚠️  Advertencia: No se encontró .env.local${NC}"
fi

echo "${GREEN}✅ Iniciando servidor Next.js...${NC}"
cd app
npm run dev > /tmp/nextjs_server.log 2>&1 &
SERVER_PID=$!
cd ..

# Esperar a que el servidor esté listo
echo "⏳ Esperando a que el servidor esté listo..."
sleep 5

# Verificar que el servidor esté corriendo
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "${RED}❌ Error: El servidor no se inició correctamente${NC}"
    echo "   Revisa los logs en /tmp/nextjs_server.log"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo "${GREEN}✅ Servidor corriendo en http://localhost:3000${NC}"
echo ""

echo "${GREEN}✅ Iniciando webhook listener de Stripe...${NC}"
stripe listen --forward-to localhost:3000/api/webhook > /tmp/stripe_webhook.log 2>&1 &
WEBHOOK_PID=$!

# Esperar un momento para que el webhook listener se inicie
sleep 2

# Verificar que el webhook listener esté corriendo
if ! ps -p $WEBHOOK_PID > /dev/null 2>&1; then
    echo "${RED}❌ Error: El webhook listener no se inició correctamente${NC}"
    echo "   Revisa los logs en /tmp/stripe_webhook.log"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo "${GREEN}✅ Webhook listener corriendo${NC}"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "${GREEN}✅ Todo listo!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Servidor: http://localhost:3000"
echo "📋 Logs del servidor: tail -f /tmp/nextjs_server.log"
echo "📋 Logs del webhook: tail -f /tmp/stripe_webhook.log"
echo ""
echo "💡 Cuando aparezca 'whsec_...' en los logs del webhook,"
echo "   cópialo y agrégalo a .env.local como STRIPE_WEBHOOK_SECRET"
echo ""
echo "🛑 Presiona Ctrl+C para detener ambos procesos"
echo ""

# Esperar a que los procesos terminen
wait

