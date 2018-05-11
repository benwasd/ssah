const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const envPublicUrl = process.env.PUBLIC_URL;

const ensureSlash = function(needlePath, needsSlash) {
  const hasSlash = needlePath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return needlePath.substr(needlePath, needlePath.length - 1);
  } 
  else if (!hasSlash && needsSlash) {
    return needlePath + "/";
  }

  return needlePath;
}

const getPublicUrl = function(appPackageJson) {
  return envPublicUrl || require(appPackageJson).homepage
}

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson)
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/')
  return ensureSlash(servedUrl, true)
}

module.exports = {
  appNodeModules: resolveApp('node_modules'),
  appHtml: resolveApp('public/index.html'),
  appIndexTsx: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  dist: resolveApp('dist'),
  servedPath: getServedPath(resolveApp('package.json'))
}
