import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://mobile-pwa-usr:mobile-pwa-pwd@cluster0.kchkesv.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('✅ Successfully connected to the database'))
  .catch((e) => console.log(`⛔️ Error during database connection ${e}`));
