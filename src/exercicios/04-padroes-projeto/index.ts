// Padrões de Projeto - Exercício
// Implemente os seguintes padrões de projeto

// ############################################################################
// TODO: Implemente o padrão Singleton
// ############################################################################

export class ConfiguracaoSingleton {
  // Implemente um singleton para gerenciar configurações da aplicação
  private static instance: ConfiguracaoSingleton;
  private config: Map<string, any> = new Map();

  private constructor() {}

  // Deve permitir get/set de configurações
  public static getInstance(): ConfiguracaoSingleton {
    if (!ConfiguracaoSingleton.instance) {
      ConfiguracaoSingleton.instance = new ConfiguracaoSingleton();
    }
    return ConfiguracaoSingleton.instance;
  }

  setConfig(key: string, value: any): void {
    this.config.set(key, value);
  }

  getConfig(key: string): any {
    return this.config.get(key);
  }

  getAllConfig(): Map<string, any> {
    return new Map(this.config);
  }

  clearConfig(): void {
    this.config.clear();
  }
}

// ############################################################################
// TODO: Implemente o padrão Factory
// ############################################################################
export interface ProdutoFactory {
  criarProduto(): ProdutoFactoryInterface;
}

interface ProdutoFactoryInterface {
  getNome(): string;
  getPreco(): number;
  getTipo(): string;
  exibirDetalhes(): void;
}

export class ProdutoEletronicoFactory implements ProdutoFactoryInterface {
  constructor(
    private nome: string,
    private preco: number
  ) {}

  getNome(): string {
    return this.nome;
  }

  getPreco(): number {
    return this.preco;
  }

  getTipo(): string {
    return 'Eletrônico';
  }

  exibirDetalhes(): void {
    console.log(
      `
Produto Eletrônico:
Nome: ${this.nome}
Preço: R$ ${this.preco.toFixed(2)}
Garantia: 12 meses
    `.trim()
    );
  }
}

export class ProdutoLivroFactory implements ProdutoFactoryInterface {
  constructor(
    private nome: string,
    private preco: number
  ) {}

  getNome(): string {
    return this.nome;
  }

  getPreco(): number {
    return this.preco;
  }

  getTipo(): string {
    return 'Livro';
  }

  exibirDetalhes(): void {
    console.log(
      `
Livro:
Título: ${this.nome}
Preço: R$ ${this.preco.toFixed(2)}
Formato: Digital e Físico
    `.trim()
    );
  }
}

export class ProdutoFactoryExercicio {
  // Implemente o factory method para criar diferentes tipos de produtos
  criarProduto(
    tipo: string,
    nome: string,
    preco: number
  ): ProdutoFactoryInterface {
    switch (tipo.toLowerCase()) {
      case 'eletronico':
        return new ProdutoEletronicoFactory(nome, preco);
      case 'livro':
        return new ProdutoLivroFactory(nome, preco);
      default:
        throw new Error('Tipo de produto não suportado');
    }
  }
}
// ############################################################################
// TODO: Implemente o padrão Observer
// ############################################################################
interface ObserverExercicio {
  // Defina a interface para observadores
  atualizar(mensagem: string): void;
}

export class ClienteObserver implements ObserverExercicio {
  constructor(private nome: string) {}

  atualizar(mensagem: string): void {
    console.log(`${this.nome} recebeu a notificação: ${mensagem}`);
  }
}

export class SubjectExercicio {
  // Implemente o processador que utilizará diferentes estratégias
  private observers: ObserverExercicio[] = [];
  private mensagens: string[] = [];

  adicionarObserver(observer: ObserverExercicio): void {
    this.observers.push(observer);
  }

  removerObserver(observer: ObserverExercicio): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notificarObservers(mensagem: string): void {
    this.mensagens.push(mensagem);
    this.observers.forEach((observer) => observer.atualizar(mensagem));
  }

  getMensagens(): string[] {
    return [...this.mensagens];
  }
}

// ############################################################################
// TODO: Implemente o padrão Strategy
// ############################################################################
interface PagamentoStrategy {
  // Defina a interface para diferentes estratégias de pagamento
  pagar(valor: number): void;
  getDescricao(): string;
}

export class PagamentoCartaoCredito implements PagamentoStrategy {
  constructor(private numeroCartao: string) {}

  pagar(valor: number): void {
    console.log(
      `
Pagamento com Cartão de Crédito:
Valor: R$ ${valor.toFixed(2)}
Cartão: **** **** **** ${this.numeroCartao.slice(-4)}
Status: Aprovado
    `.trim()
    );
  }

  getDescricao(): string {
    return `Cartão de Crédito: **** ${this.numeroCartao.slice(-4)}`;
  }
}

export class PagamentoPix implements PagamentoStrategy {
  constructor(private chavePix: string) {}

  pagar(valor: number): void {
    console.log(
      `
Pagamento com PIX:
Valor: R$ ${valor.toFixed(2)}
Chave: ${this.chavePix}
Status: Aprovado
    `.trim()
    );
  }

  getDescricao(): string {
    return `PIX: ${this.chavePix}`;
  }
}

export class ProcessadorPagamento {
  // Implemente o processador que utilizará diferentes estratégias
  constructor(private strategy: PagamentoStrategy) {}

  setStrategy(strategy: PagamentoStrategy): void {
    this.strategy = strategy;
  }

  processarPagamento(valor: number): void {
    console.log(
      `\nProcessando pagamento usando ${this.strategy.getDescricao()}`
    );
    this.strategy.pagar(valor);
  }
}

// Função principal para testar a implementação
function executarPadroesProjetoExercicio() {
  // TODO: Crie instâncias e teste os padrões implementados
  try {
    console.log('=== Padrões de Projeto - Exercício ===\n');

    // Testando Singleton
    console.log('1. Testando Singleton:');
    const config = ConfiguracaoSingleton.getInstance();
    config.setConfig('tema', 'escuro');
    config.setConfig('idioma', 'pt-BR');

    const config2 = ConfiguracaoSingleton.getInstance();
    console.log('Configurações:', Object.fromEntries(config2.getAllConfig()));

    // Testando Factory
    console.log('\n2. Testando Factory:');
    const factory = new ProdutoFactoryExercicio();
    const notebook = factory.criarProduto('eletronico', 'Notebook Dell', 5000);
    const livro = factory.criarProduto('livro', 'Clean Code', 150);

    notebook.exibirDetalhes();
    console.log();
    livro.exibirDetalhes();

    // Testando Observer
    console.log('\n3. Testando Observer:');
    const loja = new SubjectExercicio();
    const cliente1 = new ClienteObserver('João');
    const cliente2 = new ClienteObserver('Maria');

    loja.adicionarObserver(cliente1);
    loja.adicionarObserver(cliente2);

    loja.notificarObservers('Nova promoção: 20% de desconto em eletrônicos!');
    loja.removerObserver(cliente1);
    loja.notificarObservers('Última hora: Frete grátis para livros!');

    // Testando Strategy
    console.log('\n4. Testando Strategy:');
    const processador = new ProcessadorPagamento(
      new PagamentoCartaoCredito('1234567890123456')
    );
    processador.processarPagamento(1000);

    processador.setStrategy(new PagamentoPix('email@exemplo.com'));
    processador.processarPagamento(500);
  } catch (error) {
    if (error instanceof Error) {
      console.error('\nErro:', error.message);
    } else {
      console.error('\nErro inesperado:', error);
    }
  }
}

executarPadroesProjetoExercicio();
