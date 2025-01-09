// Sistema Bancário - Exercício
// Implemente as classes necessárias para um sistema bancário básico

// TODO: Implemente a classe Cliente
class ClienteBanco {
  // Propriedades: nome, cpf, email
  // Métodos: construtor, getters/setters necessários

  // Usando Parameter Properties do TypeScript:
  // Esta sintaxe especial no construtor automaticamente:
  // 1. Declara as propriedades da classe
  // 2. Inicializa as propriedades
  // 3. Atribui os valores do construtor
  // É equivalente a declarar as propriedades fora do construtor e fazer a atribuição manual
  constructor(
    private readonly nome: string,
    private readonly cpf: string,
    private email: string
  ) {}

  // Getters - propriedades somente leitura
  get getNome(): string {
    return this.nome;
  }

  get getCpf(): string {
    return this.cpf;
  }

  get getEmail(): string {
    return this.email;
  }

  // Setter - apenas email pode ser alterado
  set setEmail(email: string) {
    if (email.includes('@')) {
      this.email = email;
    } else {
      throw new Error('Email inválido');
    }
  }
}

// TODO: Implemente a classe ContaBancaria
class ContaBancariaBanco {
  // Propriedades: número da conta, saldo, cliente (tipo ClienteBanco)
  // Métodos: depositar, sacar, consultarSaldo
  constructor(
    private readonly numeroConta: string,
    private saldo: number,
    private readonly cliente: ClienteBanco
  ) {
    // Validação do saldo inicial
    if (saldo < 0) {
      throw new Error('Saldo inicial não pode ser negativo');
    }
  }

  // Métodos públicos
  depositar(valor: number): void {
    if (valor <= 0) {
      throw new Error('Valor de depósito deve ser positivo');
    }
    this.saldo += valor;
    console.log(`Depósito de R$ ${valor} realizado com sucesso`);
  }

  sacar(valor: number): boolean {
    if (valor <= 0) {
      throw new Error('Valor de saque deve ser positivo');
    }
    if (this.saldo < valor) {
      console.log('Saldo insuficiente');
      return false;
    }
    this.saldo -= valor;
    console.log(`Saque de R$ ${valor} realizado com sucesso`);
    return true;
  }

  // Getters
  get getSaldo(): number {
    return this.saldo;
  }

  get getCliente(): ClienteBanco {
    return this.cliente;
  }

  get getNumeroConta(): string {
    return this.numeroConta;
  }
}

// TODO: Implemente a classe Banco
class BancoExercicio {
  // Propriedades: nome, lista de contas
  // Métodos: criarConta, buscarConta, listarContas
  private readonly listaContas: Map<string, ContaBancariaBanco>;

  constructor(private readonly nome: string) {
    this.listaContas = new Map();
  }

  criarConta(saldoInicial: number, cliente: ClienteBanco): string {
    // Gera número de conta único
    const numeroConta = Math.random().toString(36).substring(2, 11);

    // Cria nova conta
    const novaConta = new ContaBancariaBanco(
      numeroConta,
      saldoInicial,
      cliente
    );

    // Adiciona ao Map de contas
    this.listaContas.set(numeroConta, novaConta);

    console.log(
      `Conta ${numeroConta} criada com sucesso para ${cliente.getNome}`
    );
    return numeroConta;
  }

  buscarConta(numeroConta: string): ContaBancariaBanco {
    const conta = this.listaContas.get(numeroConta);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }
    return conta;
  }

  listarContas(): ContaBancariaBanco[] {
    return Array.from(this.listaContas.values());
  }

  realizarTransferencia(
    contaOrigem: string,
    contaDestino: string,
    valor: number
  ): boolean {
    const origem = this.buscarConta(contaOrigem);
    const destino = this.buscarConta(contaDestino);

    if (origem && destino && origem.sacar(valor)) {
      destino.depositar(valor);
      console.log(`Transferência de R$ ${valor} realizada com sucesso`);
      return true;
    }
    return false;
  }

  get getNome(): string {
    return this.nome;
  }
}

// Função principal para testar a implementação
function executarSistemaBancario() {
  // TODO: Crie instâncias das classes e teste as funcionalidades
  try {
    console.log('=== Sistema Bancário - Exercício ===\n');

    // Criando clientes
    const cliente1 = new ClienteBanco(
      'João da Silva',
      '123.456.789-00',
      'joao@email.com'
    );
    const cliente2 = new ClienteBanco(
      'Maria Oliveira',
      '987.654.321-00',
      'maria@email.com'
    );

    // Criando banco
    const banco = new BancoExercicio('Banco do Brasil');
    console.log(`Banco: ${banco.getNome}\n`);

    // Criando contas
    const conta1 = banco.criarConta(1000, cliente1);
    const conta2 = banco.criarConta(2000, cliente2);

    // Testando operações
    console.log('\n=== Operações ===');

    const contaJoao = banco.buscarConta(conta1);
    console.log(`Saldo inicial João: R$ ${contaJoao.getSaldo}`);

    contaJoao.depositar(500);
    console.log(`Saldo após depósito: R$ ${contaJoao.getSaldo}`);

    contaJoao.sacar(200);
    console.log(`Saldo após saque: R$ ${contaJoao.getSaldo}`);

    // Testando transferência
    console.log('\n=== Transferência ===');
    banco.realizarTransferencia(conta1, conta2, 300);

    console.log(`Saldo final João: R$ ${banco.buscarConta(conta1).getSaldo}`);
    console.log(`Saldo final Maria: R$ ${banco.buscarConta(conta2).getSaldo}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro:', error.message);
    } else {
      console.error('Erro inesperado:', error);
    }
  }
}

executarSistemaBancario();
