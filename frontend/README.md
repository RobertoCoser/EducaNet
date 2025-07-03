# EducaNet Frontend

Este é o frontend do sistema **EducaNet**, uma solução de gestão escolar moderna e intuitiva. Desenvolvido em [React](https://react.dev/), ele consome uma API backend para fornecer funcionalidades de gerenciamento de escolas, turmas, alunos e usuários.

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/) para navegação entre páginas
- [React Icons](https://react-icons.github.io/react-icons/) para ícones
- [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API) para comunicação com o backend

## Instalação

1. **Clone este repositório ou baixe os arquivos**
2. Entre na pasta `frontend`:
    ```sh
    cd frontend
    ```
3. Instale as dependências:
    ```sh
    npm install
    ```
4. Inicie o frontend:
    ```sh
    npm start
    ```
   O app estará disponível em `http://localhost:3000`

## Configuração

O frontend se comunica com o backend via API. Certifique-se de que o backend esteja rodando e, se necessário, ajuste a URL da API nos arquivos do frontend (exemplo: `src/api/auth.js`).

## Scripts

- `npm start` — inicia o servidor de desenvolvimento
- `npm run build` — gera a versão de produção
- `npm test` — executa os testes (se configurado)

## Estrutura dos Principais Diretórios

```
frontend/
├── public/
├── src/
│   ├── api/           # Funções de acesso à API (autenticação, CRUD, etc)
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Páginas principais do sistema (Login, Escolas, Turmas, etc)
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Funcionalidades

- Login e cadastro de administradores
- Listagem, cadastro e edição de escolas
- Gerenciamento de turmas e alunos
- Interface responsiva e moderna

## Customização

Você pode personalizar cores, layout e ícones editando os arquivos em `src/pages` e `src/components`.

## Contato

Desenvolvido por Roberto Vigo Coser  
Para dúvidas ou sugestões, abra uma issue ou entre em contato pelo GitHub.
