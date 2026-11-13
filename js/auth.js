(() => {
  'use strict';
  const USERS_KEY = 'edutrack_users';
  const SESSION_KEY = 'edutrack_session';
  const $ = (id) => document.getElementById(id);
  const form = $('authForm');
  const message = $('formMessage');
  const setMessage = (text, type = 'error') => {
    message.textContent = text;
    message.className = `form-message ${type}`;
  };
  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch { return []; }
  };
  const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const normalizeEmail = (email) => email.trim().toLowerCase();
  async function hashPassword(password) {
    const bytes = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  function sessionFor(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, name: user.name }));
    window.location.replace('index.html');
  }
  function showPasswordToggle() {
    document.querySelectorAll('[data-toggle-password]').forEach((button) => {
      button.addEventListener('click', () => {
        const input = $(button.dataset.togglePassword);
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        button.textContent = show ? 'Hide' : 'Show';
        button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      });
    });
  }
  showPasswordToggle();
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const action = form.dataset.action;
    const email = normalizeEmail($('email').value);
    const password = $('password')?.value || '';
    const users = getUsers();
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    submit.textContent = 'Please wait…';
    try {
      if (action === 'signup') {
        const name = $('name').value.trim();
        const confirm = $('confirmPassword').value;
        if (name.length < 2) throw new Error('Please enter your name (at least 2 characters).');
        if (password.length < 8) throw new Error('Use a password with at least 8 characters.');
        if (password !== confirm) throw new Error('Your passwords do not match.');
        if (users.some((u) => u.email === email)) throw new Error('An account with this email already exists. Please log in.');
        const user = { name, email, passwordHash: await hashPassword(password), createdAt: new Date().toISOString() };
        users.push(user); saveUsers(users); sessionFor(user);
      } else if (action === 'login') {
        const user = users.find((u) => u.email === email);
        if (!user || user.passwordHash !== await hashPassword(password)) throw new Error('Incorrect email or password. Please try again or create an account.');
        sessionFor(user);
      } else if (action === 'reset') {
        const user = users.find((u) => u.email === email);
        if (!user) throw new Error('No EduTrack account was found with that email.');
        if (password.length < 8) throw new Error('Use a new password with at least 8 characters.');
        user.passwordHash = await hashPassword(password); saveUsers(users);
        setMessage('Password updated. You can now log in.', 'success');
        setTimeout(() => window.location.replace('login.html'), 1100);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      submit.disabled = false;
      submit.textContent = form.dataset.submitLabel || 'Continue';
    }
  });
  $('demoFill')?.addEventListener('click', () => {
    $('email').value = 'student@example.com';
    $('password').value = 'Student123';
    setMessage('Demo account is ready. Select Log in to continue.', 'success');
  });
})();
