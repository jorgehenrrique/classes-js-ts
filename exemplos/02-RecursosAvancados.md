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
}
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

1. Use herança apenas quando houver uma relação "é um"
2. Prefira composição sobre herança para relações "tem um"
3. Use `private` para esconder detalhes de implementação
4. Use `protected` quando classes filhas precisam acessar
5. Use `readonly` para propriedades que não devem mudar
6. Use `super()` no construtor antes de usar `this`
7. Use `super.metodo()` para estender comportamentos
8. Use classes abstratas para compartilhar código base
9. Use interfaces para definir contratos claros
10. Use getters/setters para controlar acesso às propriedades
