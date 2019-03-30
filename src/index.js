#!/usr/bin/env node

const log = console.log.bind(this)
const fs = require('fs')
const path = require('path')
const R = require('ramda')
const jimp = require('jimp');


fs.readdir(process.cwd(), (err, files) => {
  if (err) throw err
  console.log(process.cwd())

  const isJPEG = (fileName) => {
    const extension = path.extname(fileName).toLowerCase()
    return R.contains(extension, ['.jpg', '.jpeg'])
  }
  
  const jpegs = R.filter(isJPEG, files)

  console.log('Tranforming', jpegs.length === 0 ? 'nothing' : 'the following ' + jpegs.length + ' files: \n')

  let count = 0
  jpegs.forEach(fileName => {
    jimp.read(fileName, (err, image) => {
      if (err) throw err
      console.log('processing...', fileName)


      image
        .scaleToFit(1920, 1920)
        .quality(35) // set JPEG quality -
        .write([
          fileName.replace(/\.[^/.]+$/, ''),
          '_small',
          path.extname(fileName).toLowerCase()
        ].join(''))
      count++
      if (count === jpegs.length) {
        console.log('\nDONE!')
      }
    })
  })
})