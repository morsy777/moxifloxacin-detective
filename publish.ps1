# One-time publishing helper for Windows PowerShell.
# Requires: Git, GitHub CLI (`gh`) and an internet connection.
# You will be asked to authorize GitHub/Vercel in your own terminal.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Git is required: https://git-scm.com/downloads' }
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw 'GitHub CLI is required: https://cli.github.com/' }
Write-Host 'Checking GitHub sign-in...' -ForegroundColor Cyan
gh auth status
if ($LASTEXITCODE -ne 0) { throw 'Run gh auth login, then rerun this script.' }
$owner = gh api user --jq .login
if ($owner -ne 'morsy777') { throw "Expected account morsy777 but signed in as $owner. Switch accounts first." }
if (-not (Test-Path .git)) { git init -b main }
git add .
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git commit -m 'Launch Moxifloxacin Drug Detective game' }
Write-Host 'Creating repository and pushing code...' -ForegroundColor Cyan
gh repo create 'morsy777/moxifloxacin-detective' --public --source . --remote origin --push
if ($LASTEXITCODE -ne 0) { throw 'GitHub repository creation failed. Fix the error and rerun, or create an empty repo then git push.' }
Write-Host 'GitHub repository: https://github.com/morsy777/moxifloxacin-detective' -ForegroundColor Green
Write-Host 'Next: deploy it on Vercel and connect Git integration.' -ForegroundColor Cyan
Write-Host 'Vercel might ask you to sign in and confirm the project.'
npx --yes vercel --prod
if ($LASTEXITCODE -ne 0) { throw 'Vercel deployment failed. See https://vercel.com/new to import the GitHub repository.' }
npx --yes vercel git connect
if ($LASTEXITCODE -ne 0) { Write-Warning 'Deployment may be live, but Git integration needs manual connection from the Vercel dashboard.' }
Write-Host 'Success. Copy the production URL. Use it to generate the print QR with tools/make_qr.py.' -ForegroundColor Green
