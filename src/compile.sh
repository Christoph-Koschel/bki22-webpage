distPath="/mnt/e/langs/web/school-usb/dist"
srcPath="/mnt/e/langs/web/school-usb/src"

echo Reset dist
if [ -d $distPath ]; then
  rm -r $distPath
fi

echo Create folder structure

echo mkdir $distPath
mkdir $distPath

echo mkdir $distPath/assets
mkdir $distPath/assets

echo mkdir $distPath/assets/image
mkdir $distPath/assets/image

echo mkdir $distPath/assets/js
mkdir $distPath/assets/js

echo mkdir $distPath/assets/css
mkdir $distPath/assets/css

echo mkdir $distPath/assets/webfonts
mkdir $distPath/assets/webfonts

echo mkdir $distPath/assets/php
mkdir $distPath/assets/php

echo mkdir $distPath/assets/json
mkdir $distPath/assets/json

echo mkdir $distPath/assets/templates
mkdir $distPath/assets/templates

echo Copy files

echo "*.html"
cp $srcPath/*.html $distPath
cp $srcPath/assets/templates/*.html $distPath/assets/templates

echo images
cp $srcPath/assets/image/*.* $distPath/assets/image

echo *.css
cp $srcPath/assets/css/*.css $distPath/assets/css
cp $srcPath/assets/scss/*.css $distPath/assets/css

echo *.js
cp $srcPath/assets/ts/build/*.c.js $distPath/assets/js

echo *.php
cp $srcPath/assets/php/*.php $distPath/assets/php

echo *.json
cp $srcPath/assets/json/*.json $distPath/assets/json

echo webfonts
cp $srcPath/assets/webfonts/*.* $distPath/assets/webfonts
