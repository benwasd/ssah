#r "./packages/FAKE/tools/FakeLib.dll"

open Fake

let miloToolsDir = __SOURCE_DIRECTORY__
let fakeToolsDir = __SOURCE_DIRECTORY__ @@ "./packages/FAKE/tools/"

let moveNugetLibsToFakeBinDir packetName = 
  !! ("./packages/" + packetName + "/lib/net45/**/*") |> SetBaseDir miloToolsDir |> CopyFiles fakeToolsDir
  !! ("./packages/" + packetName + "/lib/net451/**/*") |> SetBaseDir miloToolsDir |> CopyFiles fakeToolsDir
  !! ("./packages/" + packetName + "/lib/net462/**/*") |> SetBaseDir miloToolsDir |> CopyFiles fakeToolsDir

moveNugetLibsToFakeBinDir "NConsole"
moveNugetLibsToFakeBinDir "NJsonSchema*"
moveNugetLibsToFakeBinDir "NSwag*"
moveNugetLibsToFakeBinDir "DotLiquid*"
