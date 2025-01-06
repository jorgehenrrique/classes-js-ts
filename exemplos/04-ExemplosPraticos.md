# Exemplos Práticos de Classes

> Referências:
>
> - [TypeScript Documentation - Object Oriented Programming](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html)
> - [MDN Web Docs - Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
> - [TypeScript Deep Dive - Classes](https://basarat.gitbook.io/typescript/future-javascript/classes)

Este arquivo contém exemplos práticos de uso de classes em situações reais.

## 1. Sistema de E-commerce

### TypeScript

```typescript
// Produto
class Produto {
  constructor(
    private id: string,
    private nome: string,
    private preco: number,
    private estoque: number
  ) {}

  public getPreco(): number {
    return this.preco;
  }

  public removerDoEstoque(quantidade: number): void {
    if (quantidade <= this.estoque) {
      this.estoque -= quantidade;
    } else {
      throw new Error('Estoque insuficiente');
    }
  }
}

// Item do Carrinho
class ItemCarrinho {
  constructor(
    private produto: Produto,
    private quantidade: number
  ) {}

  public getTotal(): number {
    return this.produto.getPreco() * this.quantidade;
  }
}

// Carrinho de Compras
class CarrinhoCompras {
  private itens: ItemCarrinho[] = [];

  public adicionarItem(produto: Produto, quantidade: number): void {
    this.itens.push(new ItemCarrinho(produto, quantidade));
  }

  public getTotal(): number {
    return this.itens.reduce((total, item) => total + item.getTotal(), 0);
  }
}

// Uso
const notebook = new Produto('1', 'Notebook', 5000, 10);
const mouse = new Produto('2', 'Mouse', 100, 20);

const carrinho = new CarrinhoCompras();
carrinho.adicionarItem(notebook, 1);
carrinho.adicionarItem(mouse, 2);

console.log(`Total: R$ ${carrinho.getTotal()}`); // Total: R$ 5200
```

## 2. Sistema de Blog

### JavaScript

```javascript
class Post {
  constructor(titulo, conteudo, autor) {
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.autor = autor;
    this.data = new Date();
    this.comentarios = [];
  }

  adicionarComentario(comentario) {
    this.comentarios.push(comentario);
  }

  getResumo() {
    return this.conteudo.substring(0, 100) + '...';
  }
}

class Blog {
  constructor() {
    this.posts = [];
  }

  criarPost(titulo, conteudo, autor) {
    const post = new Post(titulo, conteudo, autor);
    this.posts.push(post);
    return post;
  }

  getPostsRecentes() {
    return this.posts.sort((a, b) => b.data - a.data).slice(0, 5);
  }
}

// Uso
const blog = new Blog();
blog.criarPost(
  'Introdução ao TypeScript',
  'TypeScript é um superset do JavaScript que adiciona tipagem estática...',
  'João'
);
```

## 3. Sistema de Gestão de Tarefas

### TypeScript

```typescript
enum StatusTarefa {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
}

class Tarefa {
  private id: string;
  private status: StatusTarefa;
  private dataCriacao: Date;

  constructor(
    private titulo: string,
    private descricao: string,
    private responsavel: string
  ) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.status = StatusTarefa.PENDENTE;
    this.dataCriacao = new Date();
  }

  iniciar(): void {
    if (this.status === StatusTarefa.PENDENTE) {
      this.status = StatusTarefa.EM_ANDAMENTO;
    }
  }

  concluir(): void {
    this.status = StatusTarefa.CONCLUIDA;
  }

  getStatus(): StatusTarefa {
    return this.status;
  }
}

class GestorTarefas {
  private tarefas: Map<string, Tarefa> = new Map();

  criarTarefa(titulo: string, descricao: string, responsavel: string): Tarefa {
    const tarefa = new Tarefa(titulo, descricao, responsavel);
    this.tarefas.set(tarefa.id, tarefa);
    return tarefa;
  }

  getTarefasPorStatus(status: StatusTarefa): Tarefa[] {
    return Array.from(this.tarefas.values()).filter(
      (tarefa) => tarefa.getStatus() === status
    );
  }
}

// Uso
const gestor = new GestorTarefas();
const tarefa = gestor.criarTarefa(
  'Implementar API',
  'Criar endpoints REST para o sistema',
  'Maria'
);

tarefa.iniciar();
console.log(tarefa.getStatus()); // EM_ANDAMENTO
```

## 4. Sistema de Notificações

### TypeScript

```typescript
interface Notificacao {
  enviar(): void;
}

class EmailNotificacao implements Notificacao {
  constructor(
    private destinatario: string,
    private assunto: string,
    private mensagem: string
  ) {}

  enviar(): void {
    console.log(`Enviando email para ${this.destinatario}`);
    // Lógica de envio de email
  }
}

class SMSNotificacao implements Notificacao {
  constructor(
    private telefone: string,
    private mensagem: string
  ) {}

  enviar(): void {
    console.log(`Enviando SMS para ${this.telefone}`);
    // Lógica de envio de SMS
  }
}

class ServicoNotificacao {
  enviarNotificacao(notificacao: Notificacao): void {
    notificacao.enviar();
  }

  enviarEmMassa(notificacoes: Notificacao[]): void {
    notificacoes.forEach((n) => n.enviar());
  }
}

// Uso
const servico = new ServicoNotificacao();
const email = new EmailNotificacao(
  'usuario@email.com',
  'Boas vindas',
  'Bem vindo ao sistema!'
);
const sms = new SMSNotificacao(
  '+5511999999999',
  'Seu código de verificação é 123456'
);

servico.enviarNotificacao(email);
servico.enviarNotificacao(sms);
```

## Dicas de Implementação

1. **Mantenha as Classes Coesas**

   - Cada classe deve ter uma única responsabilidade
   - Evite classes que fazem muitas coisas diferentes

2. **Use Interfaces**

   - Defina contratos claros
   - Facilite a troca de implementações

3. **Encapsulamento**

   - Proteja os dados internos
   - Use getters e setters quando necessário

4. **Composição**

   - Prefira composição sobre herança
   - Crie classes pequenas e reutilizáveis

5. **Nomenclatura**
   - Use nomes claros e descritivos
   - Siga as convenções da linguagem
