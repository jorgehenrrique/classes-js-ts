// Exemplo de Conceitos Básicos de Classes
// Referência: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes

// Exemplo de uma classe básica em TypeScript
class PessoaBasica {
  // Propriedades da classe
  private nome: string;
  private idade: number;

  // Construtor
  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  // Métodos
  apresentar(): string {
    return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
  }

  // Getter
  getNome(): string {
    return this.nome;
  }

  // Setter
  setIdade(novaIdade: number): void {
    if (novaIdade > 0) {
      this.idade = novaIdade;
    }
  }
}

// Exemplo de uso:
function executarConceitosBasicos() {
  console.log('=== Exemplos de Conceitos Básicos ===\n');

  // Criando uma instância da classe
  const pessoa = new PessoaBasica('João', 30);

  // Usando métodos da classe
  console.log(pessoa.apresentar());

  // Usando getter
  console.log(`Nome: ${pessoa.getNome()}`);

  // Usando setter
  pessoa.setIdade(31);
  console.log(pessoa.apresentar());

  // Demonstrando encapsulamento
  // Isso não funcionaria porque nome é privado:
  // console.log(pessoa.nome);
}

executarConceitosBasicos();
