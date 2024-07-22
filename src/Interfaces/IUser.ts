interface IUser {
    usuario: string;
    nome: string;
    senha?: string;
    ativo?: boolean;
    cargo?: number[];
}

export default IUser