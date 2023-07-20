import db from '../app/db';

before(async () => {
    await db.initialize();
});
  
afterEach(async () => {
    await db.synchronize(true);
});