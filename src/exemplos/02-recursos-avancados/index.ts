// Exemplo de Recursos Avançados de Classes
// Referência: https://www.typescriptlang.org/docs/handbook/2/classes.html

// Exemplo de Herança
class AnimalBase {
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  fazerSom(): string {
    return 'Som genérico';
  }
}

class CachorroExemplo extends AnimalBase {
  private raca: string;

  constructor(nome: string, raca: string) {
    super(nome);
    this.raca = raca;
  }

  fazerSom(): string {
    return 'Au au!';
  }

  getRaca(): string {
    return this.raca;
  }
}

// Exemplo de Interface e Implementação
interface VeiculoBase {
  marca: string;
  modelo: string;
  acelerar(): void;
  frear(): void;
}

class CarroExemplo implements VeiculoBase {
  constructor(
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

// Exemplo de Classe Abstrata
abstract class FormaGeometrica {
  abstract calcularArea(): number;

  descricao(): string {
    return 'Sou uma forma geométrica';
  }
}

class RetanguloExemplo extends FormaGeometrica {
  constructor(
    private largura: number,
    private altura: number
  ) {
    super();
  }

  calcularArea(): number {
    return this.largura * this.altura;
  }
}

// Exemplo de Getters e Setters
class ProdutoExemplo {
  private _preco: number;

  constructor(
    private _nome: string,
    preco: number
  ) {
    this._preco = preco;
  }

  get preco(): string {
    return `R$ ${this._preco.toFixed(2)}`;
  }

  set preco(valor: string) {
    const numeroValor = parseFloat(valor.replace('R$ ', ''));
    if (numeroValor > 0) {
      this._preco = numeroValor;
    }
  }
}

// Exemplo de uso:
function executarExemplosAvancados() {
  console.log('=== Exemplos de Recursos Avançados ===\n');

  // Testando Herança
  console.log('1. Herança:');
  const rex = new CachorroExemplo('Rex', 'Labrador');
  console.log(`Som do cachorro: ${rex.fazerSom()}`);
  console.log(`Raça: ${rex.getRaca()}`);

  console.log('\n2. Interface:');
  const carro = new CarroExemplo('Toyota', 'Corolla');
  carro.acelerar();
  carro.frear();

  console.log('\n3. Classe Abstrata:');
  const retangulo = new RetanguloExemplo(5, 3);
  console.log(`Área do retângulo: ${retangulo.calcularArea()}`);
  console.log(`Descrição: ${retangulo.descricao()}`);

  console.log('\n4. Getters e Setters:');
  const produto = new ProdutoExemplo('Notebook', 3500);
  console.log(`Preço inicial: ${produto.preco}`);
  produto.preco = 'R$ 3999.99';
  console.log(`Novo preço: ${produto.preco}`);
}

executarExemplosAvancados();
