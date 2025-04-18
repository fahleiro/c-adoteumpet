# Guia de Desenvolvimento

Este guia fornece informações sobre como contribuir para o desenvolvimento do projeto Adote um Pet.

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

```
adoteumpet/
├── backend/           # API Node.js
├── frontend/          # Aplicação React
└── docs/             # Documentação
```

## Convenções de Código

### Backend

- Use camelCase para nomes de variáveis e funções
- Use PascalCase para nomes de classes
- Use snake_case para nomes de arquivos
- Comente seu código quando necessário
- Mantenha as funções pequenas e focadas

### Frontend

- Use camelCase para nomes de componentes e funções
- Use PascalCase para nomes de componentes React
- Use kebab-case para nomes de arquivos
- Mantenha os componentes pequenos e reutilizáveis
- Use CSS modules ou styled-components para estilos

## Fluxo de Desenvolvimento

1. Crie uma nova branch para sua feature:
```bash
git checkout -b feature/nome-da-feature
```

2. Faça suas alterações seguindo as convenções de código

3. Teste suas alterações localmente

4. Faça commit das alterações:
```bash
git add .
git commit -m "descrição das alterações"
```

5. Envie as alterações para o repositório:
```bash
git push origin feature/nome-da-feature
```

6. Crie um Pull Request

## Testes

### Backend

Para testar o backend:

1. Instale as dependências de desenvolvimento:
```bash
cd backend
npm install --save-dev jest
```

2. Execute os testes:
```bash
npm test
```

### Frontend

Para testar o frontend:

1. Instale as dependências de desenvolvimento:
```bash
cd frontend
npm install --save-dev @testing-library/react
```

2. Execute os testes:
```bash
npm test
```

## Depuração

### Backend

Para depurar o backend:

1. Adicione `console.log` estratégicos
2. Use o debugger do Node.js:
```bash
node --inspect server.js
```

### Frontend

Para depurar o frontend:

1. Use as ferramentas de desenvolvedor do navegador
2. Adicione `console.log` estratégicos
3. Use o React Developer Tools

## Deploy

### Backend

Para fazer deploy do backend:

1. Configure as variáveis de ambiente no servidor
2. Instale as dependências:
```bash
npm install --production
```

3. Inicie o servidor:
```bash
npm start
```

### Frontend

Para fazer deploy do frontend:

1. Construa a aplicação:
```bash
npm run build
```

2. Sirva os arquivos estáticos

## Próximos Passos

- [ ] Implementar testes automatizados
- [ ] Adicionar CI/CD
- [ ] Melhorar a documentação
- [ ] Adicionar mais features
- [ ] Otimizar o desempenho 