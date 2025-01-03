# Configuração do Ambiente de Desenvolvimento

Este guia ajudará você a configurar seu ambiente para executar os exemplos da apostila.

## Requisitos do Sistema

- Node.js (versão 18 ou superior)
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

3. Estrutura de pastas recomendada:
   ```
   projeto/
   ├── src/
   │   ├── exemplos/
   │   │   ├── basicos/
   │   │   ├── avancados/
   │   │   └── padroes/
   │   └── exercicios/
   ├── tests/
   ├── package.json
   └── tsconfig.json
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

### `npm run dev`

Inicia o servidor de desenvolvimento com hot-reload usando tsx.

```bash
npm run dev
```

### `npm run build`

Compila o projeto usando tsup.

```bash
npm run build
```

### `npm start`

Executa a versão compilada do projeto.

```bash
npm start
```

### `npm test`

Executa os testes usando Vitest.

```bash
npm test
```

### `npm run coverage`

Executa os testes com cobertura.

```bash
npm run coverage
```

## Executando os Exemplos

### TypeScript (Desenvolvimento)

```bash
npm run dev
```

### TypeScript (Produção)

```bash
npm run build
npm start
```

### Executando Arquivos Individuais

```bash
npx tsx src/exemplos/arquivo.ts
```

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
- [Documentação do TSUP](https://tsup.egoist.dev)
- [Node.js Docs](https://nodejs.org/docs)
- [VS Code Docs](https://code.visualstudio.com/docs)
