("use strict");
require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_TOKEN);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.title,
                description: item.desc
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity,
          };
        })
      );

      let order_id = 1

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ['US', 'CA'] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success/{CHECKOUT_SESSION_ID}/${order_id}`,
        cancel_url: process.env.CLIENT_URL + "?success=false",
        line_items: lineItems,
      });

      const order = await strapi.service("api::order.order").create({ data: { products, stripeId: session.id, status: 'unpaid' } });

      order_id = order.id;

      return { stripeSession: session.id, orderId: order_id  };
    } catch (error) {
      ctx.response = error;
      return { error };
    }
  },
  async custom(ctx) {
    const { session_id, orderId } = ctx.request.body;

    try {
      const stripeId = session_id;
      console.log('Received session_id:', stripeId);

      // Find the order with the matching stripeId
      const order = await strapi.services.order.findOne({ orderId });
      console.log('Found order:', order);

      if (!order) {
        // Order not found
        ctx.response.status = 404;
        ctx.body = { error: 'Order not found' };
        return;
      }

      // Update the order using its Strapi id
      const updatedOrder = await strapi.services.order.update({ id: order.id }, { status: 'paid' });
      console.log('Updated order:', updatedOrder);

      // Return the updated order
      ctx.body = updatedOrder;
    } catch (error) {
      console.error('Error:', error);
      ctx.body = error;
    }
  },


}));

