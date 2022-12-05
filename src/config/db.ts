import * as mongoose from 'mongoose';
import CONFIG from './config';

mongoose.set('useCreateIndex', true);

const connectionStr = CONFIG.APP === 'staging' || CONFIG.APP == 'beta' || CONFIG.APP === 'production' ? `mongodb://${CONFIG.DB_USER}:${encodeURIComponent(CONFIG.DB_PASSWORD)}@${CONFIG.DB_HOST}?authSource=admin` : CONFIG.DB_HOST;
// Connecting to the database
export default (async () => {
  try {
    await mongoose.connect(
      connectionStr,
      { 
        useNewUrlParser: true,
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } 
      }
    );
    // listen for requests
    console.log('The Conection is Ok');
  } catch (err) {
    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();
