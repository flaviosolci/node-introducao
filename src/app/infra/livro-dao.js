class LivroDao {

    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM livros', (error, resultado) => {
                if (error) {
                    return reject('Não foi possível listar os livros');
                }
                return resolve(resultado);
            });
        });
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            INSERT INTO LIVROS (
                    titulo,
                    preco, 
                    descricao
                ) values (?, ?, ?)
            `, [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                error => {
                    if (error) {
                        return reject(`Não foi possível adicionar o livro --> ${livro}`);
                    }
                    return resolve();
                });


        });
    }

    edita(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
           UPDATE livros SET titulo =  ?, preco = ?, descricao = ? 
           WHERE id = ?
            `, [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                error => {
                    if (error) {
                        return reject(`Não foi possível editar o livro --> ${livro}`);
                    }
                    return resolve();
                });


        });
    }

    livroById(livroId) {
        return new Promise((resolve, reject) => {
            this._db.get(` 
            SELECT  
                id,
                titulo,
                preco,
                descricao 
            FROM livros where id =? `,
                [livroId],
                (error, resultado) => {
                    if (error) {
                        return reject('Não foi possível listar os livros');
                    }
                    console.log(`===== Livro encontrado ==== `);
                    console.log(resultado);
                    

                    return resolve(resultado);
                });
        });
    }

    remove(livroId) {
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM livros where id =? `,
                [livroId],
                (error) => {
                    if (error) {
                        return reject(`Não foi possível remover o livro --> ${livroId}`);
                    }
                    return resolve();
                });
        });
    }
}

module.exports = LivroDao;