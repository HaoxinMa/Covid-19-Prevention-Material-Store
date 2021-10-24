import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "common/axios";

const CartItem = (props) => {
  const [amount, setAmount] = useState(props.cart.amount);
  const { id, name, image, price } = props.cart || {};

  // when the num of merchandise changes
  const handleChange = async (event) => {
    const amount = parseInt(event.target.value);
    setAmount(amount);
    const newCart = {
      ...props.cart,
      amount,
    };
    await axios.put(`/carts/${id}`, newCart);
    props.updateCart(newCart);
  };

  const deleteCart = async () => {
    await axios.delete(`/carts/${id}`);
    props.deleteCart(props.cart);
    toast.warn("Delete Item!");
  };

  // useMemo to listen the price change
  const totalPrice = useMemo(() => {
    return price * amount;
  }, [price, amount]);

  return (
    <div className="columns is-vcentered">
      <div className="column is-narrow" onClick={deleteCart}>
        <span className="close">
          <i className="far fa-times-circle"></i>
        </span>
      </div>
      {/* image */}
      <div className="column is-narrow">
        <img src={image} alt={name} width="100" />
      </div>
      {/* name */}
      <div className="column cart-name is-narrow">{name}</div>
      {/* price */}
      <div className="column">
        <span className="price">$ {price}</span>
      </div>
      {/* ammount */}
      <div className="column">
        <input
          type="number"
          className="input num-input"
          min={1}
          value={amount}
          onChange={handleChange}
        />
      </div>
      {/* total price */}
      <div className="column">
        <span className="sum-price">$ {parseFloat(totalPrice.toFixed(5))}</span>
      </div>
    </div>
  );
};

export default CartItem;
