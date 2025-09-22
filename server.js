require('dotenv').config();
const express = require('express');
const { auth } = require('express-openid-connect');

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
