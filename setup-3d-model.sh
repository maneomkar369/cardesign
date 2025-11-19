#!/bin/bash

# 3D Car Model Setup Script
# This script helps you download and integrate a free 3D car model

echo "🚗 3D Car Model Integration Setup"
echo "=================================="
echo ""

# Create models directory
echo "📁 Creating models directory..."
mkdir -p frontend/public/models

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Download a FREE car model from one of these sources:"
echo ""
echo "   Option A: Sketchfab (Recommended)"
echo "   ✅ Visit: https://sketchfab.com/search?q=sports+car&type=models&features=downloadable&licenses=322a749bcfa841b29dff1e8a1bb74b0b"
echo "   ✅ Filter by: Free + Downloadable + CC0/CC-BY"
echo "   ✅ Download as GLB format"
echo ""
echo "   Option B: Poly Pizza"
echo "   ✅ Visit: https://poly.pizza/search/car"
echo "   ✅ Download any car model"
echo ""
echo "   Option C: Quaternius (Low-poly but good for prototypes)"
echo "   ✅ Visit: https://quaternius.com/packs/"
echo "   ✅ Look for Vehicle packs"
echo ""
echo "2. Save the downloaded GLB file as:"
echo "   frontend/public/models/car.glb"
echo ""
echo "3. Update VehicleConfigurator.jsx:"
echo "   - Replace the file with VehicleConfiguratorWithGLB.jsx"
echo "   - OR copy the GLBCarModel component"
echo "   - Set USE_GLB_MODEL = true"
echo ""
echo "4. Test in browser:"
echo "   http://localhost:5174/configurator"
echo ""
echo "=================================="
echo ""
echo "📝 IMPORTANT LEGAL NOTES:"
echo ""
echo "✅ CC0 License = Public Domain (No attribution required)"
echo "✅ CC-BY License = Requires attribution (add credit in your UI)"
echo "⚠️  Editorial License = For non-commercial use only (DO NOT USE)"
echo "❌ No License = Copyrighted (DO NOT USE)"
echo ""
echo "For commercial launch with real car brands (Porsche, Ferrari, etc.):"
echo "💰 Budget $15,000 - $50,000+ for official licensing"
echo "📧 Contact manufacturer licensing departments directly"
echo ""
echo "Read 3D_MODEL_INTEGRATION_GUIDE.md for full details!"
echo ""

# Check if models directory exists
if [ -d "frontend/public/models" ]; then
  echo "✅ Models directory created successfully!"
  echo ""
  echo "Current status:"
  ls -lh frontend/public/models/ 2>/dev/null || echo "  (empty - waiting for your GLB file)"
else
  echo "❌ Failed to create models directory"
  exit 1
fi

echo ""
echo "Happy modeling! 🎨"
