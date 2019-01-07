const xml2json = require('xml2json');
const fs = require('fs');
const expat = require('node-expat');
const parser = new expat.Parser('UTF-8');

const mainJSON = {
  scripts: [],
  layout: {}
};
let IS_LAYOUT = false;
const subitems = []
const currentObj = {}
_assign = Object.assign

parser.on('startElement', function (name, attrs) {
  console.log('startElement: ', name, attrs)
  if(IS_LAYOUT){
    currentObj = _assign(attrs, {
      qName: name,
      isComplete: false
    })
    return;
  }

  switch(name){
    case 'manifest' || 'scripts':
      break;
    case 'page':
      mainJSON.id = name;
      break;
    case 'script':
      mainJSON['scripts'].push(attrs);
      break;
    case 'layout':
      attrs = Object.assign(attrs, {qName: 'view', subitems: []})
      mainJSON['layout'] = attrs;
      IS_LAYOUT = true;
      console.log('mainJSON------', mainJSON)
      break;
    default:
      console.log(mainJSON)
      // throw new Error('解析出错！');
  }
})

parser.on('endElement', function (name) {
  console.log('endElement', name)
})

parser.on('text', function (text) {
  if(text.trim()){
    console.log('text', text)
  }
})

parser.on('error', function (error) {
  console.error('error', error)
})

const axml = fs.readFileSync('a.xml')
const xmlString = axml.toString()
console.log(xmlString)
parser.write(xmlString)



// console.log(JSON.stringify(JSON.parse(obj), null, 2))

// fs.writeFileSync('a.json', JSON.stringify(obj, null, 2))









