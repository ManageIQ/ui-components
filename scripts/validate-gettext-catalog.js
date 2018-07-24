const fs = require('fs')
const path = require('path')
const potFile = path.join(__dirname, '../locale/ui-components.pot')
const contents = fs.readFileSync(potFile, 'utf8')
const re = /<(.|\n)*>/gim // checks for html
const matches = contents.match(re)

if (matches != null) {
  console.log('Errors exist in language file')
  console.log(matches)
  process.exit(1)
} else {
  process.exit(0)
}
