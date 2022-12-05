import app from './App';
import CONFIG from './config/config';
import './config/db';
import * as moment from 'moment-timezone';

const PORT = CONFIG.PORT;
const https = require('https');
const fs = require('fs');

const instance = require('../src/config/firebase.json');
import * as admin from 'firebase-admin';

moment.tz.setDefault('Asia/manila');

admin.initializeApp({
  credential: admin.credential.cert(instance),
  databaseURL: CONFIG.FIREBASE_DB_URL
});

if (CONFIG.APP === 'beta') {
  const httpsOptions = {
    cert: fs.readFileSync('/home/ctodev/ssl/fullchain.pem'),
    key: fs.readFileSync('/home/ctodev/ssl/privkey.pem')
  }
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.info(`server started on port ${PORT} (${CONFIG.APP})`); // eslint-disable-line no-console
  });
} else {
  app.listen(PORT, err => {
    if (err) {
      return console.log(err);
    }

    console.log(`Server is listening on ${PORT}`);
  });
}
