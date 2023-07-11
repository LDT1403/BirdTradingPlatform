import { createSlice } from "@reduxjs/toolkit";


const items =
    localStorage.getItem("cartItems") !== null
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];

const totalAmount =
    localStorage.getItem("totalAmount") !== null
        ? JSON.parse(localStorage.getItem("totalAmount"))
        : 0;

const totalQuantity =
    localStorage.getItem("totalQuantity") !== null
        ? JSON.parse(localStorage.getItem("totalQuantity"))
        : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
    localStorage.setItem("cartItems", JSON.stringify(item));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
    cartItems: items,
    totalQuantity: totalQuantity,
    totalAmount: totalAmount,
};



const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,

    reducers: {
        // =========== add item ============
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.productId === newItem.productId
            );


            if (!existingItem) {
                // ===== note: if you use just redux you should not mute state array instead of clone the state array, but if you use redux toolkit that will not a problem because redux toolkit clone the array behind the scene
                state.totalQuantity++;
                state.cartItems.push({
                    productId: newItem.productId,
                    productName: newItem.productName,
                    thumbnail: newItem.thumbnail,
                    soldPrice: newItem.soldPrice,
                    quantity: newItem.quantity,
                    totalPrice: newItem.soldPrice * newItem.quantity,
                    shopId: newItem.shopId,
                    shopName: newItem.shopName,
                    quantityProduct:newItem.quantityProduct
                });

            } else {
                existingItem.quantity = Number(existingItem.quantity) + Number(newItem.quantity);
                existingItem.totalPrice = Number(existingItem.totalPrice) + (Number(newItem.quantity) * Number(existingItem.soldPrice));

            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.soldPrice) * Number(item.quantity), 0

            );

            setItemFunc(
                state.cartItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );


        },

        // =================Remove==============

        removeItem(state, action) {
            const productId = action.payload
            const existingItem = state.cartItems.find(item => item.productId === productId)


            if (existingItem.quantity === 1) {

            }
            else {
                existingItem.quantity--
                existingItem.totalPrice = Number(existingItem.totalPrice) - Number
                    (existingItem.soldPrice)
            }
            state.totalAmount = state.cartItems.reduce((total, item) => (
                total + Number(item.soldPrice) * Number(item.quantity)

            ), 0);

            setItemFunc(
                state.cartItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },

        //--------------delete-----------------
        deleteItem(state, action) {
            const productId = action.payload
            const existingItem = state.cartItems.find(item => item.productId === productId)

            if (existingItem) {

                state.cartItems = state.cartItems.filter(item => item.productId !== productId)
                state.totalQuantity--;
            }
            state.totalAmount = state.cartItems.reduce((total, item) => (
                total + Number(item.soldPrice) * Number(item.quantity)

            ), 0);
            setItemFunc(
                state.cartItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );


        },
        // ...

        deleteMultipleItems(state, action) {
            const productIds = action.payload;

            // Kiểm tra từng productId
            productIds.forEach(productId => {
                // Tìm vị trí của sản phẩm trong mảng cartItems
                const index = state.cartItems.findIndex(item => item.productId === productId);

                // Nếu sản phẩm tồn tại, xóa nó khỏi mảng
                if (index !== -1) {
                    state.cartItems.splice(index, 1);
                    state.totalQuantity--;
                }
            });

            // Cập nhật tổng giá trị
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.soldPrice) * Number(item.quantity),
                0
            );

            setItemFunc(
                state.cartItems.map(item => item),
                state.totalAmount,
                state.totalQuantity
            );
        },

        // ...


    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;