const express = require('express');
const connectDB = require('./config/db');

const app = express();
const path = require('path');

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/quest', require('./routes/api/quest'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/orders', require('./routes/api/orders'));

// Serve static assets in prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
