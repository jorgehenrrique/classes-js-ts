// Sistema de Loja Online - Exercício
// Implemente um sistema de loja online com:
// 1. Cadastro de produtos
// 2. Carrinho de compras
// 3. Cálculo de frete
// 4. Aplicação de descontos
// 5. Finalização de pedido

// Interface do Produto
interface ProdutoInterface {
  getNome(): string;
  getPreco(): number;
  getDescricao(): string;
  getPeso(): number;
  getQuantidadeEmEstoque(): number;
  removerDoEstoque(quantidade: number): void;
  adicionarAoEstoque(quantidade: number): void;
}

// TODO: Implemente a classe Produto
class ProdutoLoja implements ProdutoInterface {
  constructor(
    private nome: string,
    private preco: number,
    private descricao: string,
    private peso: number,
    private quantidadeEmEstoque: number
  ) {
    if (preco <= 0) throw new Error('Preço deve ser maior que zero');
    if (peso <= 0) throw new Error('Peso deve ser maior que zero');
    if (quantidadeEmEstoque < 0)
      throw new Error('Quantidade não pode ser negativa');
  }

  // Métodos: construtor, getters/setters necessários
  getNome(): string {
    return this.nome;
  }

  getPreco(): number {
    return this.preco;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getPeso(): number {
    return this.peso;
  }

  getQuantidadeEmEstoque(): number {
    return this.quantidadeEmEstoque;
  }

  setPreco(preco: number): void {
    if (preco <= 0) throw new Error('Preço deve ser maior que zero');
    this.preco = preco;
  }

  removerDoEstoque(quantidade: number): void {
    if (quantidade > this.quantidadeEmEstoque) {
      throw new Error('Quantidade insuficiente em estoque');
    }
    this.quantidadeEmEstoque -= quantidade;
  }

  adicionarAoEstoque(quantidade: number): void {
    if (quantidade <= 0) throw new Error('Quantidade deve ser maior que zero');
    this.quantidadeEmEstoque += quantidade;
  }
}

// TODO: Implemente a classe ItemCarrinho
class ItemCarrinhoLoja {
  constructor(
    private produto: ProdutoInterface,
    private quantidade: number
  ) {
    if (quantidade <= 0) throw new Error('Quantidade deve ser maior que zero');
    if (quantidade > produto.getQuantidadeEmEstoque()) {
      throw new Error('Quantidade indisponível em estoque');
    }
  }

  getProduto(): ProdutoInterface {
    return this.produto;
  }

  getQuantidade(): number {
    return this.quantidade;
  }

  getSubtotal(): number {
    return this.produto.getPreco() * this.quantidade;
  }

  getPesoTotal(): number {
    return this.produto.getPeso() * this.quantidade;
  }

  atualizarQuantidade(quantidade: number): void {
    if (quantidade <= 0) throw new Error('Quantidade deve ser maior que zero');
    if (quantidade > this.produto.getQuantidadeEmEstoque()) {
      throw new Error('Quantidade indisponível em estoque');
    }
    this.quantidade = quantidade;
  }
}

// TODO: Implemente a classe CarrinhoCompra
class CarrinhoCompraLoja {
  private itens: ItemCarrinhoLoja[] = [];
  private subtotal: number = 0;
  private valorFrete: number = 0;
  private desconto: number = 0;

  adicionarItem(produto: ProdutoInterface, quantidade: number): void {
    const itemExistente = this.itens.find(
      (item) => item.getProduto().getNome() === produto.getNome()
    );

    if (itemExistente) {
      itemExistente.atualizarQuantidade(
        itemExistente.getQuantidade() + quantidade
      );
    } else {
      this.itens.push(new ItemCarrinhoLoja(produto, quantidade));
    }

    produto.removerDoEstoque(quantidade);
    this.calcularSubtotal();
    this.calcularFrete();
    console.log(`${quantidade}x ${produto.getNome()} adicionado ao carrinho`);
  }

  removerItem(produto: ProdutoInterface): void {
    const item = this.itens.find(
      (item) => item.getProduto().getNome() === produto.getNome()
    );
    if (item) {
      produto.adicionarAoEstoque(item.getQuantidade());
      this.itens = this.itens.filter(
        (i) => i.getProduto().getNome() !== produto.getNome()
      );
      this.calcularSubtotal();
      this.calcularFrete();
      console.log(`${produto.getNome()} removido do carrinho`);
    }
  }

  private calcularSubtotal(): void {
    this.subtotal = this.itens.reduce(
      (total, item) => total + item.getSubtotal(),
      0
    );
  }

  calcularFrete(): number {
    // Cálculo simplificado: R$5 por kg
    this.valorFrete = this.itens.reduce(
      (total, item) => total + item.getPesoTotal() * 5,
      0
    );
    return this.valorFrete;
  }

  aplicarDesconto(porcentagem: number): void {
    if (porcentagem < 0 || porcentagem > 100) {
      throw new Error('Porcentagem de desconto inválida');
    }
    this.desconto = (this.subtotal * porcentagem) / 100;
  }

  getItens(): ItemCarrinhoLoja[] {
    return [...this.itens];
  }

  getSubtotal(): number {
    return this.subtotal;
  }

  getValorFrete(): number {
    return this.valorFrete;
  }

  getDesconto(): number {
    return this.desconto;
  }

  getTotal(): number {
    return this.subtotal + this.valorFrete - this.desconto;
  }

  limpar(): void {
    this.itens.forEach((item) => {
      item.getProduto().adicionarAoEstoque(item.getQuantidade());
    });
    this.itens = [];
    this.subtotal = 0;
    this.valorFrete = 0;
    this.desconto = 0;
  }
}

// TODO: Implemente a classe Cliente
class ClienteLoja {
  // Propriedades: nome, email, endereço, histórico de compras
  private historicoDeCompras: CarrinhoCompraLoja[] = [];

  constructor(
    private readonly nome: string,
    private email: string,
    private endereco: string
  ) {}
  // Métodos: realizarCompra, visualizarHistorico

  getNome(): string {
    return this.nome;
  }

  getEmail(): string {
    return this.email;
  }

  getEndereco(): string {
    return this.endereco;
  }

  setEmail(email: string): void {
    if (!email.includes('@')) throw new Error('Email inválido');
    this.email = email;
  }

  setEndereco(endereco: string): void {
    if (endereco.length < 10) throw new Error('Endereço muito curto');
    this.endereco = endereco;
  }

  realizarCompra(carrinho: CarrinhoCompraLoja): void {
    if (carrinho.getItens().length === 0) {
      throw new Error('Carrinho vazio');
    }

    this.historicoDeCompras.push(carrinho);
    console.log(`Compra realizada com sucesso por ${this.nome}`);
    console.log(`Subtotal: R$ ${carrinho.getSubtotal().toFixed(2)}`);
    console.log(`Frete: R$ ${carrinho.getValorFrete().toFixed(2)}`);
    console.log(`Desconto: R$ ${carrinho.getDesconto().toFixed(2)}`);
    console.log(`Total: R$ ${carrinho.getTotal().toFixed(2)}`);
  }

  visualizarHistorico(): void {
    console.log(`\nHistórico de compras de ${this.nome}:`);
    if (this.historicoDeCompras.length === 0) {
      console.log('Nenhuma compra realizada');
      return;
    }

    this.historicoDeCompras.forEach((compra, index) => {
      console.log(`\nCompra ${index + 1}:`);
      compra.getItens().forEach((item) => {
        console.log(
          `- ${item.getQuantidade()}x ${item.getProduto().getNome()} (R$ ${item.getSubtotal().toFixed(2)})`
        );
      });
      console.log(`Subtotal: R$ ${compra.getSubtotal().toFixed(2)}`);
      console.log(`Frete: R$ ${compra.getValorFrete().toFixed(2)}`);
      console.log(`Desconto: R$ ${compra.getDesconto().toFixed(2)}`);
      console.log(`Total: R$ ${compra.getTotal().toFixed(2)}`);
    });
  }
}

// TODO: Implemente a classe Loja
class LojaOnline {
  private produtos: Map<string, ProdutoInterface> = new Map();
  private clientes: Map<string, ClienteLoja> = new Map();

  constructor(private readonly nome: string) {}

  getNome(): string {
    return this.nome;
  }

  cadastrarProduto(produto: ProdutoInterface): void {
    if (this.produtos.has(produto.getNome())) {
      throw new Error('Produto já cadastrado');
    }
    this.produtos.set(produto.getNome(), produto);
    console.log(`Produto ${produto.getNome()} cadastrado com sucesso`);
  }

  cadastrarCliente(cliente: ClienteLoja): void {
    if (this.clientes.has(cliente.getEmail())) {
      throw new Error('Cliente já cadastrado');
    }
    this.clientes.set(cliente.getEmail(), cliente);
    console.log(`Cliente ${cliente.getNome()} cadastrado com sucesso`);
  }

  buscarProduto(nome: string): ProdutoInterface {
    const produto = this.produtos.get(nome);
    if (!produto) throw new Error('Produto não encontrado');
    return produto;
  }

  buscarCliente(email: string): ClienteLoja {
    const cliente = this.clientes.get(email);
    if (!cliente) throw new Error('Cliente não encontrado');
    return cliente;
  }

  listarProdutos(): void {
    console.log('\nProdutos disponíveis:');
    if (this.produtos.size === 0) {
      console.log('Nenhum produto cadastrado');
      return;
    }

    this.produtos.forEach((produto) => {
      console.log(
        `\n${produto.getNome()} - R$ ${produto.getPreco().toFixed(2)}`
      );
      console.log(`Descrição: ${produto.getDescricao()}`);
      console.log(`Peso: ${produto.getPeso()}kg`);
      console.log(`Estoque: ${produto.getQuantidadeEmEstoque()} unidades`);
    });
  }

  processarCompra(email: string, carrinho: CarrinhoCompraLoja): void {
    const cliente = this.buscarCliente(email);
    cliente.realizarCompra(carrinho);
  }
}

// Função principal para testar a implementação
function executarSistemaLoja(): void {
  // TODO: Crie instâncias das classes e teste as funcionalidades
  try {
    console.log('=== Sistema de Loja Online - Exercício ===\n');

    // Criando loja
    const loja = new LojaOnline('Minha Loja Online');
    console.log(`Loja: ${loja.getNome()}\n`);

    // Cadastrando produtos
    console.log('Cadastrando produtos:');
    const produtos = [
      new ProdutoLoja('Notebook', 3500, 'Notebook Dell 8GB RAM', 2.5, 10),
      new ProdutoLoja('Smartphone', 2000, 'iPhone 13 128GB', 0.5, 15),
      new ProdutoLoja('Headphone', 300, 'Fone Bluetooth JBL', 0.3, 20),
    ];
    produtos.forEach((produto) => loja.cadastrarProduto(produto));

    // Cadastrando clientes
    console.log('\nCadastrando clientes:');
    const clientes = [
      new ClienteLoja(
        'João Silva',
        'joao@email.com',
        'Rua A, 123, São Paulo - SP'
      ),
      new ClienteLoja(
        'Maria Santos',
        'maria@email.com',
        'Av B, 456, Rio de Janeiro - RJ'
      ),
    ];
    clientes.forEach((cliente) => loja.cadastrarCliente(cliente));

    // Listando produtos
    loja.listarProdutos();

    // Realizando compras
    console.log('\nRealizando compras:');

    // Compra do João
    const carrinhoJoao = new CarrinhoCompraLoja();
    carrinhoJoao.adicionarItem(loja.buscarProduto('Notebook'), 1);
    carrinhoJoao.adicionarItem(loja.buscarProduto('Headphone'), 2);
    carrinhoJoao.calcularFrete();
    carrinhoJoao.aplicarDesconto(10); // 10% de desconto
    loja.processarCompra('joao@email.com', carrinhoJoao);

    // Compra da Maria
    const carrinhoMaria = new CarrinhoCompraLoja();
    carrinhoMaria.adicionarItem(loja.buscarProduto('Smartphone'), 1);
    carrinhoMaria.calcularFrete();
    carrinhoMaria.aplicarDesconto(5); // 5% de desconto
    loja.processarCompra('maria@email.com', carrinhoMaria);

    // Verificando histórico
    console.log('\n=== Histórico de Compras ===');
    clientes.forEach((cliente) => cliente.visualizarHistorico());

    // Verificando estoque final
    console.log('\n=== Estoque Final ===');
    loja.listarProdutos();
  } catch (error) {
    if (error instanceof Error) {
      console.error('\nErro:', error.message);
    } else {
      console.error('\nErro inesperado:', error);
    }
  }
}

executarSistemaLoja();
