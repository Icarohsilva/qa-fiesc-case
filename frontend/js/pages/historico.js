import { API_URL } from '../config.js';

const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

const nomeUsuario = localStorage.getItem('nomeUsuario');
if (nomeUsuario) {
  document.getElementById('usuarioNome').textContent = `Pedidos do ${nomeUsuario}`;
}

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

const statusList = ['RECEBIDO', 'PREPARANDO', 'FINALIZADO', 'ENTREGUE'];
const statusCores = {
  RECEBIDO: '#4b2e1e',
  PREPARANDO: '#d97706',
  FINALIZADO: '#059669',
  ENTREGUE: '#3b82f6'
};

const avancarStatus = (pedidoEl, pedido) => {
  const statusAtual = pedido.status;
  const proximoStatus = statusList[(statusList.indexOf(statusAtual) + 1) % statusList.length];
  pedido.status = proximoStatus;

  const statusDiv = pedidoEl.querySelector('.status');
  statusDiv.textContent = `Status: ${proximoStatus}`;
  statusDiv.style.color = statusCores[proximoStatus];
};

async function carregarHistorico() {
  try {
    const res = await fetch(`${API_URL}/pedidos/historico`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const pedidos = await res.json();
    const lista = document.getElementById('listaPedidos');
    lista.innerHTML = '';

    pedidos.forEach(pedido => {
      const div = document.createElement('div');
      div.classList.add('pedido');

      const bases = pedido.ingredientes.filter(i => i.tipo === 'BASE');
      const adicionais = pedido.ingredientes.filter(i => i.tipo === 'ADICIONAL');
      const total = pedido.ingredientes.reduce((sum, i) => sum + (i.ingrediente.valor || 0), 0);

      const statusColor = statusCores[pedido.status] || '#4b2e1e';

      div.innerHTML = `
        <h3>${pedido.nome} (#${pedido.id})</h3>
        <div class="ingredientes">
          <strong>Base:</strong> ${bases.map(i => `${i.ingrediente.nome} (R$ ${i.ingrediente.valor.toFixed(2)})`).join(', ')}<br>
          <strong>Adicionais:</strong> ${adicionais.length ? adicionais.map(i => `${i.ingrediente.nome} (R$ ${i.ingrediente.valor.toFixed(2)})`).join(', ') : 'Nenhum'}<br>
          <strong>Total:</strong> R$ ${total.toFixed(2)}
        </div>
        <div class="status" style="color: ${statusColor}; font-weight: bold;">Status: ${pedido.status}</div>
        <button class="btn-status" aria-label="Verificar status do pedido">Verificar Status</button>
      `;

      div.querySelector('.btn-status').addEventListener('click', () => avancarStatus(div, pedido));
      lista.appendChild(div);
    });
  } catch (err) {
    console.error('Erro ao carregar histórico:', err);
    const lista = document.getElementById('listaPedidos');
    lista.innerHTML = '<p>Erro ao carregar histórico de pedidos. Tente novamente mais tarde.</p>';
  }
}

carregarHistorico();
