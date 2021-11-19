export class Contato {
    private _id : string;
    private _nome : string;
    private _telefone : number;
    private _sexo : string;
    private _data_nascimento : string

    constructor(nome : string, telefone : number, sexo : string, data_nascimento : string)
    {
        this._nome = nome;
        this._telefone = telefone;
        this._sexo = sexo;
        this._data_nascimento = data_nascimento;
    }

    public getId() : string{
        return this._id;
    }

    public setId(id : string) : void{
        this._id = id;
    }

    public getNome() : string{
        return this._nome;
    }

    public getTelefone() : number{
        return this._telefone;
    }

    public setNome(nome : string) : void{
        this._nome = nome;
    }

    public setTelefone(telefone : number) : void{
        this._telefone = telefone;
    }

    public getSexo() : string{
        return this._sexo;
    }

    public getDataNascimento() : string{
        return this._data_nascimento;
    }

    public setSexo(sexo : string) : void{
        this._sexo = sexo;
    }

    public setDataNascimento(data_nascimento : string) : void{
        this._data_nascimento = data_nascimento;
    }
}
