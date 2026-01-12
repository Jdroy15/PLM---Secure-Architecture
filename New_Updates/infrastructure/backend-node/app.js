const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const user = req.header('X-Auth-Request-User') || 'anonymous';
  const email = req.header('X-Auth-Request-Email') || '';
  const groups = req.header('X-Auth-Request-Groups') || '';
  res.json({ message: 'protected resource', user, email, groups });
});

app.get('/admin', (req, res) => {
  const groups = req.header('X-Auth-Request-Groups') || '';
  if (!groups.includes('police_admins') && !req.header('X-Auth-Request-User').includes('admin')) {
    return res.status(403).json({ error: 'forbidden' });
  }
  res.json({ message: 'admin area' });
});

app.listen(5000, '0.0.0.0', () => console.log('backend running on 5000'));
