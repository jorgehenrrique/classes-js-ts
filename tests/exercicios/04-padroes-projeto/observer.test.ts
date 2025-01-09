import { describe, it, expect, vi } from 'vitest';
import {
  SubjectExercicio,
  ClienteObserver,
} from '../../../src/exercicios/04-padroes-projeto/index';

describe('Observer Pattern', () => {
  it('deve notificar todos os observadores registrados', () => {
    const subject = new SubjectExercicio();
    const cliente1 = new ClienteObserver('João');
    const cliente2 = new ClienteObserver('Maria');

    // Mock console.log para testar as mensagens
    const consoleSpy = vi.spyOn(console, 'log');

    subject.adicionarObserver(cliente1);
    subject.adicionarObserver(cliente2);

    subject.notificarObservers('Nova promoção!');

    expect(consoleSpy).toHaveBeenCalledWith(
      'João recebeu a notificação: Nova promoção!'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'Maria recebeu a notificação: Nova promoção!'
    );
  });

  it('deve remover observador corretamente', () => {
    const subject = new SubjectExercicio();
    const cliente1 = new ClienteObserver('João');
    const cliente2 = new ClienteObserver('Maria');

    const consoleSpy = vi.spyOn(console, 'log');

    subject.adicionarObserver(cliente1);
    subject.adicionarObserver(cliente2);
    subject.removerObserver(cliente1);

    subject.notificarObservers('Nova promoção!');

    expect(consoleSpy).not.toHaveBeenCalledWith(
      'João recebeu a notificação: Nova promoção!'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'Maria recebeu a notificação: Nova promoção!'
    );
  });

  it('deve armazenar histórico de mensagens', () => {
    const subject = new SubjectExercicio();
    const mensagem1 = 'Promoção 1';
    const mensagem2 = 'Promoção 2';

    subject.notificarObservers(mensagem1);
    subject.notificarObservers(mensagem2);

    const mensagens = subject.getMensagens();
    expect(mensagens).toContain(mensagem1);
    expect(mensagens).toContain(mensagem2);
    expect(mensagens.length).toBe(2);
  });
});
