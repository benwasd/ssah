@echo off

cd Build
paket.exe install
if errorlevel 1 (
  exit /b %errorlevel%
)
cd ..

"Build\packages\FAKE\tools\Fake.exe" "Build\move-runtime-references-into-bin.fsx"

cls

"Build\packages\FAKE\tools\Fake.exe" "Build\core.fsx" %1
