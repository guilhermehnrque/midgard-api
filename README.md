# Midgard-API

Este é um exemplo de um projeto Node.js com o objetivo de desenvolver uma API para gerenciamento de times de esporte

## Tecnologias Usadas

- **Node.js**: Plataforma para execução de código JavaScript no servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para SQL, facilitando a interação com bancos de dados.
- **dotenv**: Carregamento de variáveis de ambiente.
- **@godaddy/terminus**: Health checks para a aplicação.

## Requisitos

Certifique-se de ter [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) instalados.

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/guilhermehnrque/gdo-project.git
    ```

2. Navegue para o diretório do projeto:

    ```bash
    cd gdo-project
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente:

    Copie o arquivo `.env.example` na raiz do projeto e adicione as variáveis de ambiente necessárias.

5. Compile o projeto:

    ```bash
    npm run build
    ```

## Executando o Projeto

Para iniciar a aplicação em modo de desenvolvimento, utilize o comando:

```bash
npm run dev
