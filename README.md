use with node v20.4.0
if needed download nvm to be able to use the right version on node

```bash
# run migration from compiled code
npx typeorm migration:run -d compiled/app/db.js

# revert last migration from compiled code
npx typeorm migration:revert -d compiled/app/db.js

# create migration
npx typeorm migration:create app/migrations/CreateOrders
```
