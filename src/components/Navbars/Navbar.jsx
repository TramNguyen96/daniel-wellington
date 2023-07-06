import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { ShoppingOutlined } from '@ant-design/icons'
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginActions } from '../../stores/slices/userLogin.slice'; 
import SearchByName from '../../pages/SearchByName/SearchByName';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Navbar() {
  const userLoginStore = useSelector(store => store.userLoginStore);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cartData, setCartData] = useState([])
  const useLoginStore = useSelector(store => store.useLoginStore)
  /* Load lai web van ko mat login */
  useEffect(() => {
    dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
  }, [])

  useEffect(() => {
    if (userLoginStore.userInfor == null) {
      if (localStorage.getItem("carts")) {
        setCartData(JSON.parse(localStorage.getItem("carts")))
      } else {
        setCartData([])
      }
    } else {
      setCartData(userLoginStore.userInfor.carts)
    }
  }, [userLoginStore.userInfor, userLoginStore.dependentData])


  return (
    <div className='containerNavbar'>
      <ToastContainer />
      <div className='logoNavbar'>
        <p>DANIEL  WELLINGTON</p>
      </div>

      <div className='navbars'>
        <div className='iconNavbar' style={{marginTop:'2px'}}>
            <SearchByName/>
        </div>

        <div className='iconNavbar' style={{fontSize:'25px'}}>
          {userLoginStore.userInfor == null ?
            <Link to="/login"><UserOutlined /></Link>
            :
            (<Link to="/" style={{ textDecoration: 'none' }} >
              <div className="dropdown">
                <img src={userLoginStore.userInfor.avatar} alt="" className='avatar' />
                <div className="dropdownContent">
                  <a href="#"><i className="fa-regular fa-address-card"></i><span style={{ color: '#000' }} >Profile</span></a>
                  <a href="#" onClick={() => {
                    window.confirm("Are you sure want to logout?")
                    toast.success(
                      "Logout successful!"
                      , {
                      position: toast.POSITION.TOP_CENTER,
                    });
                    localStorage.removeItem("token")
                    dispatch(userLoginActions.logOut())
                    navigate("/")

                  }} ><i className="fa-solid fa-right-from-bracket"></i><span style={{ color: '#000' }}>LogOut </span></a>

                </div>
              </div>
              Hi, {` ${userLoginStore.userInfor?.firstName} `}{`${userLoginStore.userInfor?.lastName}`} !

            </Link>
            )
          }

        </div>

        

        <div className='cartTotal'>
          <Link to="/carts"><ShoppingOutlined /></Link>
          <span className='cartNumber'>
                {cartData?.reduce((value, nextItem) => {
                return value + nextItem.quantity
              }, 0)}
          </span>
        </div>

        
      </div>
      <div className='linkNavbar'>
        <Link to="/">HOME</Link>

        <div className="dropdown">
          <div
            className=""
            id="dropdownMenuButton"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
            style={{ paddingTop: '20px', fontWeight: 'bold', color: '#cdcfd2' }}
          >
            SHOP
          </div>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ color: '#000', listStyle: 'none' }}>
            <p>
              <Link className="dropdown-item" to="/shop/MenWatch">
                <span>MEN'S WATCHES</span> 
              </Link>
            </p>
            <p>
              <Link className="dropdown-item" to="/shop/WomenWatch">
                <span>WOMEN'S WATCHES</span> 
              </Link>
            </p>
            <p>
              <Link className="dropdown-item" to="/shop/Jewellery">
                <span>JEWELLERY</span> 
              </Link>
            </p>
            <p>
              <Link className="dropdown-item" to="/shop/combo">
                <span>COMBO</span> 
              </Link>
            </p>
          </div>
        </div>


        <Link to="/aboutus">ABOUT US</Link>
      </div>
    </div>

  )
}
