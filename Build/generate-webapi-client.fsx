#r "./packages/FAKE/tools/FakeLib.dll"

open Fake
open Fake.ProcessHelper
open Fake.TraceHelper

Target "Generate-WebApi-Client" (fun _ ->
  let fakePath = __SOURCE_DIRECTORY__ @@ "./packages/FAKE/tools/Fake.exe"
  let scriptPath = __SOURCE_DIRECTORY__ @@ "generate-webapi-client-standalone.fsx"
  let result = 
        ExecProcess (fun info -> 
          info.FileName <- fakePath
          info.Arguments <- scriptPath
          ) (System.TimeSpan.FromMinutes 5.0)
  if result <> 0 then
    failwith (sprintf "running 'generate-webapi-client-standalone.fsx' failed with exit code %d." result )
)
