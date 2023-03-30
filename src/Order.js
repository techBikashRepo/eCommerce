const Order = ({ prod }) => {
  console.log(prod);
  return (
    <div className="card my-2 shadow">
      <div className="card-body">
        <h6>
          <i className="fa fa-arrow-right"></i> {prod.product.productName}
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

export default Order;
