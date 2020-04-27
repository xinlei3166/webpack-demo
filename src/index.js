import "./index.styl"
import { show } from './utils'
import cloneDeep from 'lodash/cloneDeep'

var html = require("../README.md")
var container = document.getElementById("markdown")
container.innerHTML = html

function random () {
  return Math.floor(Math.random() * 10)
}

for (let i of Array.from({ length: 10 })) {
  console.log(random() + 1)
}
show()

const obj1 = { a: 1 }
const obj2 = cloneDeep(obj1)
obj1.a = 111
console.log('obj1', obj1)
console.log('obj2', obj2)
