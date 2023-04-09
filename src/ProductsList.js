import React, { useState, useEffect, useMemo } from "react";
import { CategoriesService, BrandsService, SortService } from "./Service";

const ProductsList = () => {
  let [search, setSearch] = useState("");
  let [products, setProducts] = useState([]);
  let [sortBy, setSortBy] = useState("productName");
  let [sortOrder, setSortOrder] = useState("ASC");
  let [originalProducts, setOriginalProducts] = useState([]);
  let [brands, setBrands] = useState([]);
  let [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    (async () => {
      //get Brands Data
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();
      setBrands(brandsResponseBody);

      //get Categories Data
      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();

      //get data from product Database
      let productsResponse = await fetch(
        `http://localhost:5000/products?productName_like=${search}&_sort=productName&_order=ASC `,
        { methods: "GET" }
      );
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
      setOriginalProducts(productsResponseBody);
    })();
  }, [search]);

  // Get filtered Brands Name
  let filteredProducts = useMemo(() => {
    return originalProducts.filter(
      (prod) => prod.brand.brandName.indexOf(selectedBrand) >= 0
    );
  }, [originalProducts, selectedBrand]);

  // When user clicks on Column Name to sort
  let onSortColumnNameClick = (event, columnName) => {
    event.preventDefault();
    setSortBy(columnName);
    let negatedSortOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(negatedSortOrder);
  };

  //Executes on each change of filteredBrands, sortBy or sortOrder
  useEffect(() => {
    setProducts(
      SortService.getSortedArray(filteredProducts, sortBy, sortOrder)
    );
  }, [filteredProducts, sortBy, sortOrder]);

  // render columnName
  let getColumnHeader = (columnName, displayName) => {
    return (
      <>
        <a
          href="/#"
          onClick={(event) => {
            onSortColumnNameClick(event, columnName);
          }}
        >
          {displayName}
        </a>{" "}
        {sortBy === columnName && sortOrder === "ASC" ? (
          <i className="fa fa-sort-up"></i>
        ) : (
          ""
        )}
        {sortBy === columnName && sortOrder === "DESC" ? (
          <i className="fa fa-sort-down"></i>
        ) : (
          ""
        )}
      </>
    );
  };

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
          <div className="col-lg-6">
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
          <div className="col-lg-3">
            <select
              className="form-control"
              value={selectedBrand}
              onChange={(event) => {
                setSelectedBrand(event.target.value);
              }}
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option value={brand.brandName} key={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="col-lg-10 mx-auto mb-2">
        <div className="card my-2 shadow">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>{getColumnHeader("productName", "Product Name")}</th>
                  <th>{getColumnHeader("price", "Price")}</th>
                  <th>{getColumnHeader("brand", "Brand")}</th>
                  <th>{getColumnHeader("category", "Category")}</th>
                  <th>{getColumnHeader("rating", "Rating")}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.productName}</td>
                    <td>{prod.price}</td>
                    <td>{prod.brand.brandName}</td>
                    <td>{prod.category.categoryName}</td>
                    <td>
                      {[...Array(prod.rating).keys()].map((n) => (
                        <i className="fa fa-star text-warning" key={n}></i>
                      ))}
                      {[...Array(5 - prod.rating).keys()].map((n) => (
                        <i className="fa fa-star-o text-warning" key={n}></i>
                      ))}
                    </td>
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
