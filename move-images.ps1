# Script para organizar imagens
$workspacePath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $workspacePath

# Criar pastas
New-Item -ItemType Directory -Path "public\metodox" -Force | Out-Null
New-Item -ItemType Directory -Path "public\bt" -Force | Out-Null

# Mover imagens da metodox
if (Test-Path "public\BG-_1__11zon.webp") {
    Move-Item -Path "public\BG-_1__11zon.webp" -Destination "public\metodox\" -Force
}
if (Test-Path "public\ESPECIALISTA-_1_.webp") {
    Move-Item -Path "public\ESPECIALISTA-_1_.webp" -Destination "public\metodox\" -Force
}
if (Test-Path "public\kingpanda-logo.png.webp") {
    Move-Item -Path "public\kingpanda-logo.png.webp" -Destination "public\metodox\" -Force
}

Write-Host "Imagens organizadas com sucesso!"



