import { expect } from "chai";

import { createProduct } from "models/product";

import { getOrders } from "models/order";
import { getAddresses } from "models/address";
import { getShipments } from "models/shipment";

import client from "../../../..";

import { orderParams } from "../../../../utils";

describe("POST /api/v1/products/:id/orders", () => {
  it("create an order given a product", async () => {
    const product = await createProduct({
      price: 10.49,
      quantity: 100,
      description: "cat litter",
    });

    const response = await client
      .post(`/api/v1/products/${product.id}/orders`)
      .send({
        ...orderParams,
        quantity: 10,
      });

    const { order: createdOrder } = response.body;
    console.log(response.body);
    expect(response.status).to.eq(201);
    expect(Object.keys(createdOrder)).to.have.members([
      "shipment",
      "order",
      "destintion_address",
      "origin_address",
    ]);

    const [destinationAddress, originAddress] = await getAddresses();
    const [shipment] = await getShipments();
    const [order] = await getOrders();

    expect(createdOrder).to.deep.eq({
      shipment: {
        order_id: 1,
        tracking_company: shipment.tracking_company,
        tracking_number: shipment.tracking_number,
        status: "processing",
        destination_address_id: destinationAddress.id,
        origin_address_id: originAddress.id,
        id: shipment.id,
      },
      order: {
        product_id: product.id,
        quantity: 10,
        id: order.id,
      },
      destintion_address: {
        ...orderParams.destination_address,
        id: destinationAddress.id,
      },
      origin_address: {
        ...orderParams.origin_address,
        id: originAddress.id,
      },
    });
  });

  it("when missing required data", async () => {
    const product = await createProduct({
      price: 10.49,
      quantity: 100,
      description: "cat litter",
    });

    const response = await client
      .post(`/api/v1/products/${product.id}/orders`)
      .send({});

    expect(response.status).to.eq(422);
    expect(response.body).to.deep.eq({
      errors: [{ message: '"quantity" is required' }],
      message: "Unprocessable Entity",
      code: "UNPROCESSABLE_ENTITY",
    });
  });

  it("product is out of stock", async () => {
    const product = await createProduct({
      price: 10.49,
      quantity: 1,
      description: "cat litter",
    });

    const response = await client
      .post(`/api/v1/products/${product.id}/orders`)
      .send({
        ...orderParams,
        quantity: 5,
      });

    expect(response.status).to.eq(422);
    expect(response.body).to.deep.eq({
      errors: [],
      message: `Product ${product.id} is out of stock`,
      code: "UNPROCESSABLE_ENTITY",
    });
  });
});
