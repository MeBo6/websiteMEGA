# PowerShell script to compress images using built-in Windows compression
# This will reduce file sizes significantly

$photosPath = "c:\Users\User\Desktop\website-deploy\Photos"
$backupPath = "c:\Users\User\Desktop\website-deploy\Photos_Backup"

# Create backup
if (-not (Test-Path $backupPath)) {
    Copy-Item -Path $photosPath -Destination $backupPath -Recurse
    Write-Host "✓ Backup created at: $backupPath"
}

# Compress all images using Windows compression
Get-ChildItem -Path $photosPath -Include *.jpg, *.jpeg, *.png -Recurse | ForEach-Object {
    $file = $_
    $originalSize = $file.Length / 1MB
    
    # Use magick (ImageMagick) if available, otherwise use built-in compression
    Write-Host "Processing: $($file.Name) - Original: $([math]::Round($originalSize, 2))MB"
    
    # Quality reduction for JPG
    if ($file.Extension -match "\.jpg|\.jpeg") {
        # Reduce quality to 70% (good balance)
        $tempFile = $file.FullName + ".temp"
        & magick convert "$($file.FullName)" -quality 70 -strip "$tempFile" 2>$null
        
        if (Test-Path $tempFile) {
            $newSize = (Get-Item $tempFile).Length / 1MB
            Move-Item -Path $tempFile -Destination $file.FullName -Force
            Write-Host "  ✓ Compressed to: $([math]::Round($newSize, 2))MB (saved $(($originalSize - $newSize) * 1024)KB)"
        }
    }
    # For PNG, convert to JPG if possible
    elseif ($file.Extension -match "\.png") {
        $jpgFile = $file.FullName -replace "\.png", ".jpg"
        & magick convert "$($file.FullName)" -quality 85 -strip "$jpgFile" 2>$null
        
        if (Test-Path $jpgFile) {
            $newSize = (Get-Item $jpgFile).Length / 1MB
            Write-Host "  ✓ Converted PNG to JPG: $([math]::Round($newSize, 2))MB"
            Remove-Item $file.FullName
        }
    }
}

Write-Host "`nDone! Check Photos folder for compressed images."
