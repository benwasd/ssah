#r "./packages/FAKE/tools/FakeLib.dll"

open Fake
open Fake.NpmHelper
open Fake.Testing.NUnit3
open Fake.OpenCoverHelper

let projectRoot = __SOURCE_DIRECTORY__ @@ ".."
let buildDir = __SOURCE_DIRECTORY__
let tempDir = __SOURCE_DIRECTORY__ @@ "temp"
let outputDir = tempDir @@ "Output"

let nugetRestore packagesDir solutionFiles = 
  for solutionFile in solutionFiles do
    RestoreMSSolutionPackages (fun p -> { p with Retries = 2; ToolPath = buildDir @@ "./packages/NuGet.CommandLine/tools/NuGet.exe"; OutputPath = packagesDir }) solutionFile

let msbuild target projectOrSolutionFiles =
  MSBuildReleaseExt "" [("TreatWarningsAsErrors", "true")] target projectOrSolutionFiles |> ignore

let npm command dir = 
  let appData = System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData)
  Npm (fun p -> { p with NpmFilePath = appData @@ "npm" @@ "npm.cmd"; Command = command; WorkingDirectory = dir })

let nunit resultFilePrefix testAssemblies = 
  let nunit3Exe = findToolInSubPath "nunit3-console.exe" buildDir
  let openCoverExe = findToolInSubPath "OpenCover.Console.exe" buildDir

  let nunit3Args setParams = 
    NUnit3Defaults |> setParams |> buildNUnit3Args

  nunit3Args (fun p -> { p with WorkingDir = tempDir; Workers = (Some 1); Agents = (Some 1); ProcessModel = SingleProcessModel; ResultSpecs = [resultFilePrefix + ".TestResults.xml"] }) testAssemblies
  |> OpenCover (fun p -> { p with WorkingDir = tempDir; Register = RegisterUser; Output = resultFilePrefix + ".CoverageReport.xml"; TimeOut = System.TimeSpan.MaxValue; MergeByHash = true; ExePath = openCoverExe; TestRunnerExePath = nunit3Exe })

Target "Clean" (fun _ ->
  TaskRunnerHelper.runWithRetries (fun _ -> 
    !! "./Backend/packages"
    ++ "./Backend/**/bin"
    ++ "./Backend/**/obj"
      |> SetBaseDir projectRoot
      |> DeleteDirs

    !! "./Frontend/node_modules"
    ++ "./Frontend/dist"
      |> SetBaseDir projectRoot
      |> DeleteDirs
  ) 3

  DeleteDir tempDir
  CreateDir tempDir
)

Target "Build-Backend" (fun _ -> 
  !! "./Backend/SSAH.sln"
    |> SetBaseDir projectRoot
    |> nugetRestore "./Backend/packages"
  !! "./Backend/SSAH.sln"
    |> SetBaseDir projectRoot
    |> msbuild "Publish"
)

Target "Build-Frontend" (fun _ -> 
  npm (Install Standard) (projectRoot @@ "Frontend")
  npm (Run "build") (projectRoot @@ "Frontend")
)

Target "Test-Backend" (fun _ ->
  ()
)

Target "Integration-Test-Backend" (fun _ ->
  ()
)

Target "Test-Frontend" (fun _ ->
  ()
)

Target "Collect-Output" (fun _ ->
  CreateDir tempDir

  // dotnet core backend
  !! "./Backend/src/SSAH.Startup/bin/Release/netcoreapp2.0/publish/**/*"
  -- "./**/*.pdb"
    |> SetBaseDir projectRoot
    |> Seq.iter (CopyFileWithSubfolder ("./Backend/src/SSAH.Startup/bin/Release/netcoreapp2.0/publish/") (outputDir @@ "Backend"))

  // react frontend
  !! "./Frontend/dist/**/*"
    |> SetBaseDir projectRoot
    |> Seq.iter (CopyFileWithSubfolder ("./Frontend/dist/") (outputDir @@ "Frontend"))
  !! "./Frontend/public/**/*"
    |> SetBaseDir projectRoot
    |> Seq.iter (CopyFileWithSubfolder ("./Frontend/public/") (outputDir @@ "Frontend"))

  ReadFileAsString (outputDir @@ "Frontend" @@ "index.html")
  |> replace "\r\n        <base href=\"../dist/\">" ""
  |> replace "\n        <base href=\"../dist/\">" ""
  |> WriteStringToFile false (outputDir @@ "Frontend" @@ "index.html")

  !! "./**/*"
    |> SetBaseDir outputDir
    |> Zip outputDir (tempDir @@ "SSAH.zip")
)
