#!/bin/bash
rm build/*

NODE_ENV=production
webpack -p --config webpack.production.config.js

cp index.html build/
cd build

sed -i '' 's/build\///g' index.html

zip deploy *

cd ..
if [ -f local_deploy.sh ]; then
	# SCP, whatever :)
	sh local_deploy.sh
fi
