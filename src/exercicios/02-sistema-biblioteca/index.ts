// Sistema de Biblioteca - Exercício
// Implemente as classes necessárias para um sistema de biblioteca

// TODO: Implemente a classe Livro
class LivroBiblioteca {
  // Propriedades: título, autor, isbn, disponível
  constructor(
    private readonly titulo: string,
    private readonly autor: string,
    private readonly isbn: string,
    private disponivel: boolean = true
  ) {}
  // Métodos: construtor, getters/setters necessários

  get getTitulo(): string {
    return this.titulo;
  }

  get getAutor(): string {
    return this.autor;
  }

  get getIsbn(): string {
    return this.isbn;
  }

  get getDisponivel(): boolean {
    return this.disponivel;
  }

  set setDisponivel(disponivel: boolean) {
    this.disponivel = disponivel;
  }
}

// TODO: Implemente a classe Usuario
class UsuarioBiblioteca {
  // Propriedades: nome, id, livros emprestados
  constructor(
    private readonly nome: string,
    private readonly id: number,
    private livrosEmprestados: LivroBiblioteca[] = []
  ) {}
  // Métodos: emprestarLivro, devolverLivro

  get getNome(): string {
    return this.nome;
  }

  get getId(): number {
    return this.id;
  }

  get getLivrosEmprestados(): LivroBiblioteca[] {
    return this.livrosEmprestados;
  }

  emprestarLivro(livro: LivroBiblioteca): void {
    if (!livro.getDisponivel) {
      throw new Error('Livro não está disponível');
    }
    this.livrosEmprestados.push(livro);
    livro.setDisponivel = false;
    console.log(`Livro "${livro.getTitulo}" emprestado para ${this.nome}`);
  }

  devolverLivro(livro: LivroBiblioteca): void {
    const index = this.livrosEmprestados.findIndex(
      (l) => l.getIsbn === livro.getIsbn
    );
    if (index === -1) {
      throw new Error('Usuário não possui este livro');
    }
    this.livrosEmprestados.splice(index, 1);
    livro.setDisponivel = true;
    console.log(`Livro "${livro.getTitulo}" devolvido por ${this.nome}`);
  }

  listarLivrosEmprestados(): void {
    console.log(`\nLivros emprestados para ${this.nome}:`);
    if (this.livrosEmprestados.length === 0) {
      console.log('Nenhum livro emprestado');
      return;
    }
    this.livrosEmprestados.forEach((livro) => {
      console.log(`- ${livro.getTitulo} (${livro.getAutor})`);
    });
  }
}

// TODO: Implemente a classe Biblioteca
class BibliotecaExercicio {
  // Propriedades: nome, lista de livros, lista de usuários
  private readonly livros: Map<string, LivroBiblioteca>;
  private readonly usuarios: Map<number, UsuarioBiblioteca>;

  constructor(private readonly nome: string) {
    this.livros = new Map();
    this.usuarios = new Map();
  }
  // Métodos: cadastrarLivro, cadastrarUsuario, emprestarLivro, devolverLivro
  get getNome(): string {
    return this.nome;
  }

  cadastrarLivro(livro: LivroBiblioteca): void {
    if (this.livros.has(livro.getIsbn)) {
      throw new Error('Livro já cadastrado');
    }
    this.livros.set(livro.getIsbn, livro);
    console.log(`Livro "${livro.getTitulo}" cadastrado com sucesso`);
  }

  cadastrarUsuario(usuario: UsuarioBiblioteca): void {
    if (this.usuarios.has(usuario.getId)) {
      throw new Error('Usuário já cadastrado');
    }
    this.usuarios.set(usuario.getId, usuario);
    console.log(`Usuário ${usuario.getNome} cadastrado com sucesso`);
  }

  emprestarLivro(isbn: string, idUsuario: number): void {
    const livro = this.livros.get(isbn);
    const usuario = this.usuarios.get(idUsuario);

    if (!livro) throw new Error('Livro não encontrado');
    if (!usuario) throw new Error('Usuário não encontrado');

    usuario.emprestarLivro(livro);
  }

  devolverLivro(isbn: string, idUsuario: number): void {
    const livro = this.livros.get(isbn);
    const usuario = this.usuarios.get(idUsuario);

    if (!livro) throw new Error('Livro não encontrado');
    if (!usuario) throw new Error('Usuário não encontrado');

    usuario.devolverLivro(livro);
  }

  listarLivrosDisponiveis(): void {
    console.log('\nLivros disponíveis:');
    let temLivrosDisponiveis = false;
    this.livros.forEach((livro) => {
      if (livro.getDisponivel) {
        console.log(`- ${livro.getTitulo} (${livro.getAutor})`);
        temLivrosDisponiveis = true;
      }
    });
    if (!temLivrosDisponiveis) {
      console.log('Nenhum livro disponível');
    }
  }

  listarUsuarios(): void {
    console.log('\nUsuários cadastrados:');
    if (this.usuarios.size === 0) {
      console.log('Nenhum usuário cadastrado');
      return;
    }
    this.usuarios.forEach((usuario) => {
      console.log(`- ${usuario.getNome} (ID: ${usuario.getId})`);
    });
  }
}

// Função principal para testar a implementação
function executarSistemaBiblioteca() {
  // TODO: Crie instâncias das classes e teste as funcionalidades
  try {
    console.log('=== Sistema de Biblioteca - Exercício ===\n');

    // Criando biblioteca
    const biblioteca = new BibliotecaExercicio('Biblioteca Municipal');
    console.log(`Biblioteca: ${biblioteca.getNome}\n`);

    // Criando livros
    const livros = [
      new LivroBiblioteca(
        'O Senhor dos Anéis',
        'J.R.R. Tolkien',
        '978-8533613379'
      ),
      new LivroBiblioteca('Harry Potter', 'J.K. Rowling', '978-8532530783'),
      new LivroBiblioteca('1984', 'George Orwell', '978-8535914849'),
    ];

    // Cadastrando livros
    console.log('Cadastrando livros:');
    livros.forEach((livro) => biblioteca.cadastrarLivro(livro));

    // Criando usuários
    const usuarios = [
      new UsuarioBiblioteca('João Silva', 1),
      new UsuarioBiblioteca('Maria Oliveira', 2),
    ];

    // Cadastrando usuários
    console.log('\nCadastrando usuários:');
    usuarios.forEach((usuario) => biblioteca.cadastrarUsuario(usuario));

    // Listando livros disponíveis
    biblioteca.listarLivrosDisponiveis();

    // Listando usuários
    biblioteca.listarUsuarios();

    // Testando empréstimos
    console.log('\nTestando empréstimos:');
    biblioteca.emprestarLivro('978-8533613379', 1); // João pega O Senhor dos Anéis
    biblioteca.emprestarLivro('978-8532530783', 2); // Maria pega Harry Potter

    // Verificando livros emprestados
    usuarios.forEach((usuario) => usuario.listarLivrosEmprestados());

    // Listando livros disponíveis após empréstimos
    biblioteca.listarLivrosDisponiveis();

    // Testando devolução
    console.log('\nTestando devoluções:');
    biblioteca.devolverLivro('978-8533613379', 1); // João devolve O Senhor dos Anéis

    // Verificando estado final
    biblioteca.listarLivrosDisponiveis();
    usuarios.forEach((usuario) => usuario.listarLivrosEmprestados());
  } catch (error) {
    if (error instanceof Error) {
      console.error('\nErro:', error.message);
    } else {
      console.error('\nErro inesperado:', error);
    }
  }
}

executarSistemaBiblioteca();
