import React, { useEffect } from 'react'
import './Login.scss'
import { LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice'
import { useNavigate } from 'react-router-dom'



export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userLoginStore = useSelector(store => store.userLoginStore);

    useEffect(() => {
        if (userLoginStore.userInfor == null) {
            if (localStorage.getItem("token")) {
                dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
            }
        } else {
            let userCarts = userLoginStore.userInfor.carts;
            if (localStorage.getItem("carts")) {
                let localCarts = JSON.parse(localStorage.getItem("carts"));
                if (userCarts.length == 0) {
                    // truong hop tren mang chua co gio hang
                    dispatch(userLoginActions.updateCart(
                        {
                            userId: userLoginStore.userInfor.id,
                            carts: {
                                carts: localCarts
                            }
                        }
                    ))
                    localStorage.removeItem('carts');
                } else {
                    // truong hop tren mang da co san pham

                    let userCartsCopy = [];

                    for (let i in userCarts) {
                        let flag = false;
                        for (let j in localCarts) {
                            if (userCarts[i].productId == localCarts[j].productId) {
                                let newObj = { ...userCarts[i] };
                                newObj.quantity += localCarts[j].quantity;
                                localCarts.splice(j, 1);
                                userCartsCopy.push(newObj);
                                flag = true;
                                break
                            }
                        }
                        if (!flag) {
                            let newObj = { ...userCarts[i] };
                            userCartsCopy.push(newObj);
                        }
                    }

                    dispatch(userLoginActions.updateCart(
                        {
                            userId: userLoginStore.userInfor.id,
                            carts: {
                                carts: userCartsCopy.concat(localCarts)
                            }
                        }
                    ))
                    localStorage.removeItem('carts');
                    navigate('/')
                }
            } else {
                navigate('/')
            }
        }
    }, [userLoginStore.userInfor])
    return (
        <div className='login_container'>
            <form onSubmit={(eventForm) => {
                eventForm.preventDefault(); // vô hiệu hành vi mặc định form

                if (eventForm.target.inputUserName.value == "" || eventForm.target.inputPassword.value == "") {
                    alert("vui lòng điền đầy đủ các trường")
                    return
                }

                dispatch(userLoginActions.login(
                    {
                        userName: eventForm.target.inputUserName.value,
                        password: eventForm.target.inputPassword.value
                    }
                ))

            }} className='login_form'>
                <div className='formLogin'>
                    <h2>LOGIN</h2>
                    <input
                        class="form-control"
                        type="text"
                        placeholder="UserName"
                        name='inputUserName'
                    />
                    <input
                        class="form-control"
                        type="password"
                        placeholder="Password"
                        name='inputPassword'
                    />
                    <div className='btnLogin'>
                        <div>
                            <Link to="/"><LeftOutlined /> Return to Cart</Link>
                        </div>
                        <div>
                            <button type="submit" class="btn btn-dark">Login</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>


    )
}
