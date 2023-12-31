import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CryptoJS = require("crypto-js");

const login = createAsyncThunk(
    "login",
    async (inforLogin) => {
        // localhost:4000/users
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'users');
        return {
            users: res.data,
            inforLogin: inforLogin
        }
    }
)

const register = createAsyncThunk(
    "register",
    async (inforRegister) => {
        // localhost:4000/users
        let res = await axios.post(process.env.REACT_APP_SERVER_JSON + 'users' , inforRegister);
        return {
            users: res.data,
            inforRegister: inforRegister
        }
    }
)

// checkout
const checkout = createAsyncThunk(
    "checkout",
    async (patchData) => {
        // localhost:4000/users/1
        //console.log("dataObj",dataObj)
        let res = await axios.patch(process.env.REACT_APP_SERVER_JSON + 'users/' + patchData.userId, patchData.data);
        return res.data
    }
)

const updateCart = createAsyncThunk(
    "updateCarts",
    async (dataObj) => {
        // localhost:4000/users/1
        let res = await axios.patch(process.env.REACT_APP_SERVER_JSON + 'users/' + dataObj.userId, dataObj.carts);
        return res.data
    }
)

const checkTokenLocal = createAsyncThunk(
    "checkTokenLocal",
    async (token) => {
        // localhost:4000/users
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'users');
        return {
            users: res.data,
            token: token
        }
    }
)

function createToken(userObj, privateKey) {
    return CryptoJS.AES.encrypt(JSON.stringify(userObj), privateKey).toString();
}

function checkToken(token, privateKey, keyEnv) {
    try {
        if (privateKey != keyEnv) {
            return false
        }

        // giải mã
        const decryptedData = CryptoJS.AES.decrypt(token, privateKey)
            .toString(CryptoJS.enc.Utf8);

        return JSON.parse(decryptedData)
    } catch {
        //console.log("key lỗi")
        return false
    }
}

const userLoginSlice = createSlice(
    {
        name: "userLogin",
        initialState: {
            loading: false,
            userInfor: null,
            dependentData: false,
            notLogin: false,
            isRegister: false
        },
        reducers: {
            logOut: (state, action) => {
                return {
                    ...state, userInfor: null
                }
            },
            changeDependentData: (state, action) => {
                return {
                    ...state, dependentData: !state.dependentData
                }
            },
            changeNotLogin: (state, action) => {
                return {
                    ...state, notLogin: !state.notLogin
                }
            }
        },
        extraReducers: (builder) => {
            // login
            builder.addCase(login.fulfilled, (state, action) => {
                let user = action.payload.users.find(user => user.userName == action.payload.inforLogin.userName);
                if (!user) {
                    toast.error(
                        "User not found !"
                        , {
                            position: toast.POSITION.TOP_CENTER,
                        });
                } else {
                    if (user.password !== action.payload.inforLogin.password) {
                        toast.error(
                            "Password don't match !"
                            , {
                                position: toast.POSITION.TOP_CENTER,
                            });
                    } else {
                        state.userInfor = user; // cập nhật lại state
                        // tạo token và lưu vào local storage

                        // Mã hóa dữ liệu
                        let token = createToken(user, process.env.REACT_APP_JWT_KEY);
                        localStorage.setItem("token", token);
                    }
                }
            });
            // register
            builder.addCase(register.fulfilled, (state, action) => {
                state.userInfor = action.payload;
                console.log("action.payload", action.payload);
                state.isRegister = true;
                // Mã hóa dữ liệu
                let token = createToken(action.payload, process.env.REACT_APP_JWT_KEY);
                localStorage.setItem("token", token);
            });
            // update cart
            builder.addCase(updateCart.fulfilled, (state, action) => {
                state.userInfor = action.payload
            });
            // check token
            builder.addCase(checkTokenLocal.fulfilled, (state, action) => {
                let deToken = checkToken(action.payload.token, process.env.REACT_APP_JWT_KEY, process.env.REACT_APP_JWT_KEY);
                if (deToken) {
                    let user = action.payload.users.find(user => user.userName == deToken.userName);
                    if (user) {
                        if (user.password == deToken.password) {
                            state.userInfor = user;
                        } else {
                            localStorage.removeItem("token")
                        }
                    } else {
                        localStorage.removeItem("token")
                    }
                } else {
                    localStorage.removeItem("token")
                }
            });
            // chekout
            builder.addCase(checkout.fulfilled, (state, action) => {
                state.userInfor = action.payload;
            });
            // xử lý các pending và rejected
            builder.addMatcher(
                (action) => {
                    if (action.meta) {
                        return action
                    }
                },
                (state, action) => {
                    if (action.meta) {
                        if (action.meta.requestStatus == "pending") {
                            console.log("đã vào pending của api: ", action.type)
                            // if (action.type == "deleteUserByid/pending") {
                            //     console.log("trường hợp pending của api delete")
                            // }
                            state.loading = true;
                        }
                        if (action.meta.requestStatus == "rejected") {
                            //console.log("đã vào rejected của api: ", action.type)
                            state.loading = false;
                        }
                        if (action.meta.requestStatus == "fulfilled") {
                            //console.log("đã vào fulfilled của api: ", action.type)
                            state.loading = false;
                        }
                    }
                }
            );
        }
    }
)


export const userLoginActions = {
    ...userLoginSlice.actions,
    login,
    checkTokenLocal,
    updateCart,
    register,
    checkout
}
export default userLoginSlice.reducer;
