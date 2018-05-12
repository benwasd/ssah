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
#r "./../Backend/src/SSAH.Infrastructure.Api/bin/Release/netstandard2.0/SSAH.Infrastructure.Api.dll"

open Fake
open System.IO

open NSwag.AssemblyLoader
open NSwag.CodeGeneration.TypeScript
open NSwag.SwaggerGeneration.WebApi
open System.Runtime
open System.Security.Policy
open System.Reflection

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
      Template = TypeScriptTemplate.Angular,
      InjectionTokenType = InjectionTokenType.InjectionToken,
      GenerateOptionalParameters = true
    )

  //let resolver = ResolveEventHandler(fun _ args ->
  //  let name = args.Name.Substring(0, args.Name.IndexOf(','))

  //  let fileName1 = """""" + name + ".dll"
  //  // let fileName2 = """C:\Users\ben\.nuget\packages\netstandard.library\2.0.3\build\netstandard2.0\ref""" + name + ".dll"
      
  //  if (File.Exists fileName1) then
  //      printfn "Resolve %s" fileName1
  //      System.Reflection.Assembly.ReflectionOnlyLoadFrom(fileName1)
  //  //else if (File.Exists fileName2) then
  //  //    printfn "Resolve %s" fileName2
  //  //    System.Reflection.Assembly.ReflectionOnlyLoadFrom(fileName2)
  //  else
  //      printfn "Resolve %s" "null"
  //      null
  //)

  //let bindings = [
  //  new BindingRedirect("System.Runtime", "4.0.0.0", "b03f5f7f11d50a3a")
  //]
  //let preload = [
  //]
  //let y = new AppDomainIsolation<AssemblyLoader>("""C:\Code\ssah\Backend\src\SSAH.Infrastructure.Api\bin\Release\netcoreapp2.0\publish\""", null, bindings, preload)

  //let a = y.Domain.GetAssemblies()

  //for asx in a do
  //  printfn "Lol %s" asx.FullName

  tssettings.TypeScriptGeneratorSettings.ExtensionCode <- ReadFileAsString (projectRoot @@ "Build" @@ "generate-webapi-client.extension-code.ts")
  tssettings.TypeScriptGeneratorSettings.TypeScriptVersion <- 2.3m
  tssettings.TypeScriptGeneratorSettings.GenerateCloneMethod <- true
  tssettings.TypeScriptGeneratorSettings.GenerateConstructorInterface <- true

  //let controllers = Seq.filter (fun (x: System.Type) -> x.IsAbstract = false && x.Name.EndsWith("Controller")) []
  let generator = WebApiToSwaggerGenerator(settings)
  let document = generator.GenerateForControllersAsync([typeof<SSAH.Infrastructure.Api.Controllers.RegistrationController>]).Result;
  let generator = SwaggerToTypeScriptClientGenerator(document, tssettings)
  let code = generator.GenerateFile()
  File.WriteAllText(outputApiTs, code)

!! "./Backend/src/SSAH.Infrastructure.Api/bin/Release/netcoreapp2.0/publish/SSAH.Infrastructure.Api.dll"
|> SetBaseDir projectRoot
|> Seq.map System.Reflection.Assembly.LoadFrom
|> Seq.iter (fun assembly -> generate assembly (projectRoot @@ "/Frontend/src/app/api.ts"))
