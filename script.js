const input = document.getElementById('password-input');
const bar = document.getElementById('strength-bar');
const label = document.getElementById('strength-label');
const toggleBtn = document.getElementById('toggle-visibility');

const checks = {
  length: document.getElementById('check-length'),
  upper:  document.getElementById('check-upper'),
  number: document.getElementById('check-number'),
  symbol: document.getElementById('check-symbol'),
};

// --- Strength logic ---
function checkStrength(password) {
  let score = 0;

  const rules = {
    length: password.length >= 8,
    upper:  /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^a-zA-Z0-9]/.test(password),
  };

  // Update checklist items
  for (const rule in rules) {
    if (rules[rule]) {
      checks[rule].classList.add('met');
      score++;
    } else {
      checks[rule].classList.remove('met');
    }
  }

  return score;
}

// --- Update the UI ---
function updateUI(score) {
  const levels = [
    { width: '0%',   color: '',        text: 'Start typing...' },
    { width: '25%',  color: '#e53935', text: 'Weak' },
    { width: '50%',  color: '#ff9800', text: 'Fair' },
    { width: '75%',  color: '#fdd835', text: 'Strong' },
    { width: '100%', color: '#43a047', text: 'Very strong 🎉' },
  ];

  const level = levels[score];
  bar.style.width = level.width;
  bar.style.backgroundColor = level.color;
  label.textContent = level.text;
  label.style.color = level.color || '#888';
}

// --- Listen for typing ---
input.addEventListener('input', () => {
  const score = checkStrength(input.value);
  updateUI(score);
});

// --- Show / hide password ---
toggleBtn.addEventListener('click', () => {
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  toggleBtn.textContent = isHidden ? '🙈' : '👁';
});