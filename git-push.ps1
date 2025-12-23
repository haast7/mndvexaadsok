# Script para fazer git push
$projectPath = "C:\Users\erick\Downloads\André Mendes\LPs\LP06"

if (Test-Path $projectPath) {
    Set-Location $projectPath
    
    Write-Host "Diretório atual: $(Get-Location)"
    Write-Host "`n=== Status do Git ===" 
    git status --short
    
    Write-Host "`n=== Verificando Remote ===" 
    $remote = git remote -v
    if (-not $remote) {
        Write-Host "Adicionando remote..."
        git remote add origin https://github.com/haast7/mndvexaadsok.git
    } else {
        Write-Host "Remote já configurado:"
        git remote -v
    }
    
    Write-Host "`n=== Adicionando arquivos ===" 
    git add .
    
    Write-Host "`n=== Fazendo commit ===" 
    git commit -m "Otimizações de performance para mobile - meta 100%"
    
    Write-Host "`n=== Fazendo push ===" 
    git branch -M main
    git push -u origin main
    
    Write-Host "`n✅ Push concluído!"
} else {
    Write-Host "❌ Diretório não encontrado: $projectPath"
}





