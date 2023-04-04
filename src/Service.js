export const OrderService = {
  getPreviousOrders: (orders) => {
    return orders.filter((ord) => ord.isPaymentCompleted === true);
  },
  getCart: (orders) => {
    return orders.filter((ord) => ord.isPaymentCompleted === false);
  },
};

export const ProductService = {
  getProductByProductId: (products, productId) => {
    return products.find((prod) => prod.id === productId);
  },

  fetchProducts: () => {
    return fetch(`http://localhost:5000/products`, {
      method: "Get",
    });
  },
};

export const BrandService = {
  fetchBrands: () => {
    return fetch("http://localhost:5000/brands", {
      method: "GET",
    });
  },
  getBrandByBrandId: (brands, brandId) => {
    return brands.find((brand) => (brand.id = brandId));
  },
};

export const CategoryService = {
  fetchCategories: () => {
    return fetch(`http://localhost:5000/categories`, {
      method: "GET",
    });
  },
  getCategoryByCategoryId: (categories, categoryId) => {
    return categories.find((category) => (category.id = categoryId));
  },
};
