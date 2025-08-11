class Usuario  {
    constructor ({id, nome, sobrenome, data_nascimento, email, password, historico_pontuacoes}) {
        this.id = id
        this.nome = nome
        this.sobrenome = sobrenome
        this.data_nascimento = data_nascimento
        this.email = email
        this.password = password
        this.historico_pontuacoes = historico_pontuacoes
    };


    toJson() {
        return{
            id: this.id,
            nome: this.nome,
            sobrenome: this.sobrenome,
            data_nascimento: this.data_nascimento,
            email: this.email,
            historico_pontuacoes: this.historico_pontuacoes
        };
    }
}

module.exports =  Usuario;