# scripts/clean-generated.ps1
Write-Host "Cleaning generated .js and .d.ts files..."

Get-ChildItem -Recurse -Include *.js, *.d.ts -File |
Where-Object {
    $_.FullName -notmatch '\\dist\\' -and $_.FullName -notmatch '\\node_modules\\'
} | Remove-Item -Force

Write-Host "✅ Done cleaning!"
