#!/bin/bash

# EduSwipe Quick Setup Script

echo "🎓 EduSwipe Setup"
echo "================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please download and install from https://nodejs.org/"
    echo "   (Download LTS version - 18.x or higher)"
    exit 1
fi

echo "✅ Node.js $(node -v) found"
echo "✅ npm $(npm -v) found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed!"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   npm run dev"
echo ""
echo "🔨 To build for production:"
echo "   npm run build"
