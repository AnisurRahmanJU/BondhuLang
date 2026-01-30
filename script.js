/*************** বাংলা ↔ ইংরেজি সংখ্যা কনভার্ট ***************/
function bnToEnNumber(str) {
  const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return str.replace(/[০-৯]/g, d => bn.indexOf(d));
}

function enToBnNumber(str) {
  const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return str.replace(/\d/g, d => bn[d]);
}

/******************** Input Function ********************/
function Input(msg = '') {
  const value = prompt(msg);
  return bnToEnNumber(value ?? '');
}


/******************** Syntax Highlight ********************/
function highlightCode() {
  const textarea = document.getElementById('code');
  const highlight = document.getElementById('highlight');
  const lineNumbers = document.getElementById('lineNumbers');

  let code = textarea.value;

  const keywords = [
    'বন্ধু এইডা হইল','ধরি বন্ধু','কিছুই না বন্ধু','হ্যাঁ বন্ধু','না বন্ধু',
    'বল তো বন্ধু','যদি বন্ধু','না হইলে বন্ধু','একদমই না হইলে',
    'যতক্ষণ পর্যন্ত বন্ধু','থামিস বন্ধু','তারপরেরটা দেখ বন্ধু',
    'বন্ধু কামডা হইল','দে তো বন্ধু','কিছু নে বন্ধু','দৈর্ঘ্য'
  ];

  code = code.replace(/&/g,'&amp;')
             .replace(/</g,'&lt;')
             .replace(/>/g,'&gt;');

  keywords.forEach(word => {
    const regex = new RegExp(word, 'g');
    code = code.replace(regex, `<span class="keyword">${word}</span>`);
  });

  highlight.innerHTML = code;

  const lines = textarea.value.split('\n');
  lineNumbers.textContent = lines.map((_, i) => i + 1).join('\n');
}

/******************** Scroll Sync ********************/
function syncScroll() {
  const textarea = document.getElementById('code');
  const highlight = document.getElementById('highlight');
  const lineNumbers = document.getElementById('lineNumbers');

  highlight.scrollTop = textarea.scrollTop;
  highlight.scrollLeft = textarea.scrollLeft;
  lineNumbers.scrollTop = textarea.scrollTop;
}

/******************** Code Runner ********************/
function runCode() {
  const output = document.getElementById('output');
  output.textContent = '';

  let code = document.getElementById('code').value;

  // বাংলা সংখ্যা → ইংরেজি
  code = bnToEnNumber(code);

  const translations = {
    'বন্ধু এইডা হইল':'let',
    'ধরি বন্ধু':'let',
    'কিছুই না বন্ধু':'null',
    'হ্যাঁ বন্ধু':'true',
    'না বন্ধু':'false',
    'বল তো বন্ধু':'console.log',
    'যদি বন্ধু':'if',
    'না হইলে বন্ধু':'else if',
    'একদমই না হইলে':'else',
    'যতক্ষণ পর্যন্ত বন্ধু':'while',
    'থামিস বন্ধু':'break',
    'তারপরেরটা দেখ বন্ধু':'continue',
    'বন্ধু কামডা হইল':'function',
    'দে তো বন্ধু':'return',
    'কিছু নে বন্ধু':'Input',
    'দৈর্ঘ্য':'length',
  };

  Object.keys(translations).forEach(key => {
    code = code.replace(new RegExp(key, 'g'), translations[key]);
  });

  // console.log override
  console.log = function(msg) {
    output.textContent += enToBnNumber(String(msg)) + '\n';
  };

  try {
    eval(code);
  } catch (e) {
    output.textContent = 'Error: ' + e.message;
  }
}

/******************** Clear Functions ********************/
function clearCode() {
  document.getElementById('code').value = '';
  document.getElementById('highlight').innerHTML = '';
  document.getElementById('lineNumbers').textContent = '1';
}

function clearOutput() {
  document.getElementById('output').textContent = '';
}







