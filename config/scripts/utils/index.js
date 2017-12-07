const path = require('path')
const fs = require('fs')
// helpers
module.exports.snakeToCamel = function snakeToCamel (snake) {
  return snake.split('-').map((item, idx) => {
    const [first, ...rest] = item.split('')
    const upperFirst = (first || '').toUpperCase()
    return [upperFirst, ...rest].join('')
  }).join('')
}

module.exports.camelToSnake = function camelToSnake (camel) {
  if (camel.indexOf('-') >= 0) {
    return camel
  }
  return camel.split('').map((litter, idx) => {
    if (idx === 0) {
      return litter.toLowerCase()
    }
    if (litter === litter.toUpperCase()) {
      return `-${litter.toLowerCase()}`
    }
    return litter
  }).join('')
}

module.exports.nameToHumanName = function nameToHumanName (name) {
  return camelToSnake(name).split('-').map(snakeToCamel).join(' ')
}

module.exports.getTemplate = function getTemplate (templateType, templateName) {
  const templatePath = path.join(path.dirname(__dirname), '..', 'templates', templateType, templateName)
  return fs.readFileSync(templatePath).toString()
}

module.exports.getSrcPath = function getSrcPath () {
  return path.join(path.dirname(__dirname), '..', '..', 'src')
}
