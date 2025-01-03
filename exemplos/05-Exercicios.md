# Exercícios Práticos

Este arquivo contém exercícios para praticar os conceitos aprendidos sobre classes.

## Exercício 1: Sistema Bancário

Crie um sistema bancário simples com as seguintes funcionalidades:

1. Criar conta
2. Depositar
3. Sacar
4. Transferir
5. Ver saldo

### Template Inicial

```typescript
// Implemente as classes aqui
class ContaBancaria {
  // Implementar
}

class Cliente {
  // Implementar
}

class Banco {
  // Implementar
}
```

### Exemplo de Solução

```typescript
class Cliente {
  constructor(private nome: string, private cpf: string) {}

  getNome(): string {
    return this.nome;
  }

  getCpf(): string {
    return this.cpf;
  }
}

class ContaBancaria {
  private saldo: number = 0;

  constructor(private numero: string, private cliente: Cliente) {}

  depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
    }
  }

  sacar(valor: number): boolean {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }

  getSaldo(): number {
    return this.saldo;
  }

  getCliente(): Cliente {
    return this.cliente;
  }
}

class Banco {
  private contas: Map<string, ContaBancaria> = new Map();

  criarConta(cliente: Cliente): string {
    const numero = Math.random().toString(36).substr(2, 9);
    const conta = new ContaBancaria(numero, cliente);
    this.contas.set(numero, conta);
    return numero;
  }

  getConta(numero: string): ContaBancaria | undefined {
    return this.contas.get(numero);
  }

  transferir(
    contaOrigem: string,
    contaDestino: string,
    valor: number
  ): boolean {
    const origem = this.getConta(contaOrigem);
    const destino = this.getConta(contaDestino);

    if (origem && destino && origem.sacar(valor)) {
      destino.depositar(valor);
      return true;
    }

    return false;
  }
}
```

## Exercício 2: Sistema de Biblioteca

Crie um sistema para gerenciar uma biblioteca com:

1. Cadastro de livros
2. Cadastro de usuários
3. Empréstimo de livros
4. Devolução de livros
5. Consulta de disponibilidade

### Template Inicial

```typescript
class Livro {
  // Implementar
}

class Usuario {
  // Implementar
}

class Biblioteca {
  // Implementar
}
```

## Exercício 3: Sistema de Loja Online

Implemente um sistema de loja online com:

1. Cadastro de produtos
2. Carrinho de compras
3. Cálculo de frete
4. Aplicação de descontos
5. Finalização de pedido

### Template Inicial

```typescript
interface Produto {
  // Definir interface
}

class CarrinhoCompras {
  // Implementar
}

class Pedido {
  // Implementar
}
```

## Exercício 4: Padrões de Projeto

Implemente os seguintes padrões de projeto:

### 1. Singleton - Gerenciador de Configurações

```typescript
class ConfigManager {
  // Implementar Singleton
}
```

### 2. Factory - Criador de Documentos

```typescript
interface Documento {
  // Definir interface
}

class DocumentoFactory {
  // Implementar Factory
}
```

### 3. Observer - Sistema de Eventos

```typescript
interface Observer {
  // Definir interface
}

class Subject {
  // Implementar Subject
}
```

## Dicas para Resolução

1. Comece com a estrutura básica
2. Implemente uma funcionalidade por vez
3. Teste cada funcionalidade após implementá-la
4. Use TypeScript para maior segurança
5. Siga os princípios SOLID

## Desafios Extras

1. Adicione tratamento de erros
2. Implemente persistência de dados
3. Adicione validações
4. Crie testes unitários
5. Documente o código

## Critérios de Avaliação

1. **Funcionalidade (40%)**

   - Todas as funcionalidades funcionam corretamente
   - Tratamento adequado de erros
   - Validações apropriadas

2. **Código (30%)**

   - Clareza e organização
   - Uso apropriado de classes e interfaces
   - Princípios SOLID aplicados

3. **Padrões (20%)**

   - Uso correto dos padrões de projeto
   - Estrutura bem definida
   - Reutilização de código

4. **Documentação (10%)**
   - Código bem comentado
   - README claro
   - Instruções de uso
