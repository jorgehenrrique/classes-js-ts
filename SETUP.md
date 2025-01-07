# Configuração do Ambiente de Desenvolvimento

Este guia ajudará você a configurar seu ambiente para executar os exemplos e exercícios da apostila.

## Requisitos do Sistema

- Node.js (versão 18.0.0 ou superior)
- npm (versão 8 ou superior)
- Git
- Editor de código (recomendamos VS Code)

## Passo a Passo

### 1. Instalação do Node.js

#### Windows

1. Baixe o instalador em https://nodejs.org (versão LTS)
2. Execute o instalador e siga as instruções
3. Verifique a instalação:
   ```bash
   node --version  # Deve mostrar v18.x.x ou superior
   npm --version   # Deve mostrar 8.x.x ou superior
   ```

#### macOS

1. Use o Homebrew:
   ```bash
   brew install node
   ```
2. Ou baixe o instalador em https://nodejs.org

#### Linux

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Configuração do Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/jorgehenrrique/classes-js-ts.git
   cd classes-js-ts
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Estrutura do Projeto:
   ```
   projeto/
   ├── src/
   │   ├── exercicios/
   │   │   ├── 01-sistema-bancario/
   │   │   │   └── index.ts
   │   │   ├── 02-sistema-biblioteca/
   │   │   │   └── index.ts
   │   │   ├── 03-loja-online/
   │   │   │   └── index.ts
   │   │   └── 04-padroes-projeto/
   │   │       └── index.ts
   │   └── exemplos/
   │       ├── 01-conceitos-basicos/
   │       │   └── index.ts
   │       ├── 02-recursos-avancados/
   │       │   └── index.ts
   │       ├── 03-padroes-projeto/
   │       │   └── index.ts
   │       └── 04-exemplos-praticos/
   │           └── index.ts
   ├── tests/
   │   ├── exercicios/
   │   └── exemplos/
   ├── package.json
   └── README.md
   ```

### 3. Configuração do Editor (VS Code)

1. Baixe e instale o VS Code: https://code.visualstudio.com

2. Instale as extensões recomendadas:

   - ESLint
   - Prettier
   - TypeScript and JavaScript Language Features

3. Configure o formatador automático:
   - Pressione `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (macOS)
   - Digite "Open Settings (JSON)"
   - Adicione estas configurações:
     ```json
     {
       "editor.formatOnSave": true,
       "editor.defaultFormatter": "esbenp.prettier-vscode",
       "typescript.updateImportsOnFileMove.enabled": "always",
       "editor.codeActionsOnSave": {
         "source.fixAll.eslint": true
       }
     }
     ```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### Exercícios

```bash
# Exercício 1: Sistema Bancário
npm run dev:exercicio1

# Exercício 2: Sistema de Biblioteca
npm run dev:exercicio2

# Exercício 3: Sistema de Loja Online
npm run dev:exercicio3

# Exercício 4: Padrões de Projeto
npm run dev:exercicio4
```

### Exemplos

```bash
# Exemplo 1: Conceitos Básicos
npm run dev:exemplo1

# Exemplo 2: Recursos Avançados
npm run dev:exemplo2

# Exemplo 3: Padrões de Projeto
npm run dev:exemplo3

# Exemplo 4: Exemplos Práticos
npm run dev:exemplo4
```

### Testes

```bash
# Executar testes
npm test

# Executar testes com cobertura
npm run coverage
```

### Outros Scripts

```bash
# Verificar problemas de código
npm run lint

# Formatar código
npm run format
```

## Executando os Exercícios

1. Navegue até o arquivo do exercício em `src/exercicios/`
2. Implemente as classes e interfaces solicitadas
3. Execute o script correspondente (ex: `npm run dev:exercicio1`)
4. O arquivo será executado em modo watch, atualizando automaticamente quando você salvar

## Dicas de Desenvolvimento

1. **Auto-save**: Ative o salvamento automático no VS Code

   - File > Auto Save

2. **Terminal Integrado**: Use o terminal do VS Code

   - View > Terminal ou `` Ctrl+` ``

3. **Debugging**:

   - Coloque breakpoints clicando na margem esquerda
   - Use F5 para iniciar o debugging
   - Use F10 para passar sobre uma linha
   - Use F11 para entrar em uma função

4. **Atalhos Úteis**:
   - `Ctrl+Space`: Sugestões de código
   - `F12`: Ir para definição
   - `Alt+Shift+F`: Formatar código
   - `Ctrl+P`: Buscar arquivo

## Solução de Problemas

### Erro: módulo não encontrado

```bash
npm install [nome-do-modulo]
```

### Erro: problemas com TypeScript

```bash
npm install --save-dev typescript @types/node
```

### Erro: ESLint não funcionando

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

## Recursos Adicionais

- [Documentação do TypeScript](https://www.typescriptlang.org/docs)
- [Documentação do TSX](https://github.com/esbuild-kit/tsx)
- [Documentação do Vitest](https://vitest.dev)
- [Node.js Docs](https://nodejs.org/docs)
- [VS Code Docs](https://code.visualstudio.com/docs)
