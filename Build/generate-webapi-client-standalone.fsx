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

open NSwag.CodeGeneration.TypeScript
open NSwag.SwaggerGeneration.WebApi

let projectRoot = __SOURCE_DIRECTORY__ @@ ".."

let generate (inputAssembly: System.Reflection.Assembly) outputApiTs =
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
      Template = TypeScriptTemplate.Fetch,
      InjectionTokenType = InjectionTokenType.InjectionToken,
      GenerateOptionalParameters = true
    )

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

!! "./Backend/src/SSAH.Infrastructure.Api/bin/Release/netstandard2.0/publish/SSAH.Infrastructure.Api.dll"
|> SetBaseDir projectRoot
|> Seq.map System.Reflection.Assembly.LoadFrom
|> Seq.iter (fun assembly -> generate assembly (projectRoot @@ "/Frontend/src/api.ts"))
