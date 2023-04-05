import React, { useState, useEffect } from "react";
import { ProductsService, CategoriesService, BrandsService } from "./Service";

const ProductsList = () => {
  let [search, setSearch] = useState("");
  let [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      //get Brands Data
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();

      //get Categories Data
      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();

      let productsResponse = await ProductsService.fetchProducts();
      let productsResponseBody = await productsResponse.json();

      // Set Category property in each product
      productsResponseBody.forEach((product) => {
        product.category = CategoriesService.getCategoryByCategoryId(
          categoriesResponseBody,
          product.categoryId
        );
      });

      // Set Brand property in each product
      productsResponseBody.forEach((product) => {
        product.brand = BrandsService.getBrandByBrandId(
          brandsResponseBody,
          product.brandId
        );
      });

      setProducts(productsResponseBody);
      console.log(products);
    })();
  }, []);
  return (
    <div className="row">
      <div className="col-12">
        <div className="row p-3 header">
          <div className="col-lg-3">
            <h4>
              <i className="fa fa-suitcase"></i>
              &nbsp; Products &nbsp;
              <span className="badge badge-secondary">{products.length}</span>
            </h4>
          </div>
          <div className="col-lg-9">
            <input
              type="search"
              placeholder="Search"
              className="form-control"
              autoFocus="autofocus"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-10 mx-auto mb-2">
        <div className="card my-2 shadow">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.productName}</td>
                    <td>{prod.price}</td>
                    <td>{prod.brand.brandName}</td>
                    <td>{prod.category.categoryName}</td>
                    <td>{prod.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
