import { useEffect, useContext, useState, useCallback } from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";
import { OrderService, ProductsService } from "./Service";

const Dashboard = () => {
  let userContext = useContext(UserContext);
  let [orders, setOrders] = useState([]);
  let [showOrderDeletedAlert, setShowOrderDeletedAlert] = useState(false);
  let [showOrderPlacedAlert, setShowOrderPlacedAlert] = useState(false);

  let loadDataFromDatabase = useCallback(async () => {
    //load data from database
    let ordersResponse = await fetch(
      `http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
      { method: "GET" }
    );

    if (ordersResponse.ok) {
      //status code is 200
      let ordersResponseBody = await ordersResponse.json();

      //get all data from products
      let productsResponse = await ProductsService.fetchProducts();
      if (productsResponse.ok) {
        let productsResponseBody = await productsResponse.json();

        //read all orders data
        ordersResponseBody.forEach((order) => {
          order.product = ProductsService.getProductByProductId(
            productsResponseBody,
            order.productId
          );
        });

        setOrders(ordersResponseBody);
      }
    }
  }, [userContext.user.currentUserId]);

  useEffect(() => {
    document.title = "Dashboard - eCommerce";

    loadDataFromDatabase();
  }, [userContext.user.currentUserId, loadDataFromDatabase]);

  // When user clicks on Buy Now Button
  let onBuyNowClick = useCallback(
    async (id, userId, productId, quantity) => {
      if (window.confirm("Do you want to place order ?")) {
        let updateOrder = {
          id: id,
          productId: productId,
          userId: userId,
          quantity: quantity,
          isPaymentCompleted: true,
        };

        let orderUpdateResponse = await fetch(
          `http://localhost:5000/orders/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(updateOrder),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        let orderUpdateResponseBody = await orderUpdateResponse.json();
        if (orderUpdateResponse.ok) {
          console.log(orderUpdateResponseBody);
          loadDataFromDatabase();
          setShowOrderPlacedAlert(true);
        }
      }
    },
    [loadDataFromDatabase]
  );

  // When user clicks on Delete button
  let onDeleteClick = useCallback(
    async (id) => {
      if (window.confirm("Do you want to remove from Cart ?")) {
        let orderDeleteResponse = await fetch(
          `http://localhost:5000/orders/${id}`,
          {
            method: "DELETE",
          }
        );
        let orderDeleteResponseBody = await orderDeleteResponse.json();
        if (orderDeleteResponse.ok) {
          console.log(orderDeleteResponseBody);
          setShowOrderDeletedAlert(true);
          loadDataFromDatabase();
        }
      }
    },
    [loadDataFromDatabase]
  );

  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard"></i> Dashboard{" "}
          <button
            className="btn btn-sm btn-info"
            onClick={loadDataFromDatabase}
          >
            <i className="fa fa-refresh"> </i> Refresh
          </button>
        </h4>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom">
              <i className="fa  fa-history"></i> Previous Orders{" "}
              <span className="badge badge-info">
                {OrderService.getPreviousOrders(orders).length}
              </span>
            </h4>
            {OrderService.getPreviousOrders(orders).length === 0 ? (
              <div className="text-danger">No Orders</div>
            ) : (
              ""
            )}
            {OrderService.getPreviousOrders(orders).map((ord) => (
              <Order
                key={ord.id}
                prod={ord}
                onBuyNowClick={onBuyNowClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-primary border-bottom">
              <i className="fa  fa-shopping-cart"></i> Cart{" "}
              <span className="badge badge-primary">
                {OrderService.getCart(orders).length}
              </span>
            </h4>

            {showOrderPlacedAlert ? (
              <div className="col-12">
                <div
                  className="alert alert-success alert-dismissible fade show mt-1"
                  role="alert"
                >
                  Your Order has been placed successfully
                  <button className="close" type="button" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}

            {showOrderDeletedAlert ? (
              <div className="col-12">
                <div
                  className="alert alert-danger alert-dismissible fade show mt-1"
                  role="alert"
                >
                  Your Order has been removed from cart
                  <button className="close" type="button" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {OrderService.getCart(orders).length === 0 ? (
              <div className="text-danger">No Products in Your Cart</div>
            ) : (
              ""
            )}
            {OrderService.getCart(orders).map((ord) => (
              <Order
                key={ord.id}
                prod={ord}
                onBuyNowClick={onBuyNowClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
