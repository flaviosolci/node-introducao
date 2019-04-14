const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database');

module.exports = (app) => {
    // GET request
    app.get('/', (request, response) => {
        response.send(`
        <html>
            <head> 
                <meta charset="UTF-8">
            </head> 
            <body> 
                <h1> Casa do Código </h1> 
            </body>
        </html>
    `);

    });
    // ==========================================
    // == LISTA LIVROS
    // ==========================================
    app.get('/livros', (request, response) => {
        let livroDao = new LivroDao(db);

        livroDao.lista()
            .then((resultado) => {
                response.marko(require('../views/livros/lista/lista.marko'), {
                    livros: resultado
                });
            })
            .catch(error => console.log(error));
    });

    // ==========================================
    // == ADD LIVROS
    // ==========================================

    app.get('/livros/form', (request, response) => {
        response.marko(require('../views/livros/form/form.marko'), {
            livro: {
                id: '',
                titulo: '',
                preco: '',
                desrcricao: ''
            }
        });
    });


    app.post('/livros', (request, response) => {

        console.log('=== Inserindo livro ====');
        let livroDao = new LivroDao(db);
        livroDao.adiciona(request.body)
            .then(response.redirect('/livros'))
            .catch(error => console.log(error));
    });



    // ==========================================
    // == EDITAR LIVROS
    // ==========================================


    app.put('/livros', (request, response) => {

        console.log('=== Atualizando livro ====');
        let livroDao = new LivroDao(db);
        livroDao.edita(request.body)
            .then(response.redirect('/livros'))
            .catch(error => console.log(error));
    });

    app.get('/livros/:id', (request, response) => {

        let livroID = request.params.id;

        console.log(`ID do livro ${livroID} `);
        let livroDao = new LivroDao(db);

        livroDao.livroById(livroID)
            .then((resultado) => {
                console.log(resultado);
                response.marko(require('../views/livros/form/form.marko'), {
                    livro: resultado
                });
            })
            .catch(error => console.log(error));
    });


    // ==========================================
    // == REMOVER
    // ==========================================

    app.delete('/livros/:id', (request, response) => {
        let livroID = request.params.id;
        let livroDao = new LivroDao(db);
        livroDao.remove(livroID)
            .then(response.status(200).end())
            .catch(error => console.log(error));
    });

};
