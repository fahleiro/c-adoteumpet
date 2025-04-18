# Documentação do Frontend

## Visão Geral
diretorio: C:\Users\gabriel.faleiro\Documents\GitHub_fahleiro\c-adoteumpet\frontend

O frontend do Adote um Pet é uma aplicação React que permite aos usuários se cadastrarem, fazerem login e gerenciarem seus pets.

## Como rodar
navegar até o diretorio e entao rodar `npm run dev`

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── pages/         # Páginas da aplicação
│   │   ├── Login.jsx  # Página de login
│   │   ├── Register.jsx # Página de registro
│   │   ├── Profile.jsx # Página de perfil
│   │   └── NewPet.jsx # Página de cadastro de pet
│   ├── App.jsx        # Configuração de rotas
│   └── main.jsx       # Ponto de entrada
└── package.json       # Dependências e scripts
```

## Páginas

### Login
Página de autenticação onde os usuários podem fazer login com email e senha.

### Registro
Página onde novos usuários podem se cadastrar fornecendo seus dados pessoais.

### Perfil
Página principal após o login, onde o usuário pode:
- Ver seus dados cadastrais
- Cadastrar novos pets
- Fazer logout

### Cadastro de Pet
Página para cadastrar novos pets, com os seguintes campos:
- Nome do pet
- Raça (opcional, com checkbox para indicar se tem raça definida)
- Idade
- Porte (Pequeno, Médio ou Grande)

## Navegação

1. Se o usuário estiver autenticado:
   - Tentativas de acessar `/login` ou `/register` são redirecionadas para `/profile`
   - Acesso a `/profile` e `/new-pet` é permitido
2. Se o usuário não estiver autenticado:
   - Tentativas de acessar `/profile` ou `/new-pet` são redirecionadas para `/login`
   - Acesso a `/login` e `/register` é permitido

## Funcionalidades

### Autenticação
- Login com email e senha
- Registro de novos usuários
- Logout
- Persistência da sessão com cookies

### Gerenciamento de Pets
- Cadastro de novos pets
- Validação de campos obrigatórios
- Opção para pets com ou sem raça definida
- Seleção de porte (Pequeno, Médio, Grande)

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para UI
- **React Router**: Roteamento
- **Vite**: Build tool
- **CSS**: Estilização

## Estilos

A aplicação utiliza CSS puro com um design minimalista e responsivo. Os estilos são organizados no arquivo `index.css` e incluem:

- Layout responsivo
- Cores e tipografia consistentes
- Animações suaves
- Design mobile-first

## Fluxo de Autenticação

1. Ao carregar a aplicação, o sistema verifica automaticamente se há um usuário autenticado
2. Se o usuário estiver autenticado:
   - Tentativas de acessar `/login` ou `/register` são redirecionadas para `/profile`
   - Acesso a `/profile` é permitido
3. Se o usuário não estiver autenticado:
   - Tentativas de acessar `/profile` são redirecionadas para `/login`
   - Acesso a `/login` e `/register` é permitido

## Próximos Passos

- Aprimorar dados necessarios para registro