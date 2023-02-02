import app from './App';
import config from './config/config';
import './config/db';
import * as moment from 'moment-timezone';

const PORT = config.PORT;
const https = require('https');
const fs = require('fs');

const instance = require('../src/config/firebase.json');
import * as admin from 'firebase-admin';

moment.tz.setDefault('Asia/manila');

admin.initializeApp({
  credential: admin.credential.cert(instance),
  databaseURL: config.FIREBASE_DB_URL
});

if (config.APP === 'beta') {
  const httpsOptions = {
    cert: fs.readFileSync('/app/fullchain.pem'),
    key: fs.readFileSync('/app/fullchain.pem')
  }
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.info(`server started on port ${PORT} (${config.APP})`); // eslint-disable-line no-console
  });
} else {
  app.listen(PORT, err => {
    if (err) {
      return console.log(err);
    }

    console.log(`Server is listening on ${PORT}`);
  });
}
