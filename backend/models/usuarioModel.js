class Usuario  {
    constructor ({id, nome, email, password, historicoPontuacoes}) {
        this.id = id
        this.nome = nome
        this.email = email
        this.password = password
        this.historicoPontuacoes = historicoPontuacoes
    };


    toJson() {
        return{
            id: this.id,
            nome: this.nome,
            email: this.email,
            historicoPontuacao: this.historicoPontuacoes
        };
    }
}

module.exports =  Usuario;