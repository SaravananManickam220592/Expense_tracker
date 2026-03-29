Add-Type -AssemblyName System.Drawing

function New-RoundedRectPath {
  param(
    [float]$x,
    [float]$y,
    [float]$w,
    [float]$h,
    [float]$r
  )
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

$root = 'C:\dev\Expense_tracker\assets\branding'
$bg = [System.Drawing.Color]::FromArgb(245,241,232)
$card = [System.Drawing.Color]::FromArgb(217,119,87)
$ink = [System.Drawing.Color]::FromArgb(19,34,56)
$white = [System.Drawing.Color]::White
$gold = [System.Drawing.Color]::FromArgb(233,196,106)

# icon.png
$bmp = New-Object System.Drawing.Bitmap 1024,1024
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.Clear($bg)
$path = New-RoundedRectPath 170 170 684 684 140
$brush = New-Object System.Drawing.SolidBrush $card
$g.FillPath($brush, $path)
$circleBrush = New-Object System.Drawing.SolidBrush $gold
$g.FillEllipse($circleBrush, 690, 250, 110, 110)
$font = New-Object System.Drawing.Font('Segoe UI', 250, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = 'Center'
$sf.LineAlignment = 'Center'
$g.DrawString('Rs', $font, [System.Drawing.Brushes]::White, [System.Drawing.RectangleF]::new(170,160,684,684), $sf)
$bmp.Save((Join-Path $root 'icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $brush.Dispose(); $circleBrush.Dispose(); $font.Dispose(); $path.Dispose(); $sf.Dispose()

# adaptive-icon.png
$bmp = New-Object System.Drawing.Bitmap 1024,1024
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.Clear($bg)
$path = New-RoundedRectPath 220 220 584 584 128
$brush = New-Object System.Drawing.SolidBrush $card
$g.FillPath($brush, $path)
$font = New-Object System.Drawing.Font('Segoe UI', 220, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = 'Center'
$sf.LineAlignment = 'Center'
$g.DrawString('Rs', $font, [System.Drawing.Brushes]::White, [System.Drawing.RectangleF]::new(220,215,584,584), $sf)
$bmp.Save((Join-Path $root 'adaptive-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $brush.Dispose(); $font.Dispose(); $path.Dispose(); $sf.Dispose()

# splash-icon.png
$bmp = New-Object System.Drawing.Bitmap 1024,1024
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.Clear($bg)
$path = New-RoundedRectPath 312 150 400 400 92
$brush = New-Object System.Drawing.SolidBrush $card
$g.FillPath($brush, $path)
$font = New-Object System.Drawing.Font('Segoe UI', 150, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = 'Center'
$sf.LineAlignment = 'Center'
$g.DrawString('Rs', $font, [System.Drawing.Brushes]::White, [System.Drawing.RectangleF]::new(312,145,400,400), $sf)
$titleFont = New-Object System.Drawing.Font('Segoe UI', 78, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$subFont = New-Object System.Drawing.Font('Segoe UI', 34, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$inkBrush = New-Object System.Drawing.SolidBrush $ink
$mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(95,108,123))
$g.DrawString('Expense Tracker', $titleFont, $inkBrush, 185, 610)
$g.DrawString('Track every rupee with clarity', $subFont, $mutedBrush, 260, 715)
$bmp.Save((Join-Path $root 'splash-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $brush.Dispose(); $font.Dispose(); $path.Dispose(); $sf.Dispose(); $titleFont.Dispose(); $subFont.Dispose(); $inkBrush.Dispose(); $mutedBrush.Dispose()

# feature-graphic.png
$bmp = New-Object System.Drawing.Bitmap 1024,500
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.Clear($bg)
$path = New-RoundedRectPath 70 70 250 250 60
$brush = New-Object System.Drawing.SolidBrush $card
$g.FillPath($brush, $path)
$font = New-Object System.Drawing.Font('Segoe UI', 110, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = 'Center'
$sf.LineAlignment = 'Center'
$g.DrawString('Rs', $font, [System.Drawing.Brushes]::White, [System.Drawing.RectangleF]::new(70,60,250,250), $sf)
$titleFont = New-Object System.Drawing.Font('Segoe UI', 82, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$subFont = New-Object System.Drawing.Font('Segoe UI', 32, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$inkBrush = New-Object System.Drawing.SolidBrush $ink
$mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(95,108,123))
$g.DrawString('Expense Tracker', $titleFont, $inkBrush, 365, 120)
$g.DrawString('Offline-first daily expense control', $subFont, $mutedBrush, 370, 240)
$g.DrawString('Built for simple local tracking', $subFont, $mutedBrush, 370, 290)
$bmp.Save((Join-Path $root 'feature-graphic.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $brush.Dispose(); $font.Dispose(); $path.Dispose(); $sf.Dispose(); $titleFont.Dispose(); $subFont.Dispose(); $inkBrush.Dispose(); $mutedBrush.Dispose()
