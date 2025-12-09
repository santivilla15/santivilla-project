#!/bin/bash

# Script para crear iconos PWA desde una imagen fuente
# Uso: ./scripts/create-pwa-icons.sh path/to/your/logo.png

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 Generador de Iconos PWA para Santivilla${NC}"
echo ""

# Verificar que se proporcionó una imagen
if [ -z "$1" ]; then
  echo -e "${RED}❌ Error: Debes proporcionar la ruta a tu imagen${NC}"
  echo ""
  echo "Uso: ./scripts/create-pwa-icons.sh path/to/your/logo.png"
  echo ""
  echo "Ejemplo:"
  echo "  ./scripts/create-pwa-icons.sh ~/Desktop/mi-logo.png"
  echo ""
  exit 1
fi

SOURCE_IMAGE="$1"

# Verificar que el archivo existe
if [ ! -f "$SOURCE_IMAGE" ]; then
  echo -e "${RED}❌ Error: El archivo no existe: $SOURCE_IMAGE${NC}"
  exit 1
fi

# Verificar que ImageMagick está instalado
if ! command -v convert &> /dev/null; then
  echo -e "${YELLOW}⚠️  ImageMagick no está instalado${NC}"
  echo ""
  echo "Opciones:"
  echo "1. Instalar ImageMagick:"
  echo "   macOS: brew install imagemagick"
  echo "   Ubuntu: sudo apt-get install imagemagick"
  echo ""
  echo "2. Usar herramienta online:"
  echo "   https://realfavicongenerator.net/"
  echo "   https://www.pwabuilder.com/imageGenerator"
  echo ""
  echo "3. Crear manualmente con cualquier editor de imágenes"
  echo ""
  exit 1
fi

# Crear directorio public si no existe
mkdir -p public

echo -e "${BLUE}📐 Generando iconos...${NC}"
echo ""

# Generar icon-192.png
echo -e "${GREEN}Generando icon-192.png...${NC}"
convert "$SOURCE_IMAGE" -resize 192x192 -background none -gravity center -extent 192x192 public/icon-192.png

# Generar icon-512.png
echo -e "${GREEN}Generando icon-512.png...${NC}"
convert "$SOURCE_IMAGE" -resize 512x512 -background none -gravity center -extent 512x512 public/icon-512.png

echo ""
echo -e "${GREEN}✅ Iconos generados correctamente!${NC}"
echo ""
echo "Archivos creados:"
echo "  - public/icon-192.png"
echo "  - public/icon-512.png"
echo ""
echo -e "${BLUE}📝 Próximos pasos:${NC}"
echo "1. Verifica que los iconos se vean bien"
echo "2. Ejecuta: npm run verify:production"
echo "3. Prueba la PWA en tu navegador"
echo ""

