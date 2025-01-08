# Recursos Avançados de Classes

> Referências:
>
> - [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
> - [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
> - [MDN Web Docs - Herança](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

## Modificadores de Acesso

TypeScript oferece três modificadores de acesso:

1. `private`: A propriedade ou método só pode ser acessado dentro da própria classe
2. `protected`: A propriedade ou método pode ser acessado na classe e em suas classes filhas
3. `public`: A propriedade ou método pode ser acessado em qualquer lugar (padrão)

Além disso, temos:

- `readonly`: Impede que a propriedade seja modificada após sua inicialização
- `abstract`: Define que um método deve ser implementado pelas classes filhas

## Herança e o uso do `super`

A herança permite que uma classe herde propriedades e métodos de outra classe.
A palavra-chave `super` tem dois usos principais:

1. No construtor: `super()` chama o construtor da classe pai

   - Deve ser chamado antes de usar `this` em classes que herdam de outra
   - Deve receber os parâmetros que o construtor da classe pai espera

2. Em métodos: `super.metodo()` chama o método da classe pai
   - Útil quando queremos estender o comportamento ao invés de substituir
   - Não é necessário quando estamos substituindo completamente o comportamento

### JavaScript

```javascript
class Animal {
  constructor(nome) {
    // private não existe em JavaScript puro
    this.nome = nome;
  }

  fazerSom() {
    return 'Som genérico';
  }
}

class Cachorro extends Animal {
  constructor(nome, raca) {
    // super() deve ser chamado antes de usar this
    super(nome);
    this.raca = raca;
  }

  fazerSom() {
    // Sobrescrevendo completamente o método
    return 'Au au!';
  }
}

const rex = new Cachorro('Rex', 'Labrador');
console.log(rex.fazerSom()); // Au au!
```

### TypeScript

```typescript
class Animal {
  // protected permite acesso na classe e classes filhas
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  fazerSom(): string {
    return 'Som genérico';
  }
}

class Cachorro extends Animal {
  // private só permite acesso dentro desta classe
  private raca: string;

  constructor(nome: string, raca: string) {
    // super() deve ser chamado antes de usar this
    super(nome);
    this.raca = raca;
  }

  fazerSom(): string {
    // Sobrescrevendo completamente o método
    return 'Au au!';
  }
}

const rex = new Cachorro('Rex', 'Labrador');
console.log(rex.fazerSom()); // Au au!
```

## Encapsulamento

O encapsulamento protege os dados dentro da classe usando modificadores de acesso.

### TypeScript (com modificadores de acesso)

```typescript
class ContaBancaria {
  // private: só acessível dentro da classe
  private saldo: number;

  // private readonly: não pode ser modificado após inicialização
  private readonly numeroConta: string;

  // protected: acessível na classe e classes filhas
  protected titular: string;

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;
    this.saldo = saldoInicial;
    this.numeroConta = Math.random().toString(36).substr(2, 9);
  }

  public depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
    }
  }

  public getSaldo(): number {
    return this.saldo;
  }
}
```

## Classes Abstratas

Classes abstratas servem como base para outras classes, mas não podem ser instanciadas diretamente.

```typescript
// abstract class não pode ser instanciada diretamente
abstract class Forma {
  // abstract method deve ser implementado pelas classes filhas
  abstract calcularArea(): number;

  // Método normal pode ter implementação
  descricao(): string {
    return 'Sou uma forma geométrica';
  }
}

class Retangulo extends Forma {
  constructor(
    // private readonly: não pode ser modificado após inicialização
    private readonly largura: number,
    private readonly altura: number
  ) {
    super();
  }

  // Implementação obrigatória do método abstrato
  calcularArea(): number {
    return this.largura * this.altura;
  }
}
```

## Interfaces (TypeScript)

Interfaces definem contratos que as classes devem seguir.

```typescript
// Interface define um contrato
interface Veiculo {
  // Todas as propriedades são public por padrão
  marca: string;
  modelo: string;
  acelerar(): void;
  frear(): void;
}

class Carro implements Veiculo {
  constructor(
    // public cria e inicializa a propriedade automaticamente
    public marca: string,
    public modelo: string
  ) {}

  acelerar(): void {
    console.log('Carro acelerando...');
  }

  frear(): void {
    console.log('Carro freando...');
  }
}
```

## Polimorfismo

O polimorfismo permite que objetos de diferentes classes sejam tratados como objetos de uma classe base comum. Existem dois tipos principais:

1. Polimorfismo de Sobrescrita (Override): quando uma classe filha fornece uma implementação específica de um método que já está definido na classe pai.

2. Polimorfismo de Sobrecarga (Overload): quando temos múltiplos métodos com o mesmo nome, mas com parâmetros diferentes.

### Exemplo de Polimorfismo de Sobrescrita

```typescript
// Classe base
abstract class Funcionario {
  constructor(
    protected nome: string,
    protected salarioBase: number
  ) {}

  // Método que será sobrescrito
  abstract calcularSalario(): number;

  // Método comum a todos funcionários
  apresentar(): string {
    return `Funcionário: ${this.nome}`;
  }
}

// Classes específicas
class Desenvolvedor extends Funcionario {
  constructor(
    nome: string,
    salarioBase: number,
    private horasExtras: number
  ) {
    super(nome, salarioBase);
  }

  // Sobrescrita do método calcularSalario
  calcularSalario(): number {
    return this.salarioBase + this.horasExtras * 50;
  }
}

class Vendedor extends Funcionario {
  constructor(
    nome: string,
    salarioBase: number,
    private comissao: number
  ) {
    super(nome, salarioBase);
  }

  // Sobrescrita do método calcularSalario
  calcularSalario(): number {
    return this.salarioBase + this.comissao;
  }
}

// Exemplo de uso do polimorfismo
function processarFolhaPagamento(funcionarios: Funcionario[]): void {
  // Mesmo método calcularSalario() sendo chamado,
  // mas cada classe tem sua própria implementação
  funcionarios.forEach((funcionario) => {
    console.log(funcionario.apresentar());
    console.log(`Salário: R$ ${funcionario.calcularSalario()}`);
  });
}

// Criando funcionários
const dev = new Desenvolvedor('João', 5000, 10);
const vendedor = new Vendedor('Maria', 3000, 1500);

// Array de funcionários de diferentes tipos
const funcionarios: Funcionario[] = [dev, vendedor];

// Processando a folha
processarFolhaPagamento(funcionarios);
```

### Exemplo de Polimorfismo de Sobrecarga

```typescript
class Calculadora {
  // Sobrecarga de métodos
  somar(a: number, b: number): number;
  somar(a: number, b: number, c: number): number;
  somar(a: string, b: string): string;

  // Implementação que cobre todas as sobrecargas
  somar(a: number | string, b: number | string, c?: number): number | string {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.concat(b);
    }

    if (typeof a === 'number' && typeof b === 'number') {
      if (c !== undefined) {
        return a + b + c;
      }
      return a + b;
    }

    throw new Error('Tipos inválidos');
  }
}

// Exemplo de uso
const calc = new Calculadora();

console.log(calc.somar(1, 2)); // 3
console.log(calc.somar(1, 2, 3)); // 6
console.log(calc.somar('Olá, ', 'Mundo!')); // Olá, Mundo!
```

O polimorfismo é uma das características mais poderosas da programação orientada a objetos porque:

1. Permite tratar objetos diferentes de maneira uniforme
2. Facilita a extensão do código sem modificar o código existente
3. Torna o código mais flexível e reutilizável
4. Permite que novas classes sejam adicionadas sem mudar o código que as utiliza

### Dicas para uso do Polimorfismo

1. Use classes abstratas e interfaces para definir contratos comuns
2. Mantenha as assinaturas dos métodos consistentes nas classes filhas
3. Evite verificações de tipo (type checking) quando possível
4. Use o polimorfismo para eliminar condicionais complexas
5. Prefira composição sobre herança quando o polimorfismo não for necessário

## Getters e Setters

Permitem controlar o acesso às propriedades com lógica personalizada.

```typescript
class Produto {
  // Convenção: _ para propriedades com getters/setters
  private _nome: string;
  private _preco: number;

  constructor(nome: string, preco: number) {
    this._nome = nome;
    this._preco = preco;
  }

  // get: acessa como propriedade
  get preco(): string {
    return `R$ ${this._preco.toFixed(2)}`;
  }

  // set: modifica com validação
  set preco(valor: number) {
    if (valor > 0) {
      this._preco = valor;
    }
  }

  // get para nome
  get nome(): string {
    return this._nome;
  }

  // set para nome com validação
  set nome(valor: string) {
    if (valor.length >= 3) {
      this._nome = valor;
    }
  }
}

// Exemplo de uso:
const notebook = new Produto('Notebook', 3500);

// Usando getters (acessa como propriedade)
console.log(notebook.nome); // Notebook
console.log(notebook.preco); // R$ 3500.00

// Usando setters (atribui como propriedade)
notebook.preco = 3999.99; // Atualiza o preço
console.log(notebook.preco); // R$ 3999.99

notebook.nome = 'PC'; // Não atualiza (menos de 3 caracteres)
console.log(notebook.nome); // Notebook

notebook.nome = 'Computador'; // Atualiza o nome
console.log(notebook.nome); // Computador

// Tentando acessar propriedades privadas diretamente (erro)
// console.log(notebook._nome);    // Erro: Property '_nome' is private
// console.log(notebook._preco);   // Erro: Property '_preco' is private
```

## Métodos e Propriedades Estáticas

Membros estáticos pertencem à classe, não às instâncias.

```typescript
class Matematica {
  // static: pertence à classe, não às instâncias
  static readonly PI: number = 3.14159;

  static calcularCircunferencia(raio: number): number {
    return 2 * Matematica.PI * raio;
  }
}

console.log(Matematica.PI); // 3.14159
console.log(Matematica.calcularCircunferencia(5)); // 31.4159
```

## Dicas de Uso

1. Use herança (`extends`) quando existe uma relação "é um":

   ```typescript
   // Correto: Um Gato É UM Animal
   class Animal {
     protected nome: string;
     constructor(nome: string) {
       this.nome = nome;
     }
   }

   class Gato extends Animal {
     miar(): void {
       console.log(`${this.nome} faz miau!`);
     }
   }
   ```

2. Use composição quando existe uma relação "tem um":

   ```typescript
   // Correto: Um Carro TEM UM Motor (não é um motor)
   class Motor {
     ligar(): void {
       console.log('Motor ligado');
     }
   }

   class Carro {
     // Composição: Carro tem um Motor
     private motor: Motor;

     constructor() {
       this.motor = new Motor();
     }

     ligar(): void {
       this.motor.ligar();
     }
   }
   ```

3. Use `private` para esconder detalhes de implementação
4. Use `protected` quando classes filhas precisam acessar
5. Use `readonly` para propriedades que não devem mudar
6. Use `super()` no construtor antes de usar `this`
7. Use `super.metodo()` para estender comportamentos
8. Use classes abstratas para compartilhar código base
9. Use interfaces para definir contratos claros
10. Use getters/setters para controlar acesso às propriedades
