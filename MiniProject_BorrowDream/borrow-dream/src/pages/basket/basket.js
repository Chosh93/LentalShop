import { Cart } from "./cart";

const Basket = ({ cart, setCart, convertPrice, checkedAll, setCheckedAll, checkedItems, setCheckedItems }) => {
  return <Cart cart={cart} setCart={setCart} convertPrice={convertPrice} checkedAll={checkedAll} setCheckedAll={setCheckedAll} checkedItems={checkedItems} setCheckedItems={setCheckedItems}/>;
};

export default Basket;