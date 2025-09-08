import { rest } from 'msw';

export const handlers = [
  // Example: Mock a GET request to a 3rd party API
  rest.get('https://api.thirdparty.com/user/:userId', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: req.params.userId,
        name: 'Mocked User',
        email: 'mocked@example.com',
      }),
    );
  }),

  // Example: Mock a POST request
  rest.post('https://api.thirdparty.com/order', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ orderId: 'mocked-order-123', status: 'created' }));
  }),
];
