Add-Type -AssemblyName System.Drawing
$base = Join-Path (Get-Location) 'miniprogram/images'
$categories = @('火锅','奶茶','烧烤','面食','小吃')
$colors = @('#FAD2AF','#E5D4B9','#EEC59C','#F9DBA0','#F3CFC6')
for($c=0;$c -lt 5;$c++) {
 for($variant=1;$variant -le 3;$variant++) {
  $bmp=New-Object System.Drawing.Bitmap 640,480
  $g=[System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode='AntiAlias'
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml($colors[$c]))
  $cream=New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#FFF8EA'))
  $dark=New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#81533D'))
  $orange=New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#E57A3D'))
  $green=New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#759A53'))
  $shadow=New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25,100,60,20))
  $pen=New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml('#EDBC68')),9
  $g.FillEllipse($cream,490,-100,230,230);$g.FillEllipse($cream,-80,380,190,190)
  $g.TranslateTransform(($variant-2)*15,0)
  $g.FillEllipse($shadow,145,353,350,65)
  if($c -eq 1) {
   $g.FillRectangle($dark,333,70,14,220)
   $g.FillPolygon($cream,[System.Drawing.Point[]]@([System.Drawing.Point]::new(221,145),[System.Drawing.Point]::new(425,145),[System.Drawing.Point]::new(397,375),[System.Drawing.Point]::new(247,375)))
   $g.FillRectangle($orange,252,190,143,135)
   for($n=0;$n -lt 9;$n++) {$g.FillEllipse($dark,(264+($n%4)*31),(290+[Math]::Floor($n/4)*25),22,22)}
   $g.FillEllipse($cream,208,122,230,46)
  } elseif($c -eq 2) {
   $g.FillEllipse($cream,112,135,420,250)
   for($n=0;$n -lt 4;$n++) {$y=174+$n*49;$g.DrawLine($pen,156,$y,502,$y+24);for($k=0;$k -lt 5;$k++){$g.FillEllipse($orange,(190+$k*49),($y-13+$k*3),42,36)}}
  } elseif($c -eq 4) {
   $g.FillEllipse($cream,123,150,394,234)
   for($n=0;$n -lt 5;$n++) {$x=205+($n%3)*85;$y=193+[Math]::Floor($n/3)*90;$g.FillEllipse($orange,$x,$y,74,66);$g.FillEllipse($cream,($x+10),($y+6),53,45);$g.FillEllipse($green,($x+31),($y+14),9,18)}
  } else {
   $g.FillEllipse($cream,128,139,389,248);$g.FillEllipse($orange,153,151,339,194)
   for($n=0;$n -lt 6;$n++){$g.DrawArc($pen,(193+$n*12),(179+$n*8),(204-$n*19),(129-$n*11),0,290)}
   $g.FillEllipse($cream,208,206,91,70);$g.FillEllipse($orange,229,220,44,37)
   for($n=0;$n -lt 5;$n++){$g.FillEllipse($green,(325+$n*12),(206+$n*12),20,47)}
   $g.DrawLine($pen,449,82,369,262);$g.DrawLine($pen,474,89,393,269)
  }
  $g.ResetTransform()
  $font=New-Object System.Drawing.Font 'Microsoft YaHei',15
  $g.DrawString(('SHIGUANG  /  0'+$variant),$font,$dark,30,30)
  $path=Join-Path $base ('food-'+$categories[$c]+'-'+$variant+'.png');$bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png)
  if($variant -eq 1){$bmp.Save((Join-Path $base ('food-'+$categories[$c]+'.png')),[System.Drawing.Imaging.ImageFormat]::Png)}
  $font.Dispose();$pen.Dispose();$cream.Dispose();$dark.Dispose();$orange.Dispose();$green.Dispose();$shadow.Dispose();$g.Dispose();$bmp.Dispose()
 }
}
$names=@('home','goods','examples','usercenter')
foreach($name in $names){
 foreach($active in @($false,$true)){
  $bmp=New-Object System.Drawing.Bitmap 80,80;$g=[System.Drawing.Graphics]::FromImage($bmp);$g.SmoothingMode='AntiAlias';$g.Clear([System.Drawing.Color]::Transparent)
  $color=if($active){'#FF6B35'}else{'#998B81'};$pen=New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($color)),5
  switch($name){
   'home' {$g.DrawLines($pen,[System.Drawing.Point[]]@([System.Drawing.Point]::new(13,36),[System.Drawing.Point]::new(40,13),[System.Drawing.Point]::new(67,36)));$g.DrawRectangle($pen,22,35,36,30);$g.DrawRectangle($pen,34,47,12,18)}
   'goods' {$g.DrawRectangle($pen,12,40,16,25);$g.DrawRectangle($pen,32,20,16,45);$g.DrawRectangle($pen,52,48,16,17)}
   'examples' {$g.DrawBezier($pen,40,66,0,42,8,4,40,27);$g.DrawBezier($pen,40,27,72,4,80,42,40,66)}
   'usercenter' {$g.DrawEllipse($pen,27,12,26,26);$g.DrawArc($pen,15,44,50,42,180,180);$g.DrawLine($pen,15,65,65,65)}
  }
  $suffix=if($active){'-active'}else{''};$bmp.Save((Join-Path $base ('icons/'+$name+$suffix+'.png')),[System.Drawing.Imaging.ImageFormat]::Png);$pen.Dispose();$g.Dispose();$bmp.Dispose()
 }
}
