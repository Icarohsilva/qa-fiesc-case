import { API_URL } from '../config.js';

const form = document.getElementById('registroForm');
const erroDiv = document.getElementById('mensagemErro');
const toast = document.getElementById('toast');
const toastText = document.getElementById('toast-text');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  erroDiv.textContent = '';

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  if (nome.length < 3) {
    erroDiv.textContent = '⚠️ Nome deve ter pelo menos 3 letras.';
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    erroDiv.textContent = '⚠️ Email inválido.';
    return;
  }

  if (senha.length < 6 || !/\d/.test(senha)) {
    erroDiv.textContent = '⚠️ Senha deve ter 6+ caracteres e ao menos 1 número.';
    return;
  }

  try {
    const res = await fetch(`${API_URL}/auth/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await res.json();

    if (!res.ok) {
      erroDiv.textContent = data.erro || '⚠️ Erro ao registrar. Tente outro email.';
      return;
    }

  mostrarToast('Cadastro realizado com sucesso!');
  window.toastFinalizado = true; // flag global para testes
    
  setTimeout(() => {
    window.location.href = `${window.location.origin}/login.html`;
  }, 3000);

  } catch (err) {
    erroDiv.textContent = '⚠️ Erro de conexão com o servidor.';
  }
});

function mostrarToast(mensagem) {
  toastText.textContent = mensagem;
  toast.style.display = 'flex';
}
