import mongoose from 'mongoose';
import config from './config';

mongoose.set('useCreateIndex', true);

const connectionStr = config.APP === 'staging' || config.APP == 'beta' || config.APP === 'production' ? `mongodb://${config.DB_USER}:${encodeURIComponent(config.DB_PASSWORD)}@${config.DB_HOST}?authSource=admin` : config.DB_HOST;
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