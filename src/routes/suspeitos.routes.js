import { Router } from "express";

const suspeitosRoutes = Router();

// Array com futuros suspeitos
let suspeitos = [

];

//Rota para cadastrar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
    const { nome, profissao, envolvido, nivel } = req.body;

    // Validação dos campos nome e profissão
    if (!nome || !profissao) {
        return res.status(400).send({
            message: "O nome ou o profissão não foi preenchido!",
        });
    }

    // Validação do nível de suspeita
    if (nivel != 'baixo' && nivel != 'médio' && nivel != 'alto') {
        return res.status(400).send({
            message:
                "O suspeito não possui o nível de suspeita!",
        });
    }

    //Validação do envolvimento em apostas
    if (envolvido != 'sim' && envolvido != 'não') {
        return res.status(400).send({
            message:
                "Insira sim ou não no envolvimento de apostas!",
        });
    }

    // Criação de um novo suspeito
    const novoSuspeito = {
        id: Math.floor(Math.random() * 1000000),
        nome,
        profissao,
        envolvido,
        nivel,
    };

    // Adiciona o novo suspeito ao array
    suspeitos.push(novoSuspeito);

    return res.status(201).json({
        message: "Suspeito cadastrado com sucesso!",
        novoSuspeito,
    });
});

//Rota para buscar os suspeitos
suspeitosRoutes.get("/", (req, res) => {
    return res.status(200).json(suspeitos);
})

// Rota para buscar um suspeito pelo id
suspeitosRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    // Busca um suspeito pelo id no array
    const suspeito = suspeitos.find((criminoso) => criminoso.id == id);

    // Verifica se o suspeito foi encontrado
    if (!suspeito) {
        return res
            .status(404)
            .json({ message: `Suspeito com id ${id} não encontrado!` });
    }

    return res.status(200).json(suspeito);
});

// Rota para atualizar um suspeito pelo id
suspeitosRoutes.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome, profissao, envolvido, nivel } = req.body;

    // Busca um suspeito pelo id no array
    const suspeito = suspeitos.find((criminoso) => criminoso.id == id);

    // Verifica se o suspeito foi encontrado
    if (!suspeito) {
        return res
            .status(404)
            .json({ message: `Suspeito com id ${id} não encontrado!` });
    }

    // Validação dos campos nome e profissão
    if (!nome || !profissao) {
        return res.status(400).send({
            message: "O nome ou o profissão não foi preenchido!",
        });
    }

    // Validação do nível de suspeita
    if (nivel != 'baixo' && nivel != 'médio' && nivel != 'alto') {
        return res.status(400).send({
            message:
                "O suspeito não possui o nível de suspeita!",
        });
    }

    //Validação do envolvimento em apostas
    if (envolvido != 'sim' && envolvido != 'não') {
        return res.status(400).send({
            message:
                "Insira sim ou não no envolvimento de apostas!",
        });
    }

    suspeito.nome = nome;
    suspeito.profissao = profissao;
    suspeito.envolvido = envolvido;
    suspeito.nivel = nivel;

    return res.status(200).json({
        message: "Suspeito atualizado com sucesso!",
        suspeito,
    });
});

//Rota que deleta um suspeito pelo id
suspeitosRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;

    // Busca um suspeito pelo id no array
    const suspeito = suspeitos.find((criminoso) => criminoso.id == id);

    // Verifica se o suspeito foi encontrado
    if (!suspeito) {
        return res
            .status(404)
            .json({ message: `Suspeito com id ${id} não encontrado!` });
    }

    // Remove o suspeito do array
    suspeitos = suspeitos.filter((suspeito) => suspeito.id != id);

    return res.status(200).json({
        message: "Suspeito removido com sucesso!",
        suspeito,
    });
});

export default suspeitosRoutes;