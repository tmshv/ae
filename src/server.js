const express = require('express')
const next = require('next')
const multer = require('multer')
const axios = require('axios')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

function apiUpload(server) {
  const crypto = require('crypto')
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
  const uploader = multer({ storage: storage })

  server.put('/upload', uploader.single('file'), (req, res) => {
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

    const filepathBase = '/'

    return res.json({
      status: 'ok',
      filepath: `${filepathBase}${req.file.path}`
    })
  })
}

function apiUrlMeta(server) {
  server.get('/api/url/meta', async (req, res) => {
    const url = req.query.url

    try {
      const response = await axios.get(url)
      const metadata = await getMeta(response.data, url)

      return res.json({
        url,
        metadata,
      })
    } catch (error) {
      return res.status(500).json({
        url,
        error,
      })
    }
  })
}

function api(server) {
  apiUpload(server)
  apiUrlMeta(server)

  return server
}

async function getMeta(html, url) {
  const metascraper = require('metascraper')([
    // require('metascraper-author')(),
    // require('metascraper-date')(),
    require('metascraper-description')(),
    require('metascraper-image')(),
    // require('metascraper-logo')(),
    // require('metascraper-clearbit-logo')(),
    // require('metascraper-publisher')(),
    require('metascraper-title')(),
    require('metascraper-url')()
  ])

  return metascraper({ html, url })
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
