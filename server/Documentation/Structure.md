ecommerce-server/
│
├── src/
│   │
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   ├── database.js
│   │   ├── env.js
│   │   ├── logger.js
│   │   ├── cors.js
│   │   ├── helmet.js
│   │   ├── multer.js
│   │   ├── cloudinary.js
│   │   ├── redis.js
│   │   ├── stripe.js
│   │   ├── razorpay.js
│   │   ├── nodemailer.js
│   │   └── socket.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── admin.routes.js
│   │   ├── user.routes.js
│   │   └── api.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── admin.middleware.js
│   │   ├── seller.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── upload.middleware.js
│   │   ├── rateLimiter.middleware.js
│   │   ├── error.middleware.js
│   │   ├── logger.middleware.js
│   │   ├── csrf.middleware.js
│   │   └── notFound.middleware.js
│   │
│   ├── constants/
│   │   ├── roles.js
│   │   ├── permissions.js
│   │   ├── orderStatus.js
│   │   ├── paymentStatus.js
│   │   ├── shippingStatus.js
│   │   ├── couponType.js
│   │   ├── responseMessages.js
│   │   └── httpStatus.js
│   │
│   ├── helpers/
│   │   ├── jwt.js
│   │   ├── bcrypt.js
│   │   ├── slug.js
│   │   ├── pagination.js
│   │   ├── filter.js
│   │   ├── upload.js
│   │   ├── formatter.js
│   │   ├── currency.js
│   │   ├── validator.js
│   │   └── response.js
│   │
│   ├── services/
│   │   ├── email.service.js
│   │   ├── sms.service.js
│   │   ├── notification.service.js
│   │   ├── cloudinary.service.js
│   │   ├── stripe.service.js
│   │   ├── razorpay.service.js
│   │   ├── redis.service.js
│   │   ├── search.service.js
│   │   └── analytics.service.js
│   │
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   ├── indexes/
│   │   └── backup/
│   │
│   ├── events/
│   │   ├── order.events.js
│   │   ├── payment.events.js
│   │   ├── user.events.js
│   │   └── inventory.events.js
│   │
│   ├── jobs/
│   │   ├── abandonedCart.job.js
│   │   ├── inventory.job.js
│   │   ├── orderCleanup.job.js
│   │   ├── couponExpiry.job.js
│   │   └── analytics.job.js
│   │
│   ├── sockets/
│   │   ├── chat.socket.js
│   │   ├── notification.socket.js
│   │   └── order.socket.js
│   │
│   ├── templates/
│   │   ├── emails/
│   │   ├── invoices/
│   │   └── sms/
│   │
│   ├── docs/
│   │   ├── swagger.json
│   │   └── openapi.yaml
│   │
│   ├── modules/
│   │
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.repository.js
│   │   │   ├── auth.model.js
│   │   │   ├── auth.validation.js
│   │   │   ├── auth.middleware.js
│   │   │   ├── auth.constants.js
│   │   │   └── auth.utils.js
│   │   │
│   │   ├── users/
│   │   │   ├── user.routes.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.repository.js
│   │   │   ├── user.model.js
│   │   │   ├── user.validation.js
│   │   │   ├── profile.controller.js
│   │   │   ├── address.controller.js
│   │   │   └── wishlist.controller.js
│   │   │
│   │   ├── admins/
│   │   │   ├── admin.routes.js
│   │   │   ├── admin.controller.js
│   │   │   ├── admin.service.js
│   │   │   ├── admin.repository.js
│   │   │   ├── admin.model.js
│   │   │   └── admin.validation.js
│   │   │
│   │   ├── sellers/
│   │   │   ├── seller.routes.js
│   │   │   ├── seller.controller.js
│   │   │   ├── seller.service.js
│   │   │   ├── seller.repository.js
│   │   │   ├── seller.model.js
│   │   │   └── seller.validation.js
│   │   │
│   │   ├── categories/
│   │   │   ├── category.routes.js
│   │   │   ├── category.controller.js
│   │   │   ├── category.service.js
│   │   │   ├── category.repository.js
│   │   │   ├── category.model.js
│   │   │   └── category.validation.js
│   │   │
│   │   ├── brands/
│   │   │   ├── brand.routes.js
│   │   │   ├── brand.controller.js
│   │   │   ├── brand.service.js
│   │   │   ├── brand.repository.js
│   │   │   ├── brand.model.js
│   │   │   └── brand.validation.js
│   │   │
│   │   ├── products/
│   │   │   ├── product.routes.js
│   │   │   ├── product.controller.js
│   │   │   ├── product.service.js
│   │   │   ├── product.repository.js
│   │   │   ├── product.model.js
│   │   │   ├── product.validation.js
│   │   │   ├── product.images.js
│   │   │   ├── product.review.js
│   │   │   ├── product.rating.js
│   │   │   ├── product.variant.js
│   │   │   ├── product.inventory.js
│   │   │   └── product.search.js
│   │   │
│   │   ├── inventory/
│   │   │   ├── inventory.routes.js
│   │   │   ├── inventory.controller.js
│   │   │   ├── inventory.service.js
│   │   │   ├── inventory.repository.js
│   │   │   ├── inventory.model.js
│   │   │   └── inventory.validation.js
│   │   │
│   │   ├── cart/
│   │   │   ├── cart.routes.js
│   │   │   ├── cart.controller.js
│   │   │   ├── cart.service.js
│   │   │   ├── cart.repository.js
│   │   │   ├── cart.model.js
│   │   │   └── cart.validation.js
│   │   │
│   │   ├── wishlist/
│   │   │   ├── wishlist.routes.js
│   │   │   ├── wishlist.controller.js
│   │   │   ├── wishlist.service.js
│   │   │   ├── wishlist.repository.js
│   │   │   └── wishlist.model.js
│   │   │
│   │   ├── coupons/
│   │   │   ├── coupon.routes.js
│   │   │   ├── coupon.controller.js
│   │   │   ├── coupon.service.js
│   │   │   ├── coupon.repository.js
│   │   │   ├── coupon.model.js
│   │   │   └── coupon.validation.js
│   │   │
│   │   ├── orders/
│   │   │   ├── order.routes.js
│   │   │   ├── order.controller.js
│   │   │   ├── order.service.js
│   │   │   ├── order.repository.js
│   │   │   ├── order.model.js
│   │   │   ├── order.validation.js
│   │   │   ├── invoice.js
│   │   │   └── tracking.js
│   │   │
│   │   ├── payments/
│   │   │   ├── payment.routes.js
│   │   │   ├── payment.controller.js
│   │   │   ├── payment.service.js
│   │   │   ├── payment.repository.js
│   │   │   ├── payment.model.js
│   │   │   ├── stripe.js
│   │   │   ├── razorpay.js
│   │   │   └── webhook.js
│   │   │
│   │   ├── shipping/
│   │   │   ├── shipping.routes.js
│   │   │   ├── shipping.controller.js
│   │   │   ├── shipping.service.js
│   │   │   ├── shipping.repository.js
│   │   │   ├── shipping.model.js
│   │   │   └── shipping.validation.js
│   │   │
│   │   ├── reviews/
│   │   │   ├── review.routes.js
│   │   │   ├── review.controller.js
│   │   │   ├── review.service.js
│   │   │   ├── review.repository.js
│   │   │   ├── review.model.js
│   │   │   └── review.validation.js
│   │   │
│   │   ├── notifications/
│   │   │   ├── notification.routes.js
│   │   │   ├── notification.controller.js
│   │   │   ├── notification.service.js
│   │   │   ├── notification.repository.js
│   │   │   └── notification.model.js
│   │   │
│   │   ├── search/
│   │   │   ├── search.routes.js
│   │   │   ├── search.controller.js
│   │   │   ├── search.service.js
│   │   │   └── elasticsearch.js
│   │   │
│   │   ├── analytics/
│   │   │   ├── analytics.controller.js
│   │   │   ├── analytics.service.js
│   │   │   └── analytics.repository.js
│   │   │
│   │   ├── dashboard/
│   │   │   ├── dashboard.controller.js
│   │   │   └── dashboard.service.js
│   │   │
│   │   ├── chat/
│   │   │   ├── chat.routes.js
│   │   │   ├── chat.controller.js
│   │   │   ├── chat.service.js
│   │   │   ├── chat.model.js
│   │   │   └── chat.socket.js
│   │   │
│   │   └── reports/
│   │       ├── report.controller.js
│   │       ├── report.service.js
│   │       └── report.repository.js
│   │
│   ├── uploads/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── users/
│   │   └── temp/
│   │
│   └── utils/
│       ├── ApiError.js
│       ├── ApiResponse.js
│       ├── asyncHandler.js
│       ├── logger.js
│       └── generateInvoice.js
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
│
├── logs/
│
├── public/
│
├── .env
├── .env.development
├── .env.production
├── .gitignore
├── package.json
└── README.md