# Recursos Avançados de Classes

## Herança

A herança permite que uma classe herde propriedades e métodos de outra classe.

### JavaScript

```javascript
class Animal {
  constructor(nome) {
    this.nome = nome;
  }

  fazerSom() {
    return 'Som genérico';
  }
}

class Cachorro extends Animal {
  constructor(nome, raca) {
    super(nome);
    this.raca = raca;
  }

  fazerSom() {
    return 'Au au!';
  }
}

const rex = new Cachorro('Rex', 'Labrador');
console.log(rex.fazerSom()); // Au au!
```

### TypeScript

```typescript
class Animal {
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  fazerSom(): string {
    return 'Som genérico';
  }
}

class Cachorro extends Animal {
  private raca: string;

  constructor(nome: string, raca: string) {
    super(nome);
    this.raca = raca;
  }

  fazerSom(): string {
    return 'Au au!';
  }
}

const rex = new Cachorro('Rex', 'Labrador');
console.log(rex.fazerSom()); // Au au!
```

## Encapsulamento

O encapsulamento protege os dados dentro da classe.

### TypeScript (com modificadores de acesso)

```typescript
class ContaBancaria {
  private saldo: number;
  private readonly numeroConta: string;
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
abstract class Forma {
  abstract calcularArea(): number;

  descricao(): string {
    return 'Sou uma forma geométrica';
  }
}

class Retangulo extends Forma {
  constructor(private largura: number, private altura: number) {
    super();
  }

  calcularArea(): number {
    return this.largura * this.altura;
  }
}
```

## Interfaces (TypeScript)

Interfaces definem contratos que as classes devem seguir.

```typescript
interface Veiculo {
  marca: string;
  modelo: string;
  acelerar(): void;
  frear(): void;
}

class Carro implements Veiculo {
  constructor(public marca: string, public modelo: string) {}

  acelerar(): void {
    console.log('Carro acelerando...');
  }

  frear(): void {
    console.log('Carro freando...');
  }
}
```

## Getters e Setters

Permitem controlar o acesso às propriedades.

### JavaScript

```javascript
class Produto {
  constructor(nome, preco) {
    this._nome = nome;
    this._preco = preco;
  }

  get preco() {
    return `R$ ${this._preco.toFixed(2)}`;
  }

  set preco(valor) {
    if (valor > 0) {
      this._preco = valor;
    }
  }
}
```

### TypeScript

```typescript
class Produto {
  private _nome: string;
  private _preco: number;

  constructor(nome: string, preco: number) {
    this._nome = nome;
    this._preco = preco;
  }

  get preco(): string {
    return `R$ ${this._preco.toFixed(2)}`;
  }

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
  static PI: number = 3.14159;

  static calcularCircunferencia(raio: number): number {
    return 2 * Matematica.PI * raio;
  }
}

console.log(Matematica.PI); // 3.14159
console.log(Matematica.calcularCircunferencia(5)); // 31.4159
```

## Dicas de Uso Avançado

1. Use herança apenas quando houver uma relação "é um"
2. Prefira composição sobre herança para relações "tem um"
3. Mantenha as interfaces simples e coesas
4. Use modificadores de acesso para proteger dados sensíveis
5. Implemente getters e setters apenas quando necessário
6. Use classes abstratas para compartilhar código entre classes similares
