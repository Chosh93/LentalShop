import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const CartApi = {
    
    // 장바구니 조회
    cartListGet : async(id) => {
        return await axios.get(KH_DOMAIN + `/cart?id=${id}`);
    },

    // 장바구니 선택 삭제
    deleteCartItem : async(userId, pname) => {
        const del = {
            userId: userId, 
            pname: pname
        };
        return await axios.post(KH_DOMAIN + "/cartItem/del", del);
    },

    // 장바구니 수량 조절
    updateQuantity : async(userId, pname, quantity) => {
        const update = {
            userId: userId,
            pname: pname,
            quantity: quantity
        };
        return await axios.post(KH_DOMAIN + "/cartItem/quan/update", update)
    },
    // 장바구니 선택주문조회
    checkCartList : async(userId, pname) => {
        const check = {
            userId: userId,
            pname: pname
        }
        return await axios.post(KH_DOMAIN + "/cart/check", check);
    },
    
    // 장바구니 리스트 값 조회
    listCnt : async(id) => {
        return await axios.get(KH_DOMAIN + `/mypage?id=${id}`)
    }
}
export default CartApi;