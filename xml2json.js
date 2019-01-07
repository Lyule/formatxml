const xml2json = require('./xml2json/lib')

var xml = "<foo attr=\"value\">bar</foo>";
xml2json.toJson(xml)