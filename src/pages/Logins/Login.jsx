import React, { useEffect } from 'react'
import './Login.scss'
import { LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@components/Loadings/Loading'
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
            navigate('/')
        }
    }, [userLoginStore.userInfor])
    return (
        <div className='login_container'>
            {
                userLoginStore.loading ? <Loading></Loading> : <></>
            }
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
