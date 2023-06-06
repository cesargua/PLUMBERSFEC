require('dotenv').config();
const app = require('./index');
// const awsServerlessExpress = require('aws-serverless-express');

// const server = awsServerlessExpress.createServer(app);

// exports.handler = (event, context) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
//   awsServerlessExpress.proxy(server, event, context);
// };

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
