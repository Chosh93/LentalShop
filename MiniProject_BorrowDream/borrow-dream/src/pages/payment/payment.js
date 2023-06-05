import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userInfo";
import AxiosApi from "../../api/axiosApi";
import PaymentModal from "./paymentModal";
import OrderApi from "../../api/orderApi";
import CartApi from "../../api/cartApi";



export const Payment = ( { cart, setCart, orderList, setOrderList, checkedItems, setCheckedItems, convertPrice, movedItemCnt, setMovedItemCount }) => {
    const context = useContext(UserContext);
    const { userId } = context;
    const [userInfo, setuserInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const sumPrice = checkedItems.reduce((acc, item) => acc + item.tprice, 0);
    useEffect(() => {
        const cusData = async () => {
            setLoading(true);
            try {
                const response = await AxiosApi.memberGet(userId);
                setuserInfo(response.data);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        cusData();
    }, [userId]);
    const payInfo = async (id) => {
        try {
            // 주문 내역으로 저장할 장바구니 아이템 가져오기
            const selectedItem = checkedItems.find(item => item.id === id);
            if (!selectedItem) {
              console.log('장바구니에서 선택된 아이템을 찾을 수 없습니다.');
              return;
            }
            // 주문 내역 저장 요청
            const info = await OrderApi.orderInsert(userId);
            setOrderList(info.data);
            console.log(info.data);
            console.log(orderList); // 업데이트된 주문 내역 확인

            // 모달 열기
            setModalOpen(true);
            selectListDelete(checkedItems.bk_pname);
            setCheckedItems([]);
            } catch (e) {
            console.log(e);
            }
    };
    // 결제한 상품 장바구니에서 삭제
    const selectListDelete = async (id) => {
        for (const item of checkedItems) {
            await CartApi.deleteCartItem(userId, item.bk_pname);
            const newCart = cart.filter((item) => item.bk_pname !== id);
            setCart(newCart);
        }
    }

    if(loading) {
        return <h2>조회중..</h2>
    }
    return (
        <div>
            <div>
                <h2>Order / Payment</h2>
                <div>
                    <a href="/cart"><span>장바구니</span></a>
                </div>
            </div>
            <div>
                <h3>배송 정보</h3>
                <ul>
                    <li><span>이름 / 연락처</span>
                    <div>
                        {userInfo && userInfo.map((info) => (
                        <ul key={info.id}>
                            <li key={info.name}>{info.name}</li>
                            <li key={info.phone}>{info.phone}</li>
                        </ul>
                        ))}
                    </div>
                    </li>
                    <li><span>주소</span>
                    {userInfo && userInfo.map((info) => (
                    <div key={info.id}>
                       {info.addr} 
                    </div>
                    ))}
                    </li>
                </ul>
            </div>
            <div>
                <h3>상품 정보</h3>
                <table>
                    <colgroup>
                        <col/>
                        <col width="50px"/>
                        <col width="160px"/>
                        <col width="70px"/>
                        <col width="69px"/>
                        <col width="100px"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">상품 정보</th>
                            <th scope="col">수량</th>
                            <th scope="col">렌트 기간</th>
                            <th scope="col">배송비</th>
                            <th scope="col">주문 금액</th>
                        </tr>
                    </thead>
                    <tbody>
    {checkedItems && checkedItems.map((list) => (
        <tr key={list.bk_num}>
            <td>
                <div>이미지</div>
                <div><strong>[제조사]</strong> a태그 + {list.bk_pname}</div>
            </td>
            <td>
                <div>{list.quantity}개</div>
            </td>
            <td>
                {list.borrow1} ~ {list.borrow2}
            </td>
            <td>무료</td>
            <td>{convertPrice(list.tprice)}원</td>
        </tr>
    ))}
        </tbody>
                </table>
                <div>
                <button onClick={() => payInfo(userId)}>{convertPrice(sumPrice)}원 결제하기</button>
                    <PaymentModal
                      open={openModal}
                      close={closeModal} 
                      type={true}
                      children="주문이 완료되었습니다."
                      orderList={orderList}
                      setOrderList={setOrderList}
                      cart={cart}
                      modalOpen={modalOpen}
                    >
                      주문이 완료 되었습니다.
                    </PaymentModal>
                </div>
            </div>
        </div>
    )
}