// 🔥 Bangla keyword highlight
function highlightCode() {
  const textarea = document.getElementById('code');
  let code = textarea.value;

  const keywords = [
    'বন্ধু এইডা হইল',
    'ধরি বন্ধু',
    'কিছুই না বন্ধু',
    'হ্যা বন্ধু',
    'না বন্ধু',
    'বল তো বন্ধু',
    'যদি বন্ধু',
    'না হইলে বন্ধু',
    'একদমই না হইলে',
    'যতক্ষণ পর্যন্ত বন্ধু',
    'থামিস বন্ধু',
    'তারপরেরটা দেখ বন্ধু',
    'বন্ধু কামডা হইল',
    'দে তো বন্ধু'
  ];

  // HTML escape
  code = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  keywords.forEach(word => {
    const regex = new RegExp(word, 'g');
    code = code.replace(
      regex,
      `<span class="keyword">${word}</span>`
    );
  });

  document.getElementById('highlight').innerHTML = code;
}

// ▶️ Run code
function runCode() {
  const output = document.getElementById('output');
  output.textContent = '';

  let code = document.getElementById('code').value;

  const translations = {
    'বন্ধু এইডা হইল': 'let',
    'ধরি বন্ধু': 'let',
    'কিছুই না বন্ধু': 'null',
    'হ্যা বন্ধু': 'true',
    'না বন্ধু': 'false',
    'বল তো বন্ধু': 'console.log',
    'যদি বন্ধু': 'if',
    'না হইলে বন্ধু': 'else if',
    'একদমই না হইলে': 'else',
    'যতক্ষণ পর্যন্ত বন্ধু': 'while',
    'থামিস বন্ধু': 'break',
    'তারপরেরটা দেখ বন্ধু': 'continue',
    'বন্ধু কামডা হইল': 'function',
    'দে তো বন্ধু': 'return'
  };

  Object.keys(translations).forEach(key => {
    const regex = new RegExp(key, 'g');
    code = code.replace(regex, translations[key]);
  });

  console.log = function (msg) {
    output.textContent += msg + '\n';
  };

  try {
    eval(code);
  } catch (e) {
    output.textContent = 'Error: ' + e.message;
  }
}

// 🧹 Clear code
function clearCode() {
  document.getElementById('code').value = '';
  document.getElementById('highlight').innerHTML = '';
}

// 🧹 Clear output
function clearOutput() {
  document.getElementById('output').textContent = '';
}
