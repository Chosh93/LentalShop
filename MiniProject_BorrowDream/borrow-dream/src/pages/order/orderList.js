import { useState, useEffect, useContext } from 'react'
import OrderApi from '../../api/orderApi';
import { UserContext } from '../../context/userInfo';

const OrderInfo = ({orderList, convertPrice}) => {
  const context = useContext(UserContext);
  return (
      <table>
        <colgroup>
        <col width="25%" />
        <col width="13%" />
        <col width="10%" />
        <col width="8%" />
        <col width="10%" />
        </colgroup>
        <thead>
        <tr>
          <th scope='col'>상품정보</th>
          <th scope='col'>주문일자</th>
          <th scope='col'>주문번호</th>
          <th scope='col'>주문금액</th>
          <th scope='col'>주문상태</th>
        </tr>
        </thead>
        <tbody>
        {orderList && orderList.map((list) => (
          <tr key={list.od_num}>
            <td><strong>[제조사]</strong><br/>{list.od_pname}<br/>{list.borrow1} - {list.borrow2}</td>
            <td>{list.od_date}</td>
            <td>{list.od_num}</td>
            <td>{convertPrice(list.od_tPrice)}원<br/>수량{list.od_quantity}개</td>
            <td><button>배송조회</button><button>후기작성</button></td>
          </tr>
        ))}
        </tbody>
      </table>
  );
};

export default OrderInfo;
