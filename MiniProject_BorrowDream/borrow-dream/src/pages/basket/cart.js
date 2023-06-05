import CartInfo from "./cartList";
import { useState, useEffect} from "react";
import CartApi from "../../api/cartApi";

export const Cart = ({ cart, setCart, convertPrice, checkedAll, setCheckedAll, checkedItems, setCheckedItems }) => {
  const [total, setTotal] = useState(0);
  const context = "dream1";

  const handleRemove = async (id) => {
    try {
      await CartApi.deleteCartItem(context, id);
      const newCart = cart.filter((item) => item.bk_pname !== id);
      setCart(newCart);
      console.log(cart);
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuantity = async (type, id) => {
    try {
      const cartItem = cart.find((item) => item.bk_pname === id);
      let newQuantity = cartItem.quantity;
      if (type === "minus") {
        newQuantity--;
      } else if (type === "plus") {
        newQuantity++;
      }
      await CartApi.updateQuantity(context, cartItem.bk_pname, newQuantity);
      const updatedCart = await CartApi.cartListGet(context);
      setCart(updatedCart.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const cartList = async () => {
      try {
        const response = await CartApi.cartListGet(context);
        setCart(response.data)
        console.log(context);
        console.log("장바구니 리스트");
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    cartList();
  }, [])
  return (
    <>
      <CartInfo 
      cart={cart}
      setCart={setCart}
      handleQuantity={handleQuantity}
      handleRemove={handleRemove}
      total={total} 
      setTotal={setTotal} 
      convertPrice={convertPrice}
      checkedAll={checkedAll} 
      setCheckedAll={setCheckedAll}
      checkedItems={checkedItems} 
      setCheckedItems={setCheckedItems}
      />
      </>
  );
};
