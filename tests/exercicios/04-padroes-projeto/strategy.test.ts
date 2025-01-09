import { describe, it, expect, vi } from 'vitest';
import {
  ProcessadorPagamento,
  PagamentoCartaoCredito,
  PagamentoPix,
} from '../../../src/exercicios/04-padroes-projeto/index';

describe('Strategy Pattern', () => {
  it('deve processar pagamento com cartão de crédito', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const cartao = new PagamentoCartaoCredito('1234567890123456');
    const processador = new ProcessadorPagamento(cartao);

    processador.processarPagamento(1000);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Cartão: **** **** **** 3456')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Valor: R$ 1000.00')
    );
  });

  it('deve processar pagamento com PIX', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const pix = new PagamentoPix('email@exemplo.com');
    const processador = new ProcessadorPagamento(pix);

    processador.processarPagamento(500);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Chave: email@exemplo.com')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Valor: R$ 500.00')
    );
  });

  it('deve trocar estratégia de pagamento', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const cartao = new PagamentoCartaoCredito('1234567890123456');
    const pix = new PagamentoPix('email@exemplo.com');
    const processador = new ProcessadorPagamento(cartao);

    processador.processarPagamento(1000);
    processador.setStrategy(pix);
    processador.processarPagamento(500);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Cartão: **** **** **** 3456')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Chave: email@exemplo.com')
    );
  });

  it('deve retornar descrição correta para cada estratégia', () => {
    const cartao = new PagamentoCartaoCredito('1234567890123456');
    const pix = new PagamentoPix('email@exemplo.com');

    expect(cartao.getDescricao()).toBe('Cartão de Crédito: **** 3456');
    expect(pix.getDescricao()).toBe('PIX: email@exemplo.com');
  });
});
