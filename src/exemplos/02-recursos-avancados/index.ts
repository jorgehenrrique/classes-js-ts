// Exemplo de Recursos Avançados de Classes
// Referência: https://www.typescriptlang.org/docs/handbook/2/classes.html

// Exemplo de Herança
class AnimalBase {
  // protected: Permite acesso na própria classe e em classes que herdam dela
  // Útil quando queremos que as classes filhas tenham acesso, mas continue privado para o mundo externo
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  fazerSom(): string {
    return 'Som genérico';
  }
}

class CachorroExemplo extends AnimalBase {
  // private: Só pode ser acessado dentro desta classe
  // Não pode ser acessado nem por classes filhas nem pelo mundo externo
  private raca: string;

  constructor(nome: string, raca: string) {
    // super(): Chama o construtor da classe pai (AnimalBase)
    // Deve ser chamado antes de usar 'this' em classes que herdam de outra
    // Recebe os mesmos parâmetros que o construtor da classe pai espera
    super(nome);
    this.raca = raca;
  }

  fazerSom(): string {
    // Sobrescrevendo o método da classe pai
    // Não precisamos do super aqui pois não estamos estendendo o comportamento,
    // estamos substituindo completamente
    return 'Au au!';
  }

  getRaca(): string {
    return this.raca;
  }

  apresentar(): string {
    // Podemos usar super para acessar métodos da classe pai
    // Útil quando queremos estender o comportamento ao invés de substituir
    return `${super.fazerSom()} - Eu sou um ${this.raca}`;
  }
}

// Exemplo de Interface e Implementação
interface VeiculoBase {
  // Em interfaces, todas as propriedades são públicas por padrão
  marca: string;
  modelo: string;
  acelerar(): void;
  frear(): void;
}

class CarroExemplo implements VeiculoBase {
  constructor(
    // public: Cria e inicializa a propriedade automaticamente
    // É acessível de qualquer lugar
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
  // abstract: Método que deve ser implementado pelas classes filhas
  // Não pode ter implementação na classe abstrata
  abstract calcularArea(): number;

  // Método normal em classe abstrata
  // Pode ser sobrescrito nas classes filhas, mas já tem uma implementação
  descricao(): string {
    return 'Sou uma forma geométrica';
  }
}

class RetanguloExemplo extends FormaGeometrica {
  constructor(
    // private readonly: Só pode ser acessado dentro da classe e não pode ser modificado
    // Útil para valores que não devem mudar depois de inicializados
    private readonly largura: number,
    private readonly altura: number
  ) {
    super();
  }

  calcularArea(): number {
    return this.largura * this.altura;
  }
}

// Exemplo de Getters e Setters
class ProdutoExemplo {
  // Convenção: usar _ para propriedades privadas que têm getters/setters
  private _preco: number;

  constructor(
    private _nome: string,
    preco: number
  ) {
    this._preco = preco;
  }

  // get: Permite acessar a propriedade como se fosse pública
  // mas com lógica personalizada
  get preco(): string {
    return `R$ ${this._preco.toFixed(2)}`;
  }

  // set: Permite modificar a propriedade como se fosse pública
  // mas com validação e lógica personalizada
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
  console.log(`Apresentação: ${rex.apresentar()}`);

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
