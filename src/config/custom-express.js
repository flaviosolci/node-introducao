require('marko/node-require').install()
require('marko/express')

// retorna uma funçao
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use('*', (req, res, next) => {
  let inicio = parseFloat(new Date().getUTCMilliseconds())
  next()
  let final = parseFloat(new Date().getUTCMilliseconds())

  let total = final - inicio

  console.log(`Tempo de resposta = ${total} ms`)
})

app.use('/estatico', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

const routes = require('../app/routes/routes.js')
routes(app)

app.use((req, resp, next) => {
  return resp.status(404).marko(
    require('../app/views/erros/404.marko')
  )
})

app.use((error, req, resp, next) => {
  console.log(error)
  return resp.status(500).marko(
    require('../app/views/erros/500.marko')
  )
})

// dizendo para o node que esse modulo exporta o 'app'
module.exports = app
