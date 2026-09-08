import './medixly.js';
// Frontend preview only. Never persist, transmit, or log form values.
const panels = ['signin', 'signup', 'reset'];
const tabs = [...document.querySelectorAll('[role="tab"]')];
function showView() {
  const requested = location.hash.slice(1);
  const view = [...panels, 'guest'].includes(requested) ? requested : 'signin';
  document.body.dataset.view = view;
  document.getElementById('entry-layout').hidden = view === 'guest';
  document.getElementById('guest-layout').hidden = view !== 'guest';
  document.querySelector('.account-tabs').hidden = view === 'reset';
  for (const name of panels) document.getElementById(`panel-${name}`).hidden = name !== view;
  tabs.forEach(tab => { const selected = tab.dataset.view === view; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
  document.querySelectorAll('[name="password"]').forEach(input => { input.value = ''; input.type = 'password'; });
  document.querySelectorAll('[data-password]').forEach(button => { button.textContent = 'Show'; button.setAttribute('aria-label', 'Show password'); button.setAttribute('aria-pressed', 'false'); });
  document.querySelectorAll('.form-feedback').forEach(note => { note.hidden = true; note.textContent = ''; });
  document.querySelectorAll('.field-error').forEach(note => { note.textContent = ''; });
  document.querySelectorAll('[aria-invalid]').forEach(input => input.removeAttribute('aria-invalid'));
  const titles = { signin: 'Sign in', signup: 'Create account', reset: 'Reset password', guest: 'Guest chat preview' };
  document.title = `${titles[view]} · Medixly`;
  window.scrollTo(0, 0);
  if (view === 'guest') document.getElementById('guest-title').focus({preventScroll:true});
}
tabs.forEach(tab => {
  tab.addEventListener('click', () => { location.hash = tab.dataset.view; });
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs[1] : tabs[tab === tabs[0] ? 1 : 0];
    location.hash = next.dataset.view; next.focus();
  });
});
addEventListener('hashchange', showView); showView();
document.querySelectorAll('[data-password]').forEach(button => button.addEventListener('click', () => {
  const input = document.getElementById(button.dataset.password), show = input.type === 'password';
  input.type = show ? 'text' : 'password'; button.textContent = show ? 'Hide' : 'Show';
  button.setAttribute('aria-label', show ? 'Hide password' : 'Show password'); button.setAttribute('aria-pressed', String(show));
}));
function validate(input) {
  let message = '';
  if (input.type === 'checkbox' && !input.checked) message = 'Please confirm your consent to continue.';
  else if (input.type !== 'checkbox' && !input.value.trim()) message = input.name === 'name' ? 'Please enter your full name.' : input.name === 'email' ? 'Please enter your email address.' : 'Please enter your password.';
  else if (input.type === 'email' && input.validity.typeMismatch) message = 'Enter a valid email address, like you@example.com.';
  else if (input.minLength > 0 && input.value.length < input.minLength) message = `Use at least ${input.minLength} characters.`;
  const error = document.getElementById(`${input.id}-error`);
  if (error) error.textContent = message;
  input.setAttribute('aria-invalid', String(Boolean(message))); return !message;
}
const feedback = {
  signin: 'Account sign-in isn’t connected in this preview. Nothing was submitted. Choose “Continue as a guest” to explore the chat.',
  signup: 'Your form is ready. Account creation isn’t connected in this preview, so no account was created and nothing was submitted. You can explore as a guest below.',
  reset: 'Password reset isn’t connected in this preview. No email was sent and nothing was submitted.'
};
for (const view of panels) {
  const form = document.getElementById(`${view}-form`);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input[required]')], valid = fields.map(validate);
    if (valid.some(value => !value)) { fields[valid.indexOf(false)].focus(); return; }
    const note = document.getElementById(`${view}-feedback`); note.textContent = feedback[view]; note.hidden = false;
    form.querySelectorAll('[name="password"]').forEach(input => { input.value = ''; });
  });
  form.querySelectorAll('input').forEach(input => input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') validate(input);
    document.getElementById(`${view}-feedback`).hidden = true;
  }));
}
const draft = document.getElementById('guest-draft');
document.getElementById('sample-prompt').addEventListener('click', () => { draft.value = 'I have a question about a prescription.'; draft.focus(); });
document.getElementById('guest-composer').addEventListener('submit', event => {
  event.preventDefault(); const text = draft.value.trim(); if (!text) { draft.focus(); return; }
  document.querySelector('.guest-welcome').hidden = true;
  const bubble = document.createElement('p'); bubble.className = 'guest-bubble'; bubble.textContent = text;
  const log = document.getElementById('guest-messages'); log.append(bubble); draft.value = ''; log.scrollTop = log.scrollHeight; draft.focus();
});
