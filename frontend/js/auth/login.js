import { API_URL } from '../config.js';

const form = document.getElementById('loginForm');
const erroDiv = document.getElementById('mensagemErro');
const overlay = document.getElementById('overlay-sucesso');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  erroDiv.textContent = '';

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  if (!/\S+@\S+\.\S+/.test(email)) {
    erroDiv.textContent = '⚠️ Email inválido. Digite um e-mail válido.';
    return;
  }

  if (!senha) {
    erroDiv.textContent = '⚠️ Informe a senha.';
    return;
  }

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (!res.ok) {
      erroDiv.textContent = data.erro || '⚠️ Email ou senha inválidos.';
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('nomeUsuario', data.usuario.nome);

    overlay.style.display = 'flex';
    overlay.dataset.status = 'logado';
    setTimeout(() => {
      window.location.href = `${window.location.origin}/pedido.html`;
    }, 2000);
  } catch (err) {
    erroDiv.textContent = '⚠️ Erro de conexão. Tente novamente mais tarde.';
  }
});
