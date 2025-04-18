# Guia de Instalação

Este guia fornece instruções passo a passo para configurar e executar o projeto Adote um Pet em seu ambiente local.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente instalado com o Node.js)
- Git (opcional, para clonar o repositório)

## Passo 1: Clonar o Repositório (Opcional)

Se você estiver usando Git, clone o repositório:

```bash
git clone https://github.com/seu-usuario/adoteumpet.git
cd adoteumpet
```

## Passo 2: Configurar o Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` com as seguintes variáveis:
```
PORT=3001
JWT_SECRET=sua-chave-secreta
NODE_ENV=development
```

4. Inicie o servidor backend:
```bash
npm start
```

O servidor backend estará rodando em `http://localhost:3001`.

## Passo 3: Configurar o Frontend

1. Abra um novo terminal e navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`.

## Verificação da Instalação

Para verificar se tudo está funcionando corretamente:

1. Acesse `http://localhost:5173` no seu navegador
2. Você deve ver a página de login
3. Tente criar uma nova conta clicando em "Registre-se"
4. Após o registro, você deve ser redirecionado para a página de perfil

## Solução de Problemas

### Backend não inicia
- Verifique se a porta 3001 está disponível
- Confirme se todas as dependências foram instaladas
- Verifique se o arquivo `.env` está configurado corretamente

### Frontend não inicia
- Verifique se a porta 5173 está disponível
- Confirme se todas as dependências foram instaladas
- Verifique se o backend está rodando

### Erros de Conexão
- Verifique se o backend está rodando na porta correta
- Confirme se as URLs no frontend estão apontando para o backend correto
- Verifique se não há problemas de CORS

## Próximos Passos

Após a instalação bem-sucedida, você pode:
1. Explorar a documentação do [backend](backend.md)
2. Explorar a documentação do [frontend](frontend.md)
3. Começar o desenvolvimento seguindo o [guia de desenvolvimento](development.md) 