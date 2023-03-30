import { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";
import { OrderService, ProductService } from "./Service";

const Dashboard = () => {
  let userContext = useContext(UserContext);
  let [orders, setOrders] = useState([]);
  useEffect(() => {
    document.title = "Dashboard - eCommerce";

    (async () => {
      let orderResponse = await fetch(
        `http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
        { method: "GET" }
      );

      if (orderResponse.ok) {
        let orderResponseBody = await orderResponse.json();

        let productResponse = await ProductService.fetchProducts();

        if (productResponse.ok) {
          let productResponseBody = await productResponse.json();

          orderResponseBody.forEach((order) => {
            order.product = ProductService.getProductByProductId(
              productResponseBody,
              order.productId
            );
          });
          setOrders(orderResponseBody);
        }
      }
    })();
  }, [userContext.user.currentUserId]);

  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard"></i> Dashboard
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
              <Order key={ord.id} prod={ord} />
            ))}
          </div>
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-primary border-bottom">
              <i className="fa  fa-shopping-cart"></i> Cart{" "}
              <span className="badge badge-primary">
                {OrderService.getCart(orders).length}
              </span>
            </h4>
            {OrderService.getCart(orders).length === 0 ? (
              <div className="text-danger">No Products in Your Cart</div>
            ) : (
              ""
            )}
            {OrderService.getCart(orders).map((ord) => (
              <Order key={ord.id} prod={ord} />
            ))}
          </div>
        </div>
      </div>
      <h2>{userContext.user.currentUserName}</h2>
    </div>
  );
};

export default Dashboard;
