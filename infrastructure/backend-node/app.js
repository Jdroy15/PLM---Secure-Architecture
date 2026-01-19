const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('--- HEADERS DEBUG ---');
  // Express met automatiquement les headers en minuscules
  // Donc on cherche 'x-forwarded-preferred-username'
  
  // 1. LE USER (On prend le preferred, sinon le user ID standard)
  const user = req.headers['x-forwarded-preferred-username'] || req.headers['x-forwarded-user'] || 'anonymous';

  // 2. L'EMAIL
  const email = req.headers['x-forwarded-email'] || '';

  // 3. LES GROUPES (La pièce maitresse !)
  const groups = req.headers['x-forwarded-groups'] || '';

  console.log(`Données extraites -> User: ${user}, Groups: ${groups}`);

  res.json({ 
    message: 'protected resource', 
    user: user, 
    email: email, 
    groups: groups 
  });
});

/*
app.get('/', (req, res) => {
  console.log('--- DIAGNOSTIC FINAL ---');
  
  // 1. On récupère le header X-Forwarded-Access-Token
  const token = req.headers['x-forwarded-access-token'];
  
  let decodedToken = {};
  if (token) {
      try {
          // Décodage manuel du JWT (Partie Payload)
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          decodedToken = JSON.parse(jsonPayload);
          
          console.log("CONTENU DU TOKEN KEYCLOAK :");
          console.log("Email dans le token :", decodedToken.email);
          console.log("Email Verified ?", decodedToken.email_verified);
      } catch (e) {
          console.log("Erreur de décodage token", e);
      }
  } else {
      console.log("Aucun token reçu !");
  }

  // Tes variables habituelles
  const user = req.headers['x-forwarded-preferred-username'] || 'anonymous';
  const emailHeader = req.headers['x-forwarded-email'] || 'inconnu';
  const groups = req.headers['x-forwarded-groups'] || '';

  res.json({ 
    user, 
    emailHeader: emailHeader, 
    tokenEmail: decodedToken.email, // Ce que Keycloak envoie VRAIMENT
    groups 
  });
});
*/

app.get('/admin', (req, res) => {
  const groups = req.headers['x-forwarded-groups'] || '';
  const user = req.headers['x-forwarded-preferred-username'] || '';

  // C'est ici que ça va marcher car groups contient bien "police_admins"
  if (!groups.includes('police_admins') && !user.includes('admin')) {
    return res.status(403).json({ error: 'forbidden' });
  }
  res.json({ message: 'admin area' });
});

app.listen(5000, '0.0.0.0', () => console.log('backend running on 5000'));