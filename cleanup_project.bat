@echo off
echo Cleaning up Spark Studio project...

del "assets\css\portfolio.css"
del "assets\models\TV.glb"
del "assets\models\TV2.glb"
del "assets\models\TV3.glb"
del "assets\models\TV4.glb"
del "assets\models\TV6.glb"
del "assets\images\marquee\Temp (*).png"
del "pages\branding.html"

rd /s /q "assets\podcast"
rd /s /q "assets\video's"

echo Cleanup completed!
pause
