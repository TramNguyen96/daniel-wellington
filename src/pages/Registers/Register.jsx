import React, { useEffect, useState } from 'react'
import './Register.scss'
import { LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginActions } from '@stores/slices/userLogin.slice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'



export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userLoginStore = useSelector(store => store.userLoginStore);
    const [loadingRegister, setLoadingRegister] = useState(false)

    useEffect(() => {
        if (userLoginStore.userInfor == null) {
            if (localStorage.getItem("token")) {
                dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
            }
        } else {
            toast.success(
                "Register successful!"
                , {
                    position: toast.POSITION.TOP_CENTER,
                });
            navigate('/')
            
        }
    }, [userLoginStore.userInfor])
    console.log("sdf",userLoginStore.isRegister);
    return (
        <>
            <ToastContainer />
            <div className='login_container'>
                <form onSubmit={async(eventForm) => {
                    eventForm.preventDefault(); // vô hiệu hành vi mặc định form

                    if (eventForm.target.inputUserName.value == "" || eventForm.target.inputEmail.value == "" || eventForm.target.inputPassword.value == "") {
                        toast.error(
                            "Please complete all information!"
                            , {
                                position: toast.POSITION.TOP_CENTER,
                            });
                        return
                    }
                    if (eventForm.target.inputPassword.value != eventForm.target.inputConfirmPassword.value) {
                        toast.error(
                            "Please enter confirm password!"
                            , {
                                position: toast.POSITION.TOP_CENTER,
                            });
                        return
                    }
                    setLoadingRegister(true)
                    let resultCheck = await axios.get(process.env.REACT_APP_SERVER_JSON + "users" + "?userName=" + eventForm.target.inputUserName.value);
                    if (resultCheck.data.length != 0) {
                        toast.error(
                            "UserName already exists"
                            , {
                                position: toast.POSITION.TOP_CENTER,
                            });
                       
                        setLoadingRegister(false)
                        return
                    }
                    setLoadingRegister(false)

                    dispatch(userLoginActions.register(
                        {
                            userName: eventForm.target.inputUserName.value,
                            email: eventForm.target.inputEmail.value,
                            password: eventForm.target.inputPassword.value,
                            isAdmin: false,
                            firstName: eventForm.target.inputFirstName.value,
                            lastName: eventForm.target.inputLastName.value,
                            avatar:"https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2Fava.png?alt=media&token=1b451501-540f-4103-a16d-c414fb0be034",
                            carts: []
                        }
                    ))

                }} className='login_form'>
                    <div className='formLogin'>
                        <h2>REGISTER</h2>
                        <input
                            class="form-control"
                            type="text"
                            placeholder="UserName"
                            name='inputUserName'
                        />
                        <input
                            class="form-control"
                            type="text"
                            placeholder="firstName"
                            name='inputFirstName'
                        />
                        <input
                            class="form-control"
                            type="text"
                            placeholder="lastName"
                            name='inputLastName'
                        />
                        <input
                            class="form-control"
                            type="email"
                            placeholder="Email"
                            name='inputEmail'
                        />
                        <input
                            class="form-control"
                            type="password"
                            placeholder="Password"
                            name='inputPassword'
                        />
                        <input
                            class="form-control"
                            type="password"
                            placeholder="Confirm Password"
                            name='inputConfirmPassword'
                        />
                        <div className='btnLogin'>
                            <div>
                                <button type="submit" class="btn btn-dark">Register</button>
                            </div>
                            <div>
                                <p>Already have an account <a href="/login">LOGIN</a></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>


    )
}
