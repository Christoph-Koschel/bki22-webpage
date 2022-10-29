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

echo Copy files

echo "*.html"
cp $srcPath/*.html $distPath

echo images
cp $srcPath/assets/image/*.* $distPath/assets/image

echo *.css
cp $srcPath/assets/css/*.css $distPath/assets/css
cp $srcPath/assets/scss/*.css $distPath/assets/css

echo *.js
cp $srcPath/assets/ts/build/*.c.js $distPath/assets/js

echo webfonts
cp $srcPath/assets/webfonts/*.* $distPath/assets/webfonts
