const Joi = require("joi");

const email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .required();

const name = Joi.string()
  .required()
  .min(3)
  .max(255)
  .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/);
const productypename = Joi.string()
  .required()
  .regex(/^[a-z]+(?:\s[a-z]+)?$/);
const address = name;
const description = name;

const role_id = Joi.string().valid("CUS", "SEL").required();
const owner_id = Joi.string().length(10).required();
const comment_id = Joi.number().min(0).required();
const store_type = Joi.string().required();

const password = Joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()+-/]{8,100}$")).required();
const product_id = Joi.number().min(0).required();
const product_array = Joi.array().min(0).required();
const account_id = Joi.string().length(10).required();

const product_type_id = Joi.string().length(10).required();
const store_id = Joi.string().length(10).required();
const status_id = Joi.string().required();

const order_id = Joi.string().length(10).required();
const comment = Joi.string().pattern(new RegExp("^[a-zA-Z_ ]{3,2000}$")).required();

const image = Joi.string().alphanum().required();
const star = Joi.number().required();
const type_id = Joi.string().alphanum().length(10).required();

const price = Joi.string().min(1).max(25).required();
const quantity = Joi.number().required();
const ship_fee = Joi.string().max(25).required();

const payment_method = Joi.string().alphanum().required();
const timestamp = Joi.string().required();
const out_of_stock = Joi.number().valid(0, 1).required();

const del_flag = Joi.number().valid(0, 1).required();
const date1 = Joi.date().raw();
const date2 = Joi.date().raw();

const page = Joi.number().min(1).required();
const size = Joi.number().valid(20, 50, 100).required();

////  Schemas zone //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const schemas = {
  registerAccount: Joi.object().keys({
    id: owner_id,
    role_id: role_id,
    name: name,
    email: email,
    password: password,
    repeatPassword: Joi.any().valid(Joi.ref("password")),
    timestamp: timestamp,
  }),

  loginAccount: Joi.object().keys({
    role_id: role_id,
    email: email,
    password: password,
  }),

  createComment: Joi.object().keys({
    account_id: account_id,
    store_id: store_id,
    order_id: order_id,
    comment: comment,
    //image: image,
    star: star,
  }),

  editComment: Joi.object().keys({
    account_id: account_id,
    comment: comment,
    store_id: store_id,
    order_id: order_id,
    //image: image,
    star: star,
  }),

  createProduct: Joi.object().keys({
    store_id: store_id,
    name: name,
    description: description,
    type_id: product_type_id,
    image: image,
    price: price,
  }),

  createProductType: Joi.object().keys({
    id: product_type_id,
    name: productypename,
    store_id: store_id,
  }),

  editProduct: Joi.object().keys({
    id: product_id,
    store_id: store_id,
    name: name,
    description: description,
    type_id: type_id,
    image: image,
    price: price,
  }),

  editProductType: Joi.object().keys({
    id: type_id,
    store_id: store_id,
    name: name,
  }),

  proceedOrderWithStore: Joi.object().keys({
    order_id: order_id,
    product_id: product_id,
    store_id: store_id,
  }),

  createOrder: Joi.object().keys({
    order_id: order_id,
    account_id: account_id,
    order_detail: Joi.array().items(
      Joi.object().keys({
        product_id: product_id,
        store_id: store_id,
        price: Joi.string().required(),
        quantity: quantity,
      })
    ),
    address: address,
    product_count: Joi.number().required(),
    payment_method: payment_method,
    ship_fee: ship_fee,
    timestamp: timestamp,
  }),

  profitPerDay: Joi.object().keys({
    store_id: store_id,
    limit: Joi.number().required(),
  }),

  changeOrderStatus: Joi.object().keys({
    order_id: order_id,
    account_id: account_id,
    status_id: status_id,
  }),

  createStore: Joi.object().keys({
    id: store_id,
    owner_id: owner_id,
    name: name,
    address: address,
    description: description,
    image: image,
    type_id: store_type,
    timestamp: timestamp,
  }),

  editStore: Joi.object().keys({
    id: store_id,
    owner_id: owner_id,
    name: name,
    address: address,
    description: description,
    type_id: type_id,
    timestamp: timestamp,
  }),
  userId: Joi.object().keys({
    userId: owner_id,
  }),
  storeId: Joi.object().keys({
    storeId: store_id,
  }),

  pendingStatusChange: Joi.object().keys({
    order_id: order_id,
    account_id: account_id,
  }),

  product_id: Joi.object().keys({
    product_id: product_id,
  }),
  type_id: Joi.object().keys({
    type_id: type_id,
  }),
  getStoreOrders: Joi.object().keys({
    store_id: store_id,
    //status_id: status_id,
    page: page,
    size: size,
  }),
  getAccountOrders: Joi.object().keys({
    user_id: owner_id,
    status_id: status_id,
    page: page,
    size: size,
  }),
  OrderId: Joi.object().keys({
    order_id: order_id,
  }),
};

module.exports = schemas;
