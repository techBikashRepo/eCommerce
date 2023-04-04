import React from "react";
const Order = ({ prod, onBuyNowClick, onDeleteClick }) => {
  return (
    <div className="card my-2 shadow">
      <div className="card-body">
        <h6>
          <i className="fa fa-arrow-right"></i> {prod.product.productName}
          {prod.isPaymentCompleted === false ? (
            <div className="float-right">
              <button
                className="btn btn-sm btn-info mr-2"
                onClick={() => {
                  onBuyNowClick(
                    prod.id,
                    prod.userId,
                    prod.productId,
                    prod.quantity
                  );
                }}
              >
                <i className="fa fa-truck"></i> Buy Now
              </button>
              <button
                className="btn btn-sm btn-danger mr-2"
                onClick={() => {
                  onDeleteClick(prod.id);
                }}
              >
                <i className="fa fa-trash-o"></i> Delete
              </button>
            </div>
          ) : (
            ""
          )}
        </h6>
        <table className="table table-sm table-borderless mt-1">
          <tbody>
            <tr>
              <td style={{ width: "100px" }}>Quantity</td>
              <td>{prod.quantity}</td>
            </tr>
            <tr>
              <td style={{ width: "100px" }}>Price</td>
              <td>$ {prod.product.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(Order);
