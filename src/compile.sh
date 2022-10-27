distPath="/mnt/e/langs/web/school-usb/dist"
srcPath="/mnt/e/langs/web/school-usb/src"

if [ -d $distPath ]; then
  rm -r $distPath
fi

mkdir $distPath
mkdir $distPath"/assets"
mkdir $distPath"/assets/image"
mkdir $distPath"/assets/js"
mkdir $distPath"/assets/css"

cp $srcPath/*.html $distPath
cp $srcPath/assets/image/*.* $distPath"/assets/image"
cp $srcPath/assets/css/*.css $distPath"/assets/css"
cp $srcPath/assets/ts/build/*.c.js $distPath/assets/js
