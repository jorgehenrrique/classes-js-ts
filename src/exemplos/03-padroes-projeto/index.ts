// Exemplo de Padrões de Projeto
// Referência: https://refactoring.guru/design-patterns/typescript

// 1. Singleton
class DatabaseSingleton {
  private static instance: DatabaseSingleton;
  private conexoes: number = 0;

  private constructor() {}

  public static getInstance(): DatabaseSingleton {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = new DatabaseSingleton();
    }
    return DatabaseSingleton.instance;
  }

  public connect(): string {
    this.conexoes++;
    return `Conectado! Total de conexões: ${this.conexoes}`;
  }
}

// 2. Factory Method
interface AnimalFactory {
  falar(): string;
}

class GatoFactory implements AnimalFactory {
  falar(): string {
    return 'Miau!';
  }
}

class CachorroFactory implements AnimalFactory {
  falar(): string {
    return 'Au au!';
  }
}

class AnimalFactoryCreator {
  criarAnimal(tipo: string): AnimalFactory {
    switch (tipo.toLowerCase()) {
      case 'gato':
        return new GatoFactory();
      case 'cachorro':
        return new CachorroFactory();
      default:
        throw new Error('Tipo de animal não suportado');
    }
  }
}

// 3. Observer
interface ObserverPattern {
  update(data: any): void;
}

class SubjectPattern {
  private observers: ObserverPattern[] = [];

  public subscribe(observer: ObserverPattern): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: ObserverPattern): void {
    const index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  }

  protected notify(data: any): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class NewsAgencyPattern extends SubjectPattern {
  public publicarNoticia(noticia: string): void {
    console.log(`Publicando: ${noticia}`);
    this.notify(noticia);
  }
}

class NewsChannelPattern implements ObserverPattern {
  constructor(private nome: string) {}

  update(noticia: string): void {
    console.log(`${this.nome} recebeu a notícia: ${noticia}`);
  }
}

// Exemplo de uso:
function executarPadroesProjeto() {
  console.log('=== Exemplos de Padrões de Projeto ===\n');

  // 1. Singleton
  console.log('1. Singleton:');
  const db1 = DatabaseSingleton.getInstance();
  const db2 = DatabaseSingleton.getInstance();
  console.log(db1.connect());
  console.log(db2.connect());
  console.log(`São a mesma instância? ${db1 === db2}`);

  // 2. Factory Method
  console.log('\n2. Factory Method:');
  const factory = new AnimalFactoryCreator();
  const gato = factory.criarAnimal('gato');
  const cachorro = factory.criarAnimal('cachorro');
  console.log(`O gato faz: ${gato.falar()}`);
  console.log(`O cachorro faz: ${cachorro.falar()}`);

  // 3. Observer
  console.log('\n3. Observer:');
  const agencia = new NewsAgencyPattern();
  const canal1 = new NewsChannelPattern('Canal 1');
  const canal2 = new NewsChannelPattern('Canal 2');

  agencia.subscribe(canal1);
  agencia.subscribe(canal2);

  agencia.publicarNoticia('Nova vacina descoberta!');

  agencia.unsubscribe(canal1);
  agencia.publicarNoticia('Novo smartphone lançado!');
}

executarPadroesProjeto();
