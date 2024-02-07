const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function productExists(req, res, next) {
  // productsService
  //   .read(req.params.productId)
  //   .then((product) => {
  //     if (product) {
  //       res.locals.product = product;
  //       return next();
  //     }
  //     next({ status: 404, message: `Product cannot be found.` });
  //   })
  //   .catch(next);
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

async function count(req, res, next) {
  const data = await productsService.count();
  console.log(data);
  console.log(data[0].count);
  res.json({ data: data });
}

async function listSupplierProductsAvgWeight(req, res, next) {
  const data = await productsService.listSupplierProductsAvgWeight();
  data.map((item) => item.avg = Number(item.avg));
  console.log(data);
  res.json({ data: data });
}

async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

async function listPriceSummary(req, res, next) {
  res.json({ data: await productsService.listPriceSummary() });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: [asyncErrorBoundary(list)],
  count: [asyncErrorBoundary(count)],
  listSupplierProductsAvgWeight: [asyncErrorBoundary(listSupplierProductsAvgWeight)],
  listOutOfStockCount: [asyncErrorBoundary(listOutOfStockCount)],
  listPriceSummary: [asyncErrorBoundary(listPriceSummary)],
  listTotalWeightByProduct: [asyncErrorBoundary(listTotalWeightByProduct)],
};
