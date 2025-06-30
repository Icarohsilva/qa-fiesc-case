import { identificarCafeClassico } from '../../src/utils/identificador.js';

describe('Identificador de Café Clássico', () => {
  const cafesClassicosMock = [
    { nome: 'Latte', ingredientes: [{ ingredienteId: 1 }, { ingredienteId: 2 }] },
    { nome: 'Macchiato', ingredientes: [{ ingredienteId: 1 }, { ingredienteId: 2 }, { ingredienteId: 3 }] }
  ];

  test('deve identificar um café clássico corretamente', () => {
    const idsSelecionados = [1, 2]; // corresponde ao Latte
    const resultado = identificarCafeClassico(idsSelecionados, cafesClassicosMock);
    expect(resultado?.nome).toBe('Latte');
  });

  test('deve retornar undefined se não for um clássico', () => {
    const idsSelecionados = [1, 3]; // nenhum clássico com essa combinação
    const resultado = identificarCafeClassico(idsSelecionados, cafesClassicosMock);
    expect(resultado).toBeUndefined();
  });
    test('deve identificar café clássico com ordem diferente', () => {
    const idsSelecionados = [2, 1]; // corresponde ao Latte, mas em ordem diferente
    const resultado = identificarCafeClassico(idsSelecionados, cafesClassicosMock);
    expect(resultado?.nome).toBe('Latte');
  } );
  test('deve retornar undefined para café personalizado', () => {
    const idsSelecionados = [4, 5]; // nenhum clássico com essa combinação
    const resultado = identificarCafeClassico(idsSelecionados, cafesClassicosMock);
    expect(resultado).toBeUndefined();
  });
    test('deve identificar café clássico com múltiplos ingredientes', () => {
    const idsSelecionados = [1, 2, 3];  // corresponde ao Macchiato
    const resultado = identificarCafeClassico(idsSelecionados, cafesClassicosMock);
    expect(resultado?.nome).toBe('Macchiato');
  });
  test('deve retornar undefined para café com ingredientes extras', () => {
    const idsSelecionados = [1, 2, 4]; // Macchiato + ingrediente extra
    const resultado = identificarCafeClassico(idsSelecionados, cafesClassicosMock);
    expect(resultado).toBeUndefined();
  });
});

