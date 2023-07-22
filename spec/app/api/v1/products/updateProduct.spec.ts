import { expect } from 'chai';
import { createProduct } from '../../../../../app/models/product';
import client from '../../../..';

describe('PATCH /api/v1/products/:id', () => {
  it('update product price and quantity', async () => {
    
    const product = await createProduct({
      price: 10.49,
      quantity: 5,
      description: 'cat litter'
    });

    const response = await client
      .patch(`/api/v1/products/${product.id}`)
      .send({
        price: 10.45,
        quantity: 100
      });

    const { product: updatedProduct } = response.body;

    expect(response.status).to.eq(200);
        
    expect(
      Object.keys(updatedProduct)
    ).to.have.members(['id', 'price', 'description', 'quantity']);

    expect(updatedProduct.quantity).to.eq(100);
    expect(updatedProduct.description).to.eq('cat litter');
    expect(updatedProduct.price).to.eq(10.45);
  });

  it('product to update not found', async () => {
    const response = await client
      .patch('/api/v1/products/100')
      .send({
        price: 10.45,
        quantity: 100
      });
      
    expect(response.status).to.eq(404);
    expect(response.body).to.deep.eq({
      code: 'NOT_FOUND',
      errors: [],
      message: 'Product Not found',
    });
  });
});