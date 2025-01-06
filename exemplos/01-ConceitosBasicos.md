# Conceitos Básicos de Classes

> Referências:
>
> - [MDN Web Docs - Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
> - [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

## Glossário de Termos

Antes de começar, vamos entender alguns termos importantes:

- **Classe**: É um modelo ou planta que define como um objeto deve ser criado. Pense em uma classe como uma "forma de bolo" que define a estrutura.
- **Objeto**: É uma instância de uma classe. Usando a analogia anterior, seria como um "bolo" feito a partir da forma.
- **Instância**: É quando criamos um objeto a partir de uma classe. O processo é chamado de "instanciação".
- **Método**: São funções que pertencem a uma classe e definem o comportamento dos objetos.
- **Propriedade**: São as características ou atributos que um objeto possui.
- **Construtor**: É um método especial que é chamado quando criamos um novo objeto.
- **Encapsulamento**: É o conceito de esconder detalhes internos e proteger dados dentro da classe.
- **this**: É uma palavra-chave que se refere ao objeto atual da classe.

## O que são Classes?

Classes são "plantas" ou "moldes" para criar objetos. Elas encapsulam dados (propriedades) e comportamentos (métodos) que são relacionados, permitindo criar múltiplas instâncias com as mesmas características.

### Exemplo Simples

```typescript
// Definindo uma classe
class Carro {
  // Propriedades: características do carro
  marca: string;
  modelo: string;
  ano: number;

  // Construtor: método chamado ao criar um novo carro
  constructor(marca: string, modelo: string, ano: number) {
    this.marca = marca; // this.marca se refere à propriedade da classe
    this.modelo = modelo; // this.modelo se refere à propriedade da classe
    this.ano = ano; // this.ano se refere à propriedade da classe
  }

  // Método: uma ação que o carro pode realizar
  ligar(): void {
    console.log('O carro está ligando...');
  }
}

// Criando uma instância (objeto) da classe Carro
const meuCarro = new Carro('Toyota', 'Corolla', 2022);
meuCarro.ligar(); // Chamando um método do objeto
```

## Por que usar Classes?

1. **Organização**:

   - Mantém código relacionado junto
   - Facilita encontrar e manter o código

2. **Reutilização**:

   - Permite criar múltiplos objetos com mesma estrutura
   - Evita repetição de código

3. **Manutenção**:

   - Facilita alterações e correções
   - Centraliza mudanças em um único lugar

4. **Encapsulamento**:
   - Protege dados e implementações
   - Controla acesso às propriedades

## Exemplo Prático em JavaScript

```javascript
class Pessoa {
  // O construtor é chamado quando criamos uma nova pessoa
  constructor(nome, idade) {
    // Definindo as propriedades da pessoa
    this.nome = nome;
    this.idade = idade;
  }

  // Método que a pessoa pode executar
  apresentar() {
    return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
  }
}

// Criando uma nova pessoa (instanciando a classe)
const pessoa1 = new Pessoa('Maria', 25);
console.log(pessoa1.apresentar()); // Olá, meu nome é Maria e tenho 25 anos.
```

## Exemplo Prático em TypeScript

```typescript
class Pessoa {
  // Em TypeScript, podemos definir tipos para as propriedades
  private nome: string; // private significa que só pode ser acessado dentro da classe
  private idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  // Método público que pode ser chamado fora da classe
  apresentar(): string {
    return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
  }
}

// Criando uma nova pessoa (instanciando a classe)
const pessoa1 = new Pessoa('Maria', 25);
console.log(pessoa1.apresentar()); // Olá, meu nome é Maria e tenho 25 anos.
```

## Quando usar Classes?

Use classes quando precisar:

1. **Criar múltiplos objetos com mesma estrutura**

   - Exemplo: Vários usuários em um sistema

2. **Representar entidades do mundo real**

   - Exemplo: Usuário, Produto, Pedido

3. **Organizar lógica relacionada**

   - Exemplo: Todas as operações de um carrinho de compras

4. **Implementar herança e polimorfismo**

   - Exemplo: Diferentes tipos de funcionários em uma empresa

5. **Encapsular dados e comportamentos**
   - Exemplo: Proteger informações sensíveis de um usuário

## Estrutura Básica

```typescript
class NomeDaClasse {
  // Propriedades: características do objeto
  propriedade1: tipo;
  propriedade2: tipo;

  // Construtor: inicializa o objeto
  constructor(param1: tipo, param2: tipo) {
    this.propriedade1 = param1;
    this.propriedade2 = param2;
  }

  // Métodos: ações que o objeto pode realizar
  metodo1() {
    // implementação
  }

  metodo2() {
    // implementação
  }
}
```

## Dicas Importantes

1. Use nomes significativos para classes (substantivos)

   - Bom: `class Usuario`, `class Produto`
   - Ruim: `class Dados`, `class Fazer`

2. Uma classe deve ter uma única responsabilidade

   - Bom: `class GerenciadorDeEmail`
   - Ruim: `class FazTudo`

3. Mantenha as classes coesas e com baixo acoplamento

   - Coesão: Todos os métodos trabalham com as mesmas propriedades
   - Acoplamento: Minimizar dependências entre classes

4. Prefira composição sobre herança quando possível
   - Composição: Uma classe usa outras classes
   - Herança: Uma classe estende outra classe
