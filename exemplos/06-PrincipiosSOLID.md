# Princípios SOLID com Classes

## O que são os Princípios SOLID?

SOLID é um acrônimo que representa cinco princípios fundamentais da programação orientada a objetos. Estes princípios foram introduzidos por Robert C. Martin (Uncle Bob) e são considerados as melhores práticas para escrever código limpo, manutenível e escalável.

Vamos entender o que cada letra significa de forma simples:

- **S (Single Responsibility)**: Cada classe deve ter apenas uma responsabilidade

  - É como um trabalhador que faz apenas uma função específica
  - Exemplo: Um cozinheiro apenas cozinha, não serve as mesas

- **O (Open/Closed)**: Classes devem estar abertas para extensão, mas fechadas para modificação

  - É como um produto que pode receber acessórios sem alterar seu funcionamento básico
  - Exemplo: Um celular que aceita diferentes capas sem precisar ser modificado

- **L (Liskov Substitution)**: Classes derivadas devem poder substituir suas classes base

  - É como poder usar qualquer tipo de bateria compatível em um dispositivo
  - Exemplo: Qualquer pilha AA deve funcionar em um controle remoto

- **I (Interface Segregation)**: Classes não devem ser forçadas a implementar interfaces que não usam

  - É como não obrigar um funcionário a ter habilidades que não precisa para sua função
  - Exemplo: Um motorista não precisa saber cozinhar

- **D (Dependency Inversion)**: Módulos de alto nível não devem depender de módulos de baixo nível
  - É como poder trocar peças de um carro sem afetar seu funcionamento geral
  - Exemplo: Poder trocar o tipo de banco de dados sem alterar a lógica do negócio

Estes princípios ajudam a:

1. Criar código mais organizado
2. Facilitar a manutenção
3. Permitir reuso de código
4. Tornar o código mais testável
5. Reduzir problemas de desenvolvimento

Vamos ver cada um em detalhes com exemplos práticos:

## S - Single Responsibility Principle (Princípio da Responsabilidade Única)

Uma classe deve ter apenas uma razão para mudar.

### Exemplo Ruim

```typescript
class Usuario {
  constructor(private nome: string, private email: string) {}

  salvar(): void {
    // Lógica para salvar no banco de dados
    console.log('Salvando usuário no banco...');
  }

  enviarEmail(): void {
    // Lógica para enviar email
    console.log('Enviando email...');
  }

  gerarRelatorio(): void {
    // Lógica para gerar relatório
    console.log('Gerando relatório...');
  }
}
```

### Exemplo Bom

```typescript
class Usuario {
  constructor(private nome: string, private email: string) {}

  getNome(): string {
    return this.nome;
  }

  getEmail(): string {
    return this.email;
  }
}

class UsuarioRepository {
  salvar(usuario: Usuario): void {
    console.log('Salvando usuário no banco...');
  }
}

class EmailService {
  enviar(destinatario: string, mensagem: string): void {
    console.log('Enviando email...');
  }
}

class RelatorioService {
  gerar(usuario: Usuario): void {
    console.log('Gerando relatório...');
  }
}
```

## O - Open/Closed Principle (Princípio Aberto/Fechado)

Classes devem estar abertas para extensão, mas fechadas para modificação.

### Exemplo Ruim

```typescript
class Calculadora {
  calcularDesconto(tipo: string, valor: number): number {
    if (tipo === 'NORMAL') {
      return valor * 0.1;
    } else if (tipo === 'VIP') {
      return valor * 0.2;
    } else if (tipo === 'PREMIUM') {
      return valor * 0.3;
    }
    return 0;
  }
}
```

### Exemplo Bom

```typescript
interface CalculadoraDesconto {
  calcular(valor: number): number;
}

class DescontoNormal implements CalculadoraDesconto {
  calcular(valor: number): number {
    return valor * 0.1;
  }
}

class DescontoVIP implements CalculadoraDesconto {
  calcular(valor: number): number {
    return valor * 0.2;
  }
}

class DescontoPremium implements CalculadoraDesconto {
  calcular(valor: number): number {
    return valor * 0.3;
  }
}
```

## L - Liskov Substitution Principle (Princípio da Substituição de Liskov)

Objetos de uma classe derivada devem poder substituir objetos da classe base sem afetar a corretude do programa.

### Exemplo Ruim

```typescript
class Ave {
  voar(): void {
    console.log('Voando...');
  }
}

class Pinguim extends Ave {
  voar(): void {
    throw new Error('Pinguins não podem voar!');
  }
}
```

### Exemplo Bom

```typescript
interface AveQueVoa {
  voar(): void;
}

interface AveQueNada {
  nadar(): void;
}

class Pardal implements AveQueVoa {
  voar(): void {
    console.log('Voando...');
  }
}

class Pinguim implements AveQueNada {
  nadar(): void {
    console.log('Nadando...');
  }
}
```

## I - Interface Segregation Principle (Princípio da Segregação de Interface)

Clientes não devem ser forçados a depender de interfaces que não utilizam.

### Exemplo Ruim

```typescript
interface Trabalhador {
  trabalhar(): void;
  comer(): void;
  dormir(): void;
}

class Humano implements Trabalhador {
  trabalhar(): void {
    console.log('Trabalhando...');
  }

  comer(): void {
    console.log('Comendo...');
  }

  dormir(): void {
    console.log('Dormindo...');
  }
}

class Robo implements Trabalhador {
  trabalhar(): void {
    console.log('Trabalhando...');
  }

  comer(): void {
    throw new Error('Robôs não comem!');
  }

  dormir(): void {
    throw new Error('Robôs não dormem!');
  }
}
```

### Exemplo Bom

```typescript
interface Trabalhavel {
  trabalhar(): void;
}

interface Alimentavel {
  comer(): void;
}

interface Descansavel {
  dormir(): void;
}

class Humano implements Trabalhavel, Alimentavel, Descansavel {
  trabalhar(): void {
    console.log('Trabalhando...');
  }

  comer(): void {
    console.log('Comendo...');
  }

  dormir(): void {
    console.log('Dormindo...');
  }
}

class Robo implements Trabalhavel {
  trabalhar(): void {
    console.log('Trabalhando...');
  }
}
```

## D - Dependency Inversion Principle (Princípio da Inversão de Dependência)

Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.

### Exemplo Ruim

```typescript
class MySQLDatabase {
  save(data: any): void {
    console.log('Salvando no MySQL...');
  }
}

class UsuarioService {
  private db: MySQLDatabase;

  constructor() {
    this.db = new MySQLDatabase();
  }

  salvarUsuario(usuario: Usuario): void {
    this.db.save(usuario);
  }
}
```

### Exemplo Bom

```typescript
interface Database {
  save(data: any): void;
}

class MySQLDatabase implements Database {
  save(data: any): void {
    console.log('Salvando no MySQL...');
  }
}

class MongoDatabase implements Database {
  save(data: any): void {
    console.log('Salvando no MongoDB...');
  }
}

class UsuarioService {
  constructor(private db: Database) {}

  salvarUsuario(usuario: Usuario): void {
    this.db.save(usuario);
  }
}
```

## Benefícios dos Princípios SOLID

1. **Manutenibilidade**

   - Código mais fácil de manter e modificar
   - Menos propenso a bugs

2. **Reusabilidade**

   - Componentes mais modulares
   - Fácil reutilização

3. **Testabilidade**

   - Código mais fácil de testar
   - Melhor cobertura de testes

4. **Flexibilidade**

   - Fácil adicionar novas funcionalidades
   - Fácil trocar implementações

5. **Compreensibilidade**
   - Código mais claro e organizado
   - Mais fácil de entender

## Dicas de Aplicação

1. Identifique responsabilidades únicas
2. Use interfaces para definir contratos
3. Crie abstrações significativas
4. Evite acoplamento forte
5. Prefira composição sobre herança
