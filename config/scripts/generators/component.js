#!/usr/bin/env node
const Handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')
const {getTemplate, snakeToCamel, camelToSnake} = require('../utils')
const { srcPath } = require('../../constants')
// get script args
const [, , componentName, ...argsOptions] = process.argv
const componentDirName = snakeToCamel(componentName)
const componentFileName = camelToSnake(componentName)
const componentFiles = [
  {
    templateName: '__mock__.js',
    outputFilename: `${componentFileName}.__mock__.js`
  },
  {
    templateName: 'actions.js',
    outputFilename: `${componentFileName}.actions.js`
  },
  {
    templateName: 'constants.js',
    outputFilename: `${componentFileName}.constants.js`
  },
  {
    templateName: 'index.jsx',
    outputFilename: 'index.jsx'
  },
  {
    templateName: 'reducer.js',
    outputFilename: `${componentFileName}.reducer.js`
  },
  {
    templateName: `styles.scss`,
    outputFilename: `${componentFileName}.scss`
  },
  {
    templateName: `index.test.jsx`,
    outputFilename: `${componentFileName}.test.jsx`
  }
]

const outputPath = getComponentDir(argsOptions)
createComponentDir(outputPath, componentDirName)
componentFiles.forEach(file => {
  const data = getCompiledTemplate(file.templateName)
  fs.writeFileSync(path.join(outputPath, componentDirName, file.outputFilename), data)
})

/**
 * creates component directory
 * @param outputPath string
 * @param componentDirName string
 */
function createComponentDir (outputPath, componentDirName) {
  const componentPath = path.join(outputPath, componentDirName)
  const componentDirExist = fs.existsSync(componentPath)
  if (!componentDirExist) {
    fs.mkdirSync(componentPath)
  }
}

/**
 * gets component directory
 * @param [flag, viewName ] Array<{string, string}>
 * @return {string}
 */
function getComponentDir ([flag, viewName]) {
  if (flag === '-c') {
    return path.join(srcPath, 'common', 'components')
  } else if (flag === '-v') {
    if (!viewName) {
      throw new Error('view name is required')
    }
    const viewPath = path.join(srcPath, 'views', viewName, 'components')
    const componentExist = fs.existsSync(viewPath)
    if (!componentExist) {
      fs.mkdirSync(viewPath)
    }
    return viewPath
  }
}

/**
 * gets compiled template
 * @param templateName string
 */
function getCompiledTemplate (templateName) {
  const source = getTemplate('component', templateName)
  const template = Handlebars.compile(source)
  const context = {componentName}
  return template(context)
}
