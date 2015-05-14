// use via node 01-fw.js testlst.lst
const chokidar = require('chokidar')
const assert = require('assert')
const path = require('path')
const fs = require('fs')
console.log("we're running");
//
const filePath = process.argv[2]
assert(filePath, 'no file path specified')

const baseUrl = path.relative(__dirname, path.resolve(path.dirname(filePath)))
console.log(__dirname);
console.log(path.dirname(filePath));
console.log(path.resolve(path.dirname(filePath)));
console.log(path.relative(__dirname, path.resolve(path.dirname(filePath))));
console.log("end");


//if (global.baseUrl) global.baseUrl += '/'
//
//const watcher = chokidar.watch(filePath, { usePolling: true })
//
//// Quit when all windows are closed.
//
//    title: path.basename(filePath) + ' - vmd',
//
//
//  watcher.on('change', logChange)
//
//  function logChange () {
//    console.log("file changed!")
//  }
//})