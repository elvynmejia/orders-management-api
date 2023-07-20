import { expect } from 'chai';
import client from '../../../..';

describe('POST /api/v1/products', () => {
  it('create a product', async () => {
    const response = await client
      .post('/api/v1/products')
      .send({
        price: 10.49,
        quantity: 5,
        description: 'A massage gun for cats'
      });
    
    expect(response.status).to.eq(201);
    const { product } = response.body;
    const { price, quantity, description } = product;
    
    expect(
      Object.keys(product)
    ).to.have.members(['id', 'price', 'description', 'quantity']);

    expect(quantity).to.eq(5);
    expect(description).to.eq('A massage gun for cats');
    expect(price).to.eq(10.49);
  });
});