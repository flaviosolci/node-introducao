const app = require('./src/config/custom-express')
const porta = 3000

// callback chamanda apenas quando o servidor sobe
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`)
})
