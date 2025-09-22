require('dotenv').config();
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');

const connectDB = require('./db');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

connectDB();
const app = express();
const PORT = 3000;

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

// Example GET route to fetch documents from a collection
app.get('/api/data', requiresAuth(), async (req, res) => {
  try {
    const db = await connectDB();
    const items = await db.collection('contacts').find().limit(10).toArray();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
