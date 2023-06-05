import  OrderInfo  from "./orderList";
import Head from "../header";
import Footer from "../footer";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userInfo";
import OrderApi from "../../api/orderApi";

export const Pay = ({ orderList, setOrderList, convertPrice }) => {
  const context = useContext(UserContext);
  const { userId } = context;
      
  useEffect(() => {
    const cartList = async () => {
      try {
        const response = await OrderApi.orderListGet(userId);
        setOrderList(response.data)
      } catch (e) {
        console.log(e);
      }
    }
    cartList();
  }, [userId])
  return (
    <>
      <Head />
      <OrderInfo orderList={orderList} convertPrice={convertPrice} />
      <Footer />
    </>
  );
};
