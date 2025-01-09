import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  Produto,
  ItemCarrinho,
  CarrinhoCompras,
} from '../../../src/exemplos/04-exemplos-praticos/index';

describe('Sistema de E-commerce', () => {
  describe('Produto', () => {
    let produto: Produto;

    beforeEach(() => {
      produto = new Produto('1', 'Notebook', 5000, 10);
    });

    it('deve retornar os dados do produto corretamente', () => {
      expect(produto.getNome()).toBe('Notebook');
      expect(produto.getPreco()).toBe(5000);
      expect(produto.getEstoque()).toBe(10);
    });

    it('deve remover quantidade do estoque quando disponível', () => {
      produto.removerDoEstoque(3);
      expect(produto.getEstoque()).toBe(7);
    });

    it('deve lançar erro ao tentar remover mais que o estoque disponível', () => {
      expect(() => {
        produto.removerDoEstoque(15);
      }).toThrow('Estoque insuficiente');
    });
  });

  describe('ItemCarrinho', () => {
    let produto: Produto;
    let item: ItemCarrinho;

    beforeEach(() => {
      produto = new Produto('1', 'Mouse', 100, 20);
      item = new ItemCarrinho(produto, 2);
    });

    it('deve calcular o total do item corretamente', () => {
      expect(item.getTotal()).toBe(200);
    });

    it('deve retornar o produto e quantidade corretamente', () => {
      expect(item.getProduto()).toBe(produto);
      expect(item.getQuantidade()).toBe(2);
    });
  });

  describe('CarrinhoCompras', () => {
    let carrinho: CarrinhoCompras;
    let notebook: Produto;
    let mouse: Produto;
    let consoleSpy: any;

    beforeEach(() => {
      carrinho = new CarrinhoCompras();
      notebook = new Produto('1', 'Notebook', 5000, 10);
      mouse = new Produto('2', 'Mouse', 100, 20);
      consoleSpy = vi.spyOn(console, 'log');
    });

    it('deve adicionar itens ao carrinho quando há estoque', () => {
      carrinho.adicionarItem(notebook, 1);
      carrinho.adicionarItem(mouse, 2);

      expect(carrinho.getTotal()).toBe(5200);
      expect(consoleSpy).toHaveBeenCalledWith(
        '1x Notebook adicionado ao carrinho'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        '2x Mouse adicionado ao carrinho'
      );
    });

    it('não deve adicionar item quando não há estoque suficiente', () => {
      carrinho.adicionarItem(notebook, 15);

      expect(carrinho.getTotal()).toBe(0);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Estoque insuficiente para Notebook'
      );
    });

    it('deve finalizar a compra corretamente', () => {
      carrinho.adicionarItem(notebook, 1);
      carrinho.adicionarItem(mouse, 2);
      carrinho.finalizarCompra();

      expect(notebook.getEstoque()).toBe(9);
      expect(mouse.getEstoque()).toBe(18);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Total da compra: R$ 5200.00')
      );
    });

    it('deve limpar o carrinho após finalizar a compra', () => {
      carrinho.adicionarItem(notebook, 1);
      carrinho.adicionarItem(mouse, 2);
      carrinho.finalizarCompra();

      expect(carrinho.getTotal()).toBe(0);
    });

    it('deve atualizar o estoque corretamente após a compra', () => {
      carrinho.adicionarItem(notebook, 2);
      carrinho.adicionarItem(mouse, 3);
      carrinho.finalizarCompra();

      expect(notebook.getEstoque()).toBe(8);
      expect(mouse.getEstoque()).toBe(17);
    });
  });
});
