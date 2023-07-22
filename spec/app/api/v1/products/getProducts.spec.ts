import { expect } from "chai";
import { createProduct } from "../../../../../app/models/product";
import client from "../../../..";

describe("GET /api/v1/products", () => {
  it("get all products", async () => {
    await createProduct({
      price: 10.49,
      quantity: 5,
      description: "cat litter",
    });

    const response = await client.get("/api/v1/products");
    const { products } = response.body;

    const [firstProduct] = products;

    expect(response.status).to.eq(200);

    expect(products).to.have.lengthOf(1);

    expect(Object.keys(firstProduct)).to.have.members([
      "id",
      "price",
      "description",
      "quantity",
    ]);

    expect(firstProduct.quantity).to.eq(5);
    expect(firstProduct.description).to.eq("cat litter");
    expect(firstProduct.price).to.eq(10.49);
  });
});
