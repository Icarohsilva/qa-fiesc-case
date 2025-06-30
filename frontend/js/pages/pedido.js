import { API_URL } from '../config.js';

// Verifica token e redireciona se necessário
const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

const nomeUsuario = localStorage.getItem('nomeUsuario');
if (nomeUsuario) {
  document.getElementById('usuarioNome').textContent = `Olá, ${nomeUsuario}`;
}

// Elementos DOM
const baseContainer = document.getElementById('listaBase');
const adicionalContainer = document.getElementById('listaAdicional');

const modalAdicional = document.getElementById('modal-confirmacao');
const modalResumo = document.getElementById('modal-resumo');
const infoCafe = document.getElementById('infoCafe');
const infoIngredientes = document.getElementById('infoIngredientes');
const overlay = document.getElementById('overlay-sucesso');
const alerta = document.getElementById('alerta');
const logoutBtn = document.getElementById('logout');
const btnMontar = document.getElementById('btnMontar');
const confirmarAdicionais = document.getElementById('confirmarAdicionais');
const alterarPedido = document.getElementById('alterarPedido');
const voltarAdicionais = document.getElementById('voltarAdicionais');
const confirmarPedido = document.getElementById('confirmarPedido');

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

let todosIngredientes = [];
let cafeSelecionado = null;
let baseSelecionada = [];

// Cria os elementos visuais de ingredientes
function criarItem(ingrediente) {
  const div = document.createElement('div');
  div.classList.add('item');
  div.textContent = ingrediente.nome;
  div.dataset.id = ingrediente.id;
  return div;
}

// Carrega ingredientes base ou adicionais
async function carregarIngredientes(tipo, container) {
  const res = await fetch(`${API_URL}/ingredientes?tipo=${tipo}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const ingredientes = await res.json();
  todosIngredientes.push(...ingredientes);
  ingredientes.forEach(ing => container.appendChild(criarItem(ing)));
}

carregarIngredientes('BASE', baseContainer);
carregarIngredientes('ADICIONAL', adicionalContainer);

// Recupera itens selecionados
function getSelecionados(container) {
  return [...container.querySelectorAll('.item.selecionado')].map(e => {
    const id = parseInt(e.dataset.id);
    const ingrediente = todosIngredientes.find(i => i.id === id);
    return {
      id,
      nome: ingrediente?.nome || e.textContent,
      valor: ingrediente?.valor ?? 0
    };
  });
}

// Controla a seleção visual
function toggleSelecao(e, limite = Infinity) {
  const item = e.target;
  if (!item.classList.contains('item')) return;
  const container = item.parentElement;
  const selecionados = container.querySelectorAll('.selecionado');

  if (item.classList.contains('selecionado')) {
    item.classList.remove('selecionado');
  } else {
    if (selecionados.length >= limite) return;
    item.classList.add('selecionado');
  }
}

baseContainer.addEventListener('click', e => toggleSelecao(e));
adicionalContainer.addEventListener('click', e => toggleSelecao(e, 2));

// Botão Montar Café
btnMontar.addEventListener('click', async () => {
  baseSelecionada = getSelecionados(baseContainer);

  if (baseSelecionada.length < 1) {
    alerta.textContent = '⚠️ Selecione ao menos 1 ingrediente base.';
    alerta.style.display = 'block';
    setTimeout(() => alerta.style.display = 'none', 4000);
    return;
  }

  const todosIds = baseSelecionada.map(i => i.id).sort();
  const res = await fetch(`${API_URL}/cafes/identificar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ ingredientesIds: todosIds })
  });

  cafeSelecionado = await res.json();
  modalAdicional.style.display = 'flex';
});

// Voltar para base
alterarPedido.onclick = () => {
  modalAdicional.style.display = 'none';
};

// Confirmar adicionais
confirmarAdicionais.onclick = () => {
  const adicionaisSelecionados = getSelecionados(adicionalContainer);

  const totalBase = baseSelecionada.reduce((sum, item) => sum + item.valor, 0);
  const totalAdicional = adicionaisSelecionados.reduce((sum, item) => sum + item.valor, 0);
  const total = totalBase + totalAdicional;

  const baseFormatada = baseSelecionada.map(i => `${i.nome} (R$ ${i.valor.toFixed(2)})`).join(', ');
  const adicionaisFormatados = adicionaisSelecionados.length > 0
    ? adicionaisSelecionados.map(i => `${i.nome} (R$ ${i.valor.toFixed(2)})`).join(', ')
    : 'Nenhum';

  infoCafe.innerHTML = `<span>☕ ${cafeSelecionado?.nome || 'Café Personalizado'} - ${cafeSelecionado?.descricao || 'PERSONALIZADO'}</span>`;
  infoIngredientes.innerHTML = `
    <strong>Ingredientes Base:</strong> ${baseFormatada}<br>
    <strong>Adicionais:</strong> ${adicionaisFormatados}<br>
    <strong>Total:</strong> R$ ${total.toFixed(2)}
  `;

  modalAdicional.style.display = 'none';
  modalResumo.style.display = 'block';
};

// Voltar para escolher adicionais
voltarAdicionais.onclick = () => {
  modalResumo.style.display = 'none';
  modalAdicional.style.display = 'flex';
};

// Confirmar pedido final
confirmarPedido.onclick = async () => {
  const base = baseSelecionada.map(i => i.id);
  const adicionais = getSelecionados(adicionalContainer).map(i => i.id);

  await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredientesBaseIds: base,
      ingredientesAdicionaisIds: adicionais
    })
  });

  modalResumo.style.display = 'none';
  overlay.style.display = 'flex';

  setTimeout(() => {
    window.location.href = `${window.location.origin}/historico.html`;;
  }, 2500);
};
