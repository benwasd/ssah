#r "./packages/FAKE/tools/NJsonSchema.dll"
#r "./packages/FAKE/tools/NJsonSchema.CodeGeneration.dll"
#r "./packages/FAKE/tools/NJsonSchema.CodeGeneration.TypeScript.dll"
#r "./packages/FAKE/tools/NSwag.Core.dll"
#r "./packages/FAKE/tools/NSwag.AssemblyLoader.dll"
#r "./packages/FAKE/tools/NSwag.CodeGeneration.dll"
#r "./packages/FAKE/tools/NSwag.CodeGeneration.TypeScript.dll"
#r "./packages/FAKE/tools/NSwag.SwaggerGeneration.dll"
#r "./packages/FAKE/tools/NSwag.SwaggerGeneration.WebApi.dll"
#r "./packages/FAKE/tools/FakeLib.dll"
#r "./packages/FAKE/tools/DotLiquid.dll"

open Fake
open System.IO

open NSwag.AssemblyLoader
open NSwag.CodeGeneration.TypeScript
open NSwag.SwaggerGeneration.WebApi
open System

let projectRoot = __SOURCE_DIRECTORY__ @@ ".."

let generate inputAssembly outputApiTs =
  printfn "generate api ts %A to %s" inputAssembly outputApiTs

  let settings =
    WebApiToSwaggerGeneratorSettings(
        DefaultReferenceTypeNullHandling = NJsonSchema.ReferenceTypeNullHandling.NotNull,
        DefaultUrlTemplate = "api/{controller}/{action}/{id}",
        IsAspNetCore = true
    )

  let tssettings =
    SwaggerToTypeScriptClientGeneratorSettings(
      ClassName = "{controller}ApiProxy",
      UseTransformOptionsMethod = true,
      UseTransformResultMethod = true,
      UseGetBaseUrlMethod = true,
      ClientBaseClass = "ApiProxyBase",
      Template = TypeScriptTemplate.Angular,
      InjectionTokenType = InjectionTokenType.InjectionToken,
      GenerateOptionalParameters = true
    )

  let resolver = ResolveEventHandler(fun _ args ->
    let name = args.Name.Substring(0, args.Name.IndexOf(','))

    if name = "System.Runtime" then
      let fileName2 = """C:\Program Files\dotnet\shared\Microsoft.NETCore.App\2.0.6\""" + name + ".dll"
      
      if (File.Exists fileName2) then
        printfn "Resolve %s" fileName2
        System.Reflection.Assembly.LoadFile(fileName2)
      else
        printfn "Resolve %s" "null"
        null
    else
      null
  )

  AppDomain.CurrentDomain.add_ReflectionOnlyAssemblyResolve(resolver)
 
  tssettings.TypeScriptGeneratorSettings.ExtensionCode <- ReadFileAsString (projectRoot @@ "Build" @@ "generate-webapi-client.extension-code.ts")
  tssettings.TypeScriptGeneratorSettings.TypeScriptVersion <- 2.3m
  tssettings.TypeScriptGeneratorSettings.GenerateCloneMethod <- true
  tssettings.TypeScriptGeneratorSettings.GenerateConstructorInterface <- true

  let controllers = Seq.collect WebApiToSwaggerGenerator.GetControllerClasses [inputAssembly]
  let generator = WebApiToSwaggerGenerator(settings)
  let document = generator.GenerateForControllersAsync(controllers).Result;
  let generator = SwaggerToTypeScriptClientGenerator(document, tssettings)
  let code = generator.GenerateFile()
  File.WriteAllText(outputApiTs, code)

!! "./Backend/src/SSAH.Infrastructure.Api/bin/Release/netcoreapp2.0/publish/SSAH.Infrastructure.Api.dll"
|> SetBaseDir projectRoot
|> Seq.map System.Reflection.Assembly.ReflectionOnlyLoadFrom
|> Seq.iter (fun assembly -> generate assembly (projectRoot @@ "/Frontend/src/app/api.ts"))
