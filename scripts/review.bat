@echo off
REM Bypass PowerShell execution policy — runs review.ps1 in the same dir.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0review.ps1" %*
