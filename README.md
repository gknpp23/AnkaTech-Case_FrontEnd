# Anka Tech - Interface de Gestão (Frontend)

Este repositório contém a interface de usuário (frontend) da aplicação de gestão de clientes e ativos, desenvolvida para o case da Anka Tech.

O projeto foi construído com **Next.js**, **TypeScript**, **Tailwind CSS** e **ShadCN** para os componentes de UI.

## Funcionalidades Implementadas

* **Página de Clientes:**
    * Listagem completa de todos os clientes.
    * Funcionalidade para **criar**, **editar** e **deletar** clientes.
    * Interface reativa que atualiza a lista após as operações de CRUD.
* **Página de Ativos:**
    * Visualização de uma lista estática de ativos financeiros.
* **Navegação Global:**
    * Cabeçalho persistente para fácil navegação entre as seções da aplicação.

## Como Rodar

### Pré-requisitos
* Node.js e npm instalados.
* O **serviço de backend** deste projeto deve estar rodando (disponível em `http://localhost:3333`). Consulte o repositório do backend para instruções de como iniciá-lo.

### Passos para Execução

1.  **Clone o Repositório:**
    ```bash
    git clone [URL_DO_SEU_REPO_FRONTEND]
    cd [pasta-do-repo-frontend]
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse a Aplicação:**
    * Abra seu navegador no endereço: `http://localhost:3000`.
