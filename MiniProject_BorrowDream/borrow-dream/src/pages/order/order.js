import { Pay } from "./pay";

const Order = ({ orderList, setOrderList, convertPrice }) => {
  return <Pay orderList={orderList} setOrderList={setOrderList} convertPrice={convertPrice}/>;
};

export default Order;
