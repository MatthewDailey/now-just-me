#!/bin/bash

# Build script for Now Just Me Firefox extension

echo "Building Now Just Me extension..."

# Build in production mode
NODE_ENV=production npm run build

# Create a temporary directory for the package
mkdir -p package

# Copy required files
cp manifest.json package/
cp -r dist package/

# Copy icon if it exists
if [ -f icon.png ]; then
    cp icon.png package/
fi

# Create zip file (cd into package dir so files are at zip root)
cd package
zip -r ../now-just-me.zip *
cd ..

# Clean up
rm -rf package

echo "Extension packaged as now-just-me.zip"