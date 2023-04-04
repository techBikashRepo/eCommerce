import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { BrandService, CategoryService, ProductService } from "./Service";

const Store = () => {
  let userContext = useContext(UserContext);
  //   let userName = userContext.user.currentUserName;
  let [brands, setBrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      //get brand from database
      let brandsResponse = await BrandService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();
      brandsResponseBody.forEach((brand) => {
        brand.isChecked = true;
      });
      setBrands(brandsResponseBody);

      //get caterogies from database
      let categoriesResponse = await CategoryService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();
      categoriesResponseBody.forEach((category) => {
        category.isChecked = true;
      });
      setCategories(categoriesResponseBody);

      // Get Products from Database
      let productsResponse = await ProductService.fetchProducts();
      let productsResponseBody = await productsResponse.json();
      if (productsResponse.ok) {
        productsResponseBody.forEach((product) => {
          // Set Brand
          product.brand = BrandService.getBrandByBrandId(
            brands,
            product.brandId
          );
          product.isOrdered = false;
        });
      }
      setProducts(productsResponseBody);
    })();
  }, []);

  // Update BrandsIsChecked
  let updateBrandIsChecked = (id) => {
    let brandsData = brands.map((brd) => {
      if (brd.id === id) brd.isChecked = !brd.isChecked;
      return brd;
    });
    setBrands(brandsData);
  };

  // Update CategoriesIsChecked
  let updateCategoryIsChecked = (id) => {
    let categoryData = categories.map((cat) => {
      if (cat.id === id) cat.isChecked = !cat.isChecked;
      return cat;
    });
    setCategories(categoryData);
  };

  return (
    <div>
      <div className="row py-3 header">
        <div className="col-lg-3">
          <h4>
            <i className="fa fa-shopping-bag"></i> Store
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 py-2">
          <div className="my-2">
            <h5>Brands</h5>
            <ul className="list-group list-group-flush">
              {brands.map((brand) => (
                <li className="list-group-item" key={brand.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="true"
                      checked={brand.isChecked}
                      onChange={() => {
                        updateBrandIsChecked(brand.id);
                      }}
                      id={`brand${brand.id}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`brand${brand.id}`}
                    >
                      {brand.brandName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-2">
            <h5>Categories</h5>
            <ul className="list-group list-group-flush">
              {categories.map((category) => (
                <li className="list-group-item" key={category.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="true"
                      checked={category.isChecked}
                      onChange={() => {
                        updateCategoryIsChecked(category.id);
                      }}
                      id={`brand${category.id}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`brand${category.id}`}
                    >
                      {category.categoryName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-9">
          <div>{JSON.stringify(brands)}</div>
          <div>{JSON.stringify(categories)}</div>
          <div>{JSON.stringify(products)}</div>
        </div>
      </div>
    </div>
  );
};

export default Store;
