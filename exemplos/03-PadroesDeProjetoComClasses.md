# Padrões de Projeto com Classes

> Referências:
>
> - [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)
> - [Design Patterns in TypeScript](https://github.com/torokmark/design_patterns_in_typescript)

Os padrões de projeto são soluções típicas para problemas comuns no desenvolvimento de software.

## 1. Singleton

Garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a ela.

### JavaScript

```javascript
class Database {
  static instance = null;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.conexoes = 0;
    Database.instance = this;
  }

  connect() {
    this.conexoes++;
    return `Conectado! Total de conexões: ${this.conexoes}`;
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true
```

### TypeScript

```typescript
class Database {
  private static instance: Database;
  private conexoes: number = 0;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public connect(): string {
    this.conexoes++;
    return `Conectado! Total de conexões: ${this.conexoes}`;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
```

## 2. Factory Method

Define uma interface para criar objetos, mas permite que as subclasses decidam quais classes instanciar.

```typescript
interface Animal {
  falar(): string;
}

class Cachorro implements Animal {
  falar(): string {
    return 'Au au!';
  }
}

class Gato implements Animal {
  falar(): string {
    return 'Miau!';
  }
}

class AnimalFactory {
  criarAnimal(tipo: string): Animal {
    switch (tipo.toLowerCase()) {
      case 'cachorro':
        return new Cachorro();
      case 'gato':
        return new Gato();
      default:
        throw new Error('Tipo de animal não suportado');
    }
  }
}

const factory = new AnimalFactory();
const cachorro = factory.criarAnimal('cachorro');
console.log(cachorro.falar()); // Au au!
```

## 3. Observer

Define uma dependência um-para-muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados e atualizados automaticamente.

```typescript
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  }

  public notify(data: any): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class NewsAgency extends Subject {
  public publicarNoticia(noticia: string): void {
    console.log(`Publicando: ${noticia}`);
    this.notify(noticia);
  }
}

class NewsChannel implements Observer {
  private nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  update(noticia: string): void {
    console.log(`${this.nome} recebeu a notícia: ${noticia}`);
  }
}

const agencia = new NewsAgency();
const canal1 = new NewsChannel('Canal 1');
const canal2 = new NewsChannel('Canal 2');

agencia.subscribe(canal1);
agencia.subscribe(canal2);
agencia.publicarNoticia('Nova vacina descoberta!');
```

## 4. Strategy

Permite definir uma família de algoritmos, encapsular cada um deles e torná-los intercambiáveis.

```typescript
interface EstrategiaPagamento {
  pagar(valor: number): void;
}

class PagamentoCartao implements EstrategiaPagamento {
  pagar(valor: number): void {
    console.log(`Pagando ${valor} com cartão`);
  }
}

class PagamentoPix implements EstrategiaPagamento {
  pagar(valor: number): void {
    console.log(`Pagando ${valor} com PIX`);
  }
}

class Carrinho {
  private estrategia: EstrategiaPagamento;

  setEstrategiaPagamento(estrategia: EstrategiaPagamento): void {
    this.estrategia = estrategia;
  }

  checkout(valor: number): void {
    this.estrategia.pagar(valor);
  }
}

const carrinho = new Carrinho();
carrinho.setEstrategiaPagamento(new PagamentoCartao());
carrinho.checkout(100); // Pagando 100 com cartão

carrinho.setEstrategiaPagamento(new PagamentoPix());
carrinho.checkout(100); // Pagando 100 com PIX
```

## 5. Decorator

Permite adicionar comportamentos a objetos dinamicamente.

```typescript
interface Cafe {
  getCusto(): number;
  getDescricao(): string;
}

class CafeSimples implements Cafe {
  getCusto(): number {
    return 5;
  }

  getDescricao(): string {
    return 'Café simples';
  }
}

abstract class CafeDecorator implements Cafe {
  protected cafe: Cafe;

  constructor(cafe: Cafe) {
    this.cafe = cafe;
  }

  getCusto(): number {
    return this.cafe.getCusto();
  }

  getDescricao(): string {
    return this.cafe.getDescricao();
  }
}

class ComLeite extends CafeDecorator {
  getCusto(): number {
    return this.cafe.getCusto() + 2;
  }

  getDescricao(): string {
    return this.cafe.getDescricao() + ' com leite';
  }
}

class ComChocolate extends CafeDecorator {
  getCusto(): number {
    return this.cafe.getCusto() + 3;
  }

  getDescricao(): string {
    return this.cafe.getDescricao() + ' com chocolate';
  }
}

let cafe = new CafeSimples();
cafe = new ComLeite(cafe);
cafe = new ComChocolate(cafe);

console.log(cafe.getDescricao()); // Café simples com leite com chocolate
console.log(cafe.getCusto()); // 10
```

## Quando Usar Cada Padrão

1. **Singleton**

   - Quando precisar de uma única instância compartilhada
   - Gerenciamento de conexões
   - Configurações globais

2. **Factory Method**

   - Criação flexível de objetos
   - Quando a criação de objetos deve ser desacoplada
   - Família de objetos relacionados

3. **Observer**

   - Eventos e notificações
   - Atualizações em tempo real
   - Comunicação desacoplada entre objetos

4. **Strategy**

   - Diferentes algoritmos para uma mesma tarefa
   - Comportamentos intercambiáveis
   - Evitar condicionais complexos

5. **Decorator**
   - Adicionar funcionalidades dinamicamente
   - Extensão de comportamento sem herança
   - Composição flexível de objetos
