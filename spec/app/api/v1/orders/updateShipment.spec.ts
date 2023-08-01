import { expect } from "chai";
import { createProduct } from "../../../../../app/models/product";
import client from "../../../..";
import { createOrder } from "../../../../../app/models/order";

import { orderParams } from "../../../../utils";

describe("PATCH /api/v1/orders/:id/shipments", () => {
  it("updates shipment information", async () => {
    const product = await createProduct({
      price: 10.49,
      quantity: 100,
      description: "cat litter",
    });

    const { order } = await createOrder({
      ...orderParams,
      product_id: product.id,
      tracking_number: "trk",
      tracking_company: "trk company",
      status: "pending",
    });

    const response = await client
      .patch(`/api/v1/orders/${order.id}/shipments`)
      .send({
        tracking_company: "trk_updated",
        tracking_number: "USPS",
        status: "fulfilled",
      });

    expect(response.status).to.eq(200);
    expect(response.body.shipment).to.deep.eq({
      order_id: order.id,
      tracking_company: "trk_updated",
      tracking_number: "USPS",
      status: "fulfilled",
      destination_address_id: response.body.shipment.destination_address_id,
      origin_address_id: response.body.shipment.origin_address_id,
      id: response.body.shipment.id,
    });
  });

  it("missing required fields", async () => {
    const product = await createProduct({
      price: 10.49,
      quantity: 100,
      description: "cat litter",
    });

    const { order } = await createOrder({
      ...orderParams,
      product_id: product.id,
      tracking_number: "trk",
      tracking_company: "trk company",
      status: "pending",
    });

    const response = await client
      .patch(`/api/v1/orders/${order.id}/shipments`)
      .send({
        // tracking_company: 'trk_updated',
        tracking_number: "USPS",
        status: "fulfilled",
      });

    expect(response.status).to.eq(422);
    expect(response.body).to.deep.eq({
      errors: [{ message: '"tracking_company" is required' }],
      message: "Unprocessable Entity",
      code: "UNPROCESSABLE_ENTITY",
    });
  });

  it("order does not exists", async () => {
    const response = await client.patch(`/api/v1/orders/100/shipments`).send({
      tracking_company: "trk_updated",
      tracking_number: "USPS",
      status: "fulfilled",
    });

    expect(response.status).to.eq(404);
    console.log(response.body);
    expect(response.body).to.deep.eq({
      errors: [],
      message: "Order Not found",
      code: "NOT_FOUND",
    });
  });
});
