// importação dos módulos para o desenvolvimento do servidor 
const express = require("express");

// recebe os dados em formato JSON do front 
const bodyParser = require("body-parser");

// importar o modulo do mongoose 
const mongoose = require ("mongoose");

// importar o modulo do cors
const cors = require ("cors");
const  config = {
          origin:"*",
          optionsSucessStatus:200
}

// urla de conexão com o banco de dados
const url = "mongodb+srv://lucianafama:r@m$e$8@lucianafama.zasdg.mongodb.net/lixoeletronico?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true});

// estrutura da tabela de notícias (mongo fera o ID automático)
const tbnoticias = mongoose.Schema({
  titulonoticia:String,
  autornoticia:String,
  datapublicacao:String,
  texto:String,
  foto:String
});

// estrutura da tabela de contatos dos usuários
const tbusuario = mongoose.Schema({
   nome:String,
   email:String,
   telefone:String,
   assunto:String,
   mensagem:String
});

// estrutura da tabela de cadastro de colaboradores (parceiro) 
const tbcolab = mongoose.Schema({
    nome:String,
    email:String,
    telefone:String,
    login:String,
    senha:String 
    
 });

// estrutura da tabela de cadastro dos administradores do site 
const tbadmin = mongoose.Schema({
    nome:String,
    email:String,
    telefone:String,
    login:String,
    senha:String 
 });

//  criação efetiva das tabelas no banco de dados
const Noticia = mongoose.model("notícia",tbnoticias);
const Usuario = mongoose.model("usuário",tbusuario);
const Colaborador = mongoose.model("colaborador",tbcolab);
const Administrador = mongoose.model("administrador",tbadmin);

// uso do servidor express com app
const app = express();

app.use(cors());

// registrar o uso do bodyParser
app.use(bodyParser.json());

// Criação da Rota Raiz ("/")
// Bem vindo
app.get("/",(req,res)=>{
    res.status(200).send({
        titulo:"Lixo Eletrônico",
        texto:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac sagittis massa. Aliquam elit ex, imperdiet in tincidunt nec, tincidunt a urna.",
        imagens:["https://ciclovivo.com.br/wp-content/uploads/2018/09/iStock-147036174-696x462.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWsLaSk-UCUaFyXIFh3jPzbwAa8NBnhVjElOybb7PbJKSmojSg82JBSaC0niXNDejGO0Y&usqp=CAU"

        ]

    });
});

// ====================== NOTÍCIAS ========================================================

// rota para cadastrar as notícias no banco de dados 
app.post("/noticia/cadastro",cors(config),(req,res)=>{
    const dados = new Noticia(req.body);
    dados.save().then((resultado)=>{
      res.status(201).send({output:"Dados cadastrados "+resultado})
    }).catch((erro)=>res.status(400).send({ouput:"Erro na execução "+erro }));
});

// rota para exibir as notícias cadastradas no banco de dados 
app.get("/noticias",cors(config),(req,res)=>{
    Noticia.find().then((rs)=>{
        res.status(200).send({output:rs})
    });
});

//rota para localizar uma noticia por seu ID
app.get("/noticias/:id", cors(config),(req,res)=>{
    Produto.findById(req.params.id).then((rs)=>{
        res.status(200).send({output:rs})
    });
});

// rota para atualizar os dados das notícias no banco de dados 
app.put("/atualizar/:id",cors(config),(req,res)=>{
    Noticia.findByIdAndUpdate(req.params.id,req.body,(erro,dados)=>{
        if(erro){
            res.status(400).send({output:"Erro ao tentar atualizar"+erro});
            return;
        }
        res.status(200).send({output:"a notícia foi atualizada com sucesso! "+dados});
    });
}); 

// rota para apagar uma notícia do banco de dados 
app.delete("/apagar/:id",cors(config),(req,res)=>{
    Noticia.findByIdAndDelete(req.params.id).then((rs)=>{
        res.status(200).send({output:"Notícia foi apagada do banco de dados."})
    });
});

// ====================== USUÁRIOS =======================================================

// rota para cadastrar o contato do usuário no banco de dados 
app.post("/usuario",cors(config),(req,res)=>{
    const dados = new Usuario(req.body);
    dados.save().then((resultado)=>{
      res.status(201).send({output:"Dados cadastrados "+resultado})
    }).catch((erro)=>res.status(400).send({ouput:"Erro na execução "+erro }));
});

// rota para exibir as insformações dos usuários cadastrados no banco de dados 
app.get("/usuarios",cors(config),(req,res)=>{
     Usuario.find().then((rs)=>{
         res.status(200).send({output:rs})
     });
});

//rota para localizar um usuário por seu ID
app.get("/usuarios/:id", cors(config),(req,res)=>{
    Produto.findById(req.params.id).then((rs)=>{
        res.status(200).send({output:rs})
    });
});

// rota para atualizar os dados dos usuários no banco de dados
app.put("/atualizar/:id",cors(config),(req,res)=>{
    Usuario.findByIdAndUpdate(req.params.id,req.body,(erro,dados)=>{
        if(erro){
            res.status(400).send({output:"Erro ao tentar atualizar"+erro});
            return;
        }
        res.status(200).send({output:"atualizado com sucesso! "+dados});
    });
});

// rota para apagar um usuário do banco de dados  
app.delete("/apagar/:id",cors(config),(req,res)=>{
    Usuario.findByIdAndDelete(req.params.id).then((rs)=>{
        res.status(200).send({output:"Usúario foi apagado do banco de dados."})
    });
}); 

// ====================== COLABORADORES ===================================================

// rota para cadastrar colaboradores do site no banco de dados  
app.post("/colaborador",cors(config),(req,res)=>{
    const dados = new Colaborador(req.body);
    dados.save().then((resultado)=>{
      res.status(201).send({output:"Dados cadastrados "+resultado})
    }).catch((erro)=>res.status(400).send({ouput:"Erro na execução "+erro }));
});

// rota para exibir as insformações dos colaboradores cadastrados no banco de dados 
app.get("/colaboradores",cors(config),(req,res)=>{
    Colaborador.find().then((rs)=>{
        res.status(200).send({output:rs})
    });
});

//rota para localizar um colaborador por seu ID
app.get("/colaboradores/:id", cors(config),(req,res)=>{
    Produto.findById(req.params.id).then((rs)=>{
        res.status(200).send({output:rs})
    });
});


// rota para atualizar os dados dos colaboradores no banco de dados 
app.put("/atualizar/:id",cors(config),(req,res)=>{
    Colaborador.findByIdAndUpdate(req.params.id,req.body,(erro,dados)=>{
        if(erro){
            res.status(400).send({output:"Erro ao tentar atualizar"+erro});
            return;
        }
        res.status(200).send({output:"atualizado com sucesso! "+dados});
    });
});

// rota para apagar um colaborador do banco de dados  
app.delete("/apagar/:id",cors(config),(req,res)=>{
    Colaborador.findByIdAndDelete(req.params.id).then((rs)=>{
        res.status(200).send({output:"Colaborador foi apagado do banco de dados."})
    });
}); 
// ====================== ADMINISTRADORES =================================================

// rota para cadastrar administradores do site no banco de dados  
app.post("/administrador",cors(config),(req,res)=>{
    const dados = new Administrador(req.body);
    dados.save().then((resultado)=>{
      res.status(201).send({output:"Dados cadastrados "+resultado})
    }).catch((erro)=>res.status(400).send({ouput:"Erro na execução "+erro }));
});

// rota para exibir as insformações dos administradores cadastrados no banco de dados 
app.get("/administradores",cors(config),(req,res)=>{
    Administrador.find().then((rs)=>{
        res.status(200).send({output:rs})
    });
});

//rota para localizar um administrador por seu ID
app.get("/administradores/:id", cors(config),(req,res)=>{
    Produto.findById(req.params.id).then((rs)=>{
        res.status(200).send({output:rs})
    });
});

// rota para atualizar os dados dos administradores no banco de dados
app.put("/atualizar/:id",cors(config),(req,res)=>{
    Administrador.findByIdAndUpdate(req.params.id,req.body,(erro,dados)=>{
        if(erro){
            res.status(400).send({output:"Erro ao tentar atualizar"+erro});
            return;
        }
        res.status(200).send({output:"atualizado com sucesso! "+dados});
    });
});

// rota para apagar um administrador do banco de dados  
app.delete("/apagar/:id",cors(config),(req,res)=>{
    Administrador.findByIdAndDelete(req.params.id).then((rs)=>{
        res.status(200).send({output:"Administrador foi apagado do banco de dados."})
    });
});

// configuração do servidor para ficar atento a porta de comunicação (3350)
app.listen(4000,()=>console.log("Servidor online ..."));
