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

    app.get('/livros', (request, response) => {
        response.send(`
        <html>
            <head> 
                <meta charset="UTF-8">
            </head> 
            <body> 
                <h1> Listagem de Livros </h1> 
            </body>
        </html>
    `);

    });
};
