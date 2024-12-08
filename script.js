function runCode() {
  // Get the output element and clear it
  var output = document.getElementById('output');
  output.textContent = '';

  // Get the code from the textarea
  var code = document.getElementById('code').value;

  const translations = {
    'bondhu aida hoilo': 'let', // Variable declaration 
    'bol toh bondhu': 'console.log', // Print to console
    'kisuina bondhu': 'null', // Null value
    'haw bondhu': 'true', // Boolean true value
    'nah bondhu': 'false', // Boolean false value
    'jodi bondhu': 'if', // If condition
    'nah hoile bondhu': 'else if', // Else if condition
    'akdom e nah hoile': 'else', // Else condition
    'jotokhon porjonto bondhu': 'while', // While loop
    'thamis bondhu': 'break', // Break statement
    'tarpor er tah dekh bondhu': 'continue', // Continue statement
    'bondhu kam da hoilo': 'function', // Function declaration
    'de toh bondhu': 'return', // Return statement
  };

  const translateKeywordToJS = (keyword) => {
    return translations[keyword] || keyword;
  };

  const convertToJS = (sourceCode) => {
    Object.keys(translations).forEach((keyword) => {
      // Use a regex to match whole words only to prevent partial replacements
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      sourceCode = sourceCode.replace(regex, translations[keyword]);
    });
    return sourceCode;
  };

  // Convert the code to JavaScript
  code = convertToJS(code);

  // Run the code and capture the output
  var outputMessage;
  try {
    outputMessage = eval(code);
  } catch (error) {
    outputMessage = error;
  }

  // Display the output
  console.log = function (message) {
    // Get the output element
    var output = document.getElementById('output');

    // Append the message to the output element
    output.textContent += message + '\n';
  };
}

// Function to highlight translation keywords in orange
function highlightKeywords() {
  const textarea = document.getElementById('code');
  const translations = [
    'bondhu aida hoilo', 'bol toh bondhu', 'kisuina bondhu', 'haw bondhu',
    'nah bondhu', 'jodi bondhu', 'nah hoile bondhu', 'akdom e nah hoile',
    'jotokhon porjonto bondhu', 'thamis bondhu', 'tarpor er tah dekh bondhu',
    'bondhu kam da hoilo', 'de toh bondhu'
  ];

  let highlightedCode = textarea.value;
  translations.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    highlightedCode = highlightedCode.replace(regex, `<span class="highlight">${word}</span>`);
  });

  textarea.innerHTML = highlightedCode;
}

highlightKeywords();
