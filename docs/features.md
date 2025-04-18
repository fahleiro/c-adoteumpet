# Features
_Features do projeto adoteumpet_

## Cadastro de usuario
- integracao com banco de dados postgres
- usuario
- senha
- primeiro nome
- ultimo nome
- email
- telefone principal
- telefone Secundário
- cep
- estado
- cidade
- bairro
- rua
- numero rua
- complemento

## Login de usuario
- login pelo usuario ou email e senha
- salvamento do login no navegador via cookie e jsonwebtoken
    - o usuario nao sera deslogado a menos que ele mesmo deslogue

## Cadastro de um pet no perfil do usuario
- integracao com banco de dados postgres
- nome do pet
- idade do pet
- raca
- porte
- opcao `Disponivel para adocao`
    - essa opcao deve ser preenchida no momento da criacao do pet e é a unica que pode ser alterada posterior a criacao do pet
    - essa opcao deve ter um aviso quando usuario quiser editar garantido a certeza e o mesmo deve digitar o nome do pet pra salvar a alteracao
- tipo animal
    - cachorro
    - gato

## Visualizar meus pets
- tela de visualizar os pets cadastrados em nome do usuario - apenas visualizar

## Lista de Pets disponiveis para adocao
- devemos ter uma opcao ao logar no perfil de usuario que direciona para uma pagina de lista de pets disponiveis para adocao
- ao ser direcionado retorna a lista dos pets disponiveis para adocao com os dados do pet
    - nome do pet
    - idade do pet
    - raca
    - porte

## Funcionalidades do Sistema

## Cadastro de Usuário
- Formulário de cadastro com campos obrigatórios
- Validação de email único
- Criptografia de senha
- Armazenamento seguro dos dados

## Login
- Autenticação com email e senha
- Geração de token JWT
- Persistência da sessão
- Proteção de rotas autenticadas

## Cadastro de Novo Pet
- Formulário com campos:
  - Nome do pet
  - Tipo de animal (Cachorro/Gato)
  - Raça (com opção de SRD)
  - Idade
  - Porte (Pequeno/Médio/Grande)
  - Sexo (Macho/Fêmea)
  - Castrado (Sim/Não)
  - Disponibilidade para adoção
  - Upload de imagem
- Validação de campos obrigatórios
- Preview da imagem antes do upload
- Feedback visual do processo

## Listagem de Pets
- Visualização em grid de cards
- Imagem do pet
- Informações detalhadas:
  - Nome
  - Tipo
  - Raça
  - Idade
  - Porte
  - Sexo
  - Status de castração
  - Status de disponibilidade
  - Localização (para pets disponíveis)
  - Doador (para pets disponíveis)
- Filtros por tipo e porte
- Paginação de resultados

## Gerenciamento de Pets
- Edição de informações
- Alteração de status de disponibilidade
- Upload/alteração de imagens
- Exclusão de pets

## Perfil do Usuário
- Visualização de dados pessoais
- Edição de informações
- Gerenciamento de pets cadastrados
- Histórico de adoções

## Processo de Adoção
- Visualização de pets disponíveis
- Detalhes completos do pet
- Informações de contato do doador
- Processo de solicitação de adoção
- Acompanhamento do status da solicitação