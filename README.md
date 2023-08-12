## Baseline product and order management systemb API written in NodeJS and TypeScript.

use with node v20.4.0
if needed download nvm to be able to use the right version on node

● be able to create/update products with price and stock quantity.
● be able to create order with product and quantity.
● be able to update order with shipping information, e.g. tracking company, tracking number.
● be able to update order with status, e.g. processing, cancelled, delivered.
We care about:


```bash
# run migration from compiled code
npx typeorm migration:run -d compiled/app/db.js

# revert last migration from compiled code
npx typeorm migration:revert -d compiled/app/db.js

# create migration
npx typeorm migration:create app/migrations/CreateOrders
```
