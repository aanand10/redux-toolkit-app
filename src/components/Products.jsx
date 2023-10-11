import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";
import ErrorPage from "../pages/Error";
const Products = () => {
  const dispatch = useDispatch();
  //   const [products, setProducts] = useState([]);
  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
    // const fetchProducts = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products");
    //   const data = await res.json();
    //   setProducts(data);
    // };
    // fetchProducts();
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading ....</h2>;
  }
  if (status === STATUSES.ERROR) {
    return <ErrorPage />;
  }

  return (
    <div className="productsWrapper">
      {products?.map((product) => (
        <div
          className="bg-white border  rounded-lg flex items-center justify-between flex-col p-4"
          key={product._id}
        >
          <img src={product.image} alt="" srcset="" />
          <h4 className="w-[70%] text-center"> {product.title}</h4>
          <h5 className=" font-semibold">{product.price} $</h5>
          <button
            className="btn"
            onClick={() => {
              handleAdd(product);
            }}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
