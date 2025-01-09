// Exemplo de Sistema de E-commerce
// Referência: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html

// Produto
export class Produto {
  constructor(
    private id: string,
    private nome: string,
    private preco: number,
    private estoque: number
  ) {}

  public getPreco(): number {
    return this.preco;
  }

  public getNome(): string {
    return this.nome;
  }

  public removerDoEstoque(quantidade: number): void {
    if (quantidade <= this.estoque) {
      this.estoque -= quantidade;
      console.log(`${quantidade}x ${this.nome} removido do estoque`);
    } else {
      throw new Error('Estoque insuficiente');
    }
  }

  public getEstoque(): number {
    return this.estoque;
  }
}

// Item do Carrinho
export class ItemCarrinho {
  constructor(
    private produto: Produto,
    private quantidade: number
  ) {}

  public getTotal(): number {
    return this.produto.getPreco() * this.quantidade;
  }

  public getProduto(): Produto {
    return this.produto;
  }

  public getQuantidade(): number {
    return this.quantidade;
  }
}

// Carrinho de Compras
export class CarrinhoCompras {
  private itens: ItemCarrinho[] = [];

  public adicionarItem(produto: Produto, quantidade: number): void {
    if (produto.getEstoque() >= quantidade) {
      this.itens.push(new ItemCarrinho(produto, quantidade));
      console.log(`${quantidade}x ${produto.getNome()} adicionado ao carrinho`);
    } else {
      console.log(`Estoque insuficiente para ${produto.getNome()}`);
    }
  }

  public getTotal(): number {
    return this.itens.reduce((total, item) => total + item.getTotal(), 0);
  }

  public finalizarCompra(): void {
    console.log('\nFinalizando compra:');
    this.itens.forEach((item) => {
      const produto = item.getProduto();
      const quantidade = item.getQuantidade();
      produto.removerDoEstoque(quantidade);
    });
    console.log(`Total da compra: R$ ${this.getTotal().toFixed(2)}`);
    this.itens = [];
  }
}

// Exemplo de uso:
function executarExemplosPraticos() {
  console.log('=== Sistema de E-commerce ===\n');

  // Criando produtos
  const notebook = new Produto('1', 'Notebook', 5000, 10);
  const mouse = new Produto('2', 'Mouse', 100, 20);
  const teclado = new Produto('3', 'Teclado', 200, 15);

  // Criando carrinho
  const carrinho = new CarrinhoCompras();

  // Adicionando produtos
  console.log('Adicionando produtos ao carrinho:');
  carrinho.adicionarItem(notebook, 1);
  carrinho.adicionarItem(mouse, 2);
  carrinho.adicionarItem(teclado, 1);

  // Tentando adicionar mais que o estoque
  console.log('\nTentando adicionar quantidade maior que o estoque:');
  carrinho.adicionarItem(notebook, 15);

  // Finalizando a compra
  carrinho.finalizarCompra();

  // Verificando estoque após a compra
  console.log('\nEstoque após a compra:');
  console.log(`Notebooks disponíveis: ${notebook.getEstoque()}`);
  console.log(`Mouses disponíveis: ${mouse.getEstoque()}`);
  console.log(`Teclados disponíveis: ${teclado.getEstoque()}`);
}

executarExemplosPraticos();
