import { describe, it, expect, beforeEach } from 'vitest';
import { ConfiguracaoSingleton } from '../../../src/exercicios/04-padroes-projeto/index';

describe('ConfiguracaoSingleton', () => {
  beforeEach(() => {
    const config = ConfiguracaoSingleton.getInstance();
    config.clearConfig();
  });

  it('deve retornar a mesma instância', () => {
    const config1 = ConfiguracaoSingleton.getInstance();
    const config2 = ConfiguracaoSingleton.getInstance();

    expect(config1).toBe(config2);
  });

  it('deve armazenar e recuperar configurações', () => {
    const config = ConfiguracaoSingleton.getInstance();
    config.setConfig('tema', 'escuro');
    config.setConfig('idioma', 'pt-BR');

    expect(config.getConfig('tema')).toBe('escuro');
    expect(config.getConfig('idioma')).toBe('pt-BR');
  });

  it('deve retornar undefined para chave inexistente', () => {
    const config = ConfiguracaoSingleton.getInstance();
    expect(config.getConfig('inexistente')).toBeUndefined();
  });

  it('deve retornar todas as configurações', () => {
    const config = ConfiguracaoSingleton.getInstance();
    config.setConfig('tema', 'escuro');
    config.setConfig('idioma', 'pt-BR');

    const todas = config.getAllConfig();
    expect(todas.get('tema')).toBe('escuro');
    expect(todas.get('idioma')).toBe('pt-BR');
    expect(todas.size).toBe(2);
  });

  it('deve limpar todas as configurações', () => {
    const config = ConfiguracaoSingleton.getInstance();
    config.setConfig('tema', 'escuro');
    config.setConfig('idioma', 'pt-BR');
    config.clearConfig();

    expect(config.getAllConfig().size).toBe(0);
  });
});
