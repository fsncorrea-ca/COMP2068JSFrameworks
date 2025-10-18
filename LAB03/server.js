//Require connect and url modules
const connect = require('connect');
const url = require('url');

// Middleware function to handle calculations
function calculate(req, res, next) {
  const queryObject = url.parse(req.url, true).query;
  const pathname = url.parse(req.url).pathname;

// Check if the request is for /lab3
  if (pathname === '/lab3') {
    const method = queryObject.method;
    const x = parseFloat(queryObject.x);
    const y = parseFloat(queryObject.y);

    if (isNaN(x) || isNaN(y)) {
      res.end('Error: Both x and y must be valid numbers.');
      return;
    }

    let result;
    let symbol;
// Perform the requested operation
    switch (method) {
      case 'add':
        result = x + y;
        symbol = '+';
        break;
      case 'subtract':
        result = x - y;
        symbol = '-';
        break;
      case 'multiply':
        result = x * y;
        symbol = '*';
        break;
      case 'divide':
        if (y === 0) {
          res.end('Error: Cannot divide by zero.');
          return;
        }
        result = x / y;
        symbol = '/';
        break;
      default:
        res.end('Error: Invalid method. Use add, subtract, multiply, or divide.');
        return;
    }
// Send the result back to the client
    const output = `${x} ${symbol} ${y} = ${result}`;
    res.end(output);
  } else {
    next();
  }
}
// Create the server and use the calculate middleware
const app = connect();
app.use(calculate);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
