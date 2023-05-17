const startServer = require('./app/app.js');

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
