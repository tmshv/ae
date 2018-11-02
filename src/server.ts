const express = require('express')
const multer = require('multer')
const next = require('next')
const crypto = require('crypto')
// const { api } = require('./api')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


function getFilename(cb) {
  crypto.pseudoRandomBytes(16, function (err, raw) {
    if (err) {
      return cb(err, null)
    }

    return cb(null, raw.toString('hex'))
  })
}

function getFileExtention(file) {
  if (file.mimetype === 'image/jpeg') {
    return '.jpg'
  }

  return ''
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/uploads/')
  },
  filename: function (req, file, cb) {
    getFilename((err, name) => {
      if (err) {
        return cb(err, null)
      }

      const filename = name + getFileExtention(file)
      return cb(null, filename)
    })
  }
})
const upload = multer({ storage: storage })

function api(server) {
  server.put('/upload', upload.single('file'), (req, res) => {
    // {
    //   fieldname: 'file',
    //   originalname: '17.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg',
    //   destination: 'static/uploads/',
    //   filename: 'bf6075170b34eca67514e4b734819482',
    //   path: 'static/uploads/bf6075170b34eca67514e4b734819482',
    //   size: 351322,
    // }
    console.log(req.file)

    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    const filepathBase = '/'

    return res.json({
      status: 'ok',
      filepath: `${filepathBase}${req.file.path}`
    })
  })

  // server.get('/p/:id', (req, res) => {
  //   const actualPage = '/post'
  //   const queryParams = {
  //     id: req.params.id,
  //   }

  //   return app.render(req, res, actualPage, queryParams)
  // })

  return server
}

app.prepare()
  .then(() => {
    const server = api(express())

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
