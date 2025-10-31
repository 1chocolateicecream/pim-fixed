function inStock(stock) {
  if (stock == 0) {
    return "Out of Stock";
  } else {
    return stock;
  }
}

function ProductItem({ product }) {
  return (
    <div>
      <h2>{product.product_name}</h2>
      <p>ID: {productid}</p>
      <p>Price: {product.productprice}</p>
      <p>Stock: {inStock(product.stock)}</p>
      <p>Total Value: {parseInt(product.product_price * product.stock)}</p>
    </div>
  );
}

export default ProductItem;