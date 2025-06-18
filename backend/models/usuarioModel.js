class Usuario  {
    constructor ({id, nome, email, password, historico_pontuacoes}) {
        this.id = id
        this.nome = nome
        this.email = email
        this.password = password
        this.historico_pontuacoes = historico_pontuacoes
    };


    toJson() {
        return{
            id: this.id,
            nome: this.nome,
            email: this.email,
            historico_pontuacoes: this.historico_pontuacoes
        };
    }
}

module.exports =  Usuario;