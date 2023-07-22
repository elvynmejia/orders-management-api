import { expect } from 'chai';
import { createProduct } from '../../../../../app/models/product';
import client from '../../../..';

describe('POST /api/v1/products/:id/order', () => {
  it('create an order given a product', async () => {
    const product = await createProduct({
      price: 10.49,
      quantity: 100,
      description: 'cat litter'
    });

    const response = await client
      .post(`/api/v1/products/${product.id}/order`)
      .send({ quantity: 10 });

    const { order } = response.body;

    expect(response.status).to.eq(201);

    expect(order.product_id).to.eq(product.id);
    expect(order.quantity).to.eq(10);
    expect(
      Object.keys(order)
    ).to.have.members(['id', 'product_id', 'quantity']);
  });

  it('when missing required data', async () => {
    const product = await createProduct({
      price: 10.49,
      quantity: 100,
      description: 'cat litter'
    });

    const response = await client
      .post(`/api/v1/products/${product.id}/order`)
      .send({ });
    
    expect(response.status).to.eq(422);
    expect(response.body).to.deep.eq({
      errors: [ { message: '"quantity" is required' } ],
      message: 'Unprocessable Entity',
      code: 'UNPROCESSABLE_ENTITY'
    });
  });
});