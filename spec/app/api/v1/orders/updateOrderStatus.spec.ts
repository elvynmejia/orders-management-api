import { expect } from "chai";
import { createProduct } from "../../../../../app/models/product";
import client from "../../../..";
import { createOrder } from "../../../../../app/models/order";

import { orderParams } from "../../../../utils";

describe("PATCH /api/v1/orders/:id/update_status", () => {
  it("updates order status", async () => {
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
      .patch(`/api/v1/orders/${order.id}/update_status`)
      .send({
        status: "cancelled",
      });

    expect(response.status).to.eq(200);
    expect(response.body.order).to.deep.eq({
      id: order.id,
      product_id: order.product_id,
      quantity: order.quantity,
      status: "cancelled",
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
      status: "processing",
    });

    const response = await client
      .patch(`/api/v1/orders/${order.id}/update_status`)
      .send({
        // status: "fulfilled",
      });

    expect(response.status).to.eq(422);
    expect(response.body).to.deep.eq({
      errors: [{ message: '"status" is required' }],
      message: "Unprocessable Entity",
      code: "UNPROCESSABLE_ENTITY",
    });
  });

  it("invalid status", async () => {
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
      status: "processing",
    });

    const response = await client
      .patch(`/api/v1/orders/${order.id}/update_status`)
      .send({
        status: "fulfilled",
      });

    expect(response.status).to.eq(422);
    expect(response.body).to.deep.eq({
      errors: [
        {
          message: '"status" must be one of [processing, cancelled, delivered]',
        },
      ],
      message: "Unprocessable Entity",
      code: "UNPROCESSABLE_ENTITY",
    });
  });

  it("order does not exists", async () => {
    const response = await client
      .patch("/api/v1/orders/100/update_status")
      .send({
        status: "delivered",
      });

    expect(response.status).to.eq(404);
    expect(response.body).to.deep.eq({
      errors: [],
      message: "Order Not found",
      code: "NOT_FOUND",
    });
  });
});
