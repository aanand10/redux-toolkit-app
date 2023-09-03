import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const items = useSelector((state) => state.cart);
  return (
    <div className="flex justify-between items-center">
      <span className="logo">REDUX STORE</span>
      <div className="flex gap-2 ">
        <Link className="navLink" to="/">
          Home
        </Link>
        <Link className="navLink" to="/cart">
          Cart
        </Link>
      </div>
      <span className="cartCount">cart items : {items.length}</span>
    </div>
  );
};

export default Navbar;
