# Script para organizar imagens das LPs
$workspace = Get-Location

# Criar pastas
New-Item -ItemType Directory -Path "public\metodox" -Force | Out-Null
New-Item -ItemType Directory -Path "public\bt" -Force | Out-Null

# Mover imagens da metodox
$metodoxImages = @(
    "BG-_1__11zon.webp",
    "ESPECIALISTA-_1_.webp",
    "kingpanda-logo.png.webp"
)

foreach ($img in $metodoxImages) {
    $source = "public\$img"
    $dest = "public\metodox\$img"
    if (Test-Path $source) {
        Move-Item -Path $source -Destination $dest -Force
        Write-Host "Movido: $img"
    }
}

Write-Host "Organizacao concluida!"





