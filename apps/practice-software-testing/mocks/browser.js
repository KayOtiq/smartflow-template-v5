'use strict';
var mswMocks = (() => {
  var __require = /* @__PURE__ */ ((x) =>
    typeof require !== 'undefined'
      ? require
      : typeof Proxy !== 'undefined'
        ? new Proxy(x, {
            get: (a, b) => (typeof require !== 'undefined' ? require : a)[b],
          })
        : x)(function (x) {
    if (typeof require !== 'undefined') return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // browser.ts
  var import_browser = __require('msw/browser');

  // handlers.ts
  var import_msw = __require('msw');
  var handlers = [
    // Example: Mock a GET request to a 3rd party API
    import_msw.rest.get('https://api.thirdparty.com/user/:userId', (req, res, ctx) => {
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
    import_msw.rest.post('https://api.thirdparty.com/order', (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ orderId: 'mocked-order-123', status: 'created' }));
    }),
  ];

  // browser.ts
  window.worker = (0, import_browser.setupWorker)(...handlers);
})();
