#load "generate-webapi-client.fsx"
#load "build-test-pack.fsx"

open Fake

// Build and Test
Target "Rebuild-Test-All" DoNothing

"Clean" ?=> "Build-Backend"
"Clean" ==> "Rebuild-Test-All"

"Generate-WebApi-Client" ==> "Build-Frontend"
"Build-Frontend" ==> "Test-Frontend" ==> "Rebuild-Test-All"
"Build-Backend" ==> "Test-Backend" ==> "Rebuild-Test-All"
"Build-Backend" ==> "Integration-Test-Backend" ==> "Rebuild-Test-All"

// Pack for deployment
Target "Rebuild-Test-Pack-All" DoNothing

"Build-Backend" ==> "Collect-Output"
"Build-Frontend" ==> "Collect-Output"
"Rebuild-Test-All" ==> "Collect-Output" ==> "Rebuild-Test-Pack-All"

RunTargetOrListTargets()
