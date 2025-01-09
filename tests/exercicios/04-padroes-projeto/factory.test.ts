import { describe, it, expect } from 'vitest';
import {
  ProdutoFactoryExercicio,
  ProdutoEletronicoFactory,
  ProdutoLivroFactory,
} from '../../../src/exercicios/04-padroes-projeto/index';

describe('ProdutoFactory', () => {
  const factory = new ProdutoFactoryExercicio();

  it('deve criar um produto eletrônico', () => {
    const produto = factory.criarProduto('eletronico', 'Notebook', 5000);

    expect(produto).toBeInstanceOf(ProdutoEletronicoFactory);
    expect(produto.getNome()).toBe('Notebook');
    expect(produto.getPreco()).toBe(5000);
    expect(produto.getTipo()).toBe('Eletrônico');
  });

  it('deve criar um livro', () => {
    const produto = factory.criarProduto('livro', 'Clean Code', 150);

    expect(produto).toBeInstanceOf(ProdutoLivroFactory);
    expect(produto.getNome()).toBe('Clean Code');
    expect(produto.getPreco()).toBe(150);
    expect(produto.getTipo()).toBe('Livro');
  });

  it('deve lançar erro para tipo de produto inválido', () => {
    expect(() => {
      factory.criarProduto('invalido', 'Produto Teste', 100);
    }).toThrow('Tipo de produto não suportado');
  });
});
