function runCode() {
  var output = document.getElementById('output');
  output.textContent = '';

  var code = document.getElementById('code').value;

  const translations = {
    // Variable & Values
    'বন্ধু এইডা হইল': 'let',
    'ধরি বন্ধু': 'let',
    'কিছুই না বন্ধু': 'null',
    'হ্যা বন্ধু': 'true',
    'না বন্ধু': 'false',

    // Output
    'বল তো বন্ধু': 'console.log',

    // Condition
    'যদি বন্ধু': 'if',
    'না হইলে বন্ধু': 'else if',
    'একদমই না হইলে': 'else',

    // Loop
    'যতক্ষণ পর্যন্ত বন্ধু': 'while',
    'থামিস বন্ধু': 'break',
    'তারপরেরটা দেখ বন্ধু': 'continue',

    // Function
    'বন্ধু কামডা হইল': 'function',
    'দে তো বন্ধু': 'return'
  };

  // 🔁 বাংলা → JS কনভার্সন
  Object.keys(translations).forEach((key) => {
    const regex = new RegExp(key, 'g');
    code = code.replace(regex, translations[key]);
  });

  // 🖨️ console.log ধরছি
  console.log = function (message) {
    output.textContent += message + '\n';
  };

  try {
    eval(code);
  } catch (e) {
    output.textContent = 'Error: ' + e.message;
  }
}
