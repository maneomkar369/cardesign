#!/usr/bin/env node

/**
 * Convert OBJ models to GLB format for Three.js
 * This script processes the downloaded car models and optimizes them for web use
 */

const obj2gltf = require('obj2gltf');
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '../public/models');

const models = [
  {
    name: 'Lamborghini Aventador',
    input: path.join(modelsDir, 'aventador/Avent_sport.obj'),
    output: path.join(modelsDir, 'aventador/aventador.glb')
  },
  {
    name: 'Bugatti',
    input: path.join(modelsDir, 'bugatti/bugatti/bugatti.obj'),
    output: path.join(modelsDir, 'bugatti/bugatti.glb')
  },
  {
    name: 'Chevrolet Camaro',
    input: path.join(modelsDir, 'camaro/CHEVROLET_CAMARO_BB/obj/CAMARO.obj'),
    output: path.join(modelsDir, 'camaro/camaro.glb')
  }
];

async function convertModel(model) {
  console.log(`\n🚗 Converting ${model.name}...`);
  console.log(`   Input: ${model.input}`);
  console.log(`   Output: ${model.output}`);

  try {
    const options = {
      binary: true, // Output GLB instead of GLTF
      separate: false, // Embed textures
      checkTransparency: true,
      secure: false,
      packOcclusion: false,
      metallicRoughness: true
    };

    const gltf = await obj2gltf(model.input, options);
    
    // Ensure output directory exists
    const outputDir = path.dirname(model.output);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write GLB file
    fs.writeFileSync(model.output, gltf);
    
    // Get file size
    const stats = fs.statSync(model.output);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`   ✅ Success! Size: ${sizeMB} MB`);
    
    return { success: true, size: sizeMB };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function convertAllModels() {
  console.log('🎯 Starting OBJ to GLB conversion...\n');
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const model of models) {
    const result = await convertModel(model);
    results.push({ name: model.name, ...result });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Conversion Summary:\n');
  
  results.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.name}: ${result.size} MB`);
    } else {
      console.log(`❌ ${result.name}: FAILED (${result.error})`);
    }
  });
  
  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎉 Completed: ${successCount}/${models.length} models converted successfully!\n`);
}

// Run the conversion
convertAllModels().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
