import React, { useEffect } from 'react'
import './Navbar.scss'
import { ShoppingOutlined } from '@ant-design/icons'
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginActions } from '../../stores/slices/userLogin.slice'; 
import SearchByName from '../../pages/SearchByName/SearchByName';


export default function Navbar() {
  const userLoginStore = useSelector(store => store.userLoginStore);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  /* Load lai web van ko mat login */
  useEffect(() => {
    dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")))
  }, [])


  return (
    <div className='containerNavbar'>
      <div className='navbar'>
        <div className='iconNavbar'>
            <SearchByName/>
        </div>
        <div className='logoNavbar'>
          <p>DANIEL  WELLINGTON</p>
        </div>
        <div className='iconNavbar'>
          {userLoginStore.userInfor == null ?
            <Link to="/login"><UserOutlined /></Link>
            :
            (<Link to="/" style={{ textDecoration: 'none'}} >
              <div className="dropdown">
                <img src={userLoginStore.userInfor.avatar} alt="" className='avatar' />
                <div className="dropdownContent">
                  <a href="#"><i className="fa-regular fa-address-card"></i>Profile</a>
                  <a href="#" onClick={() => {
                    alert("Are you sure want to logout?")
                    localStorage.removeItem("token")
                    dispatch(userLoginActions.logOut())
                    navigate("/")

                  }} ><i className="fa-solid fa-right-from-bracket"></i>LogOut</a>

                </div>
              </div>
              Hi, {` ${userLoginStore.userInfor?.firstName} `}{`${userLoginStore.userInfor?.lastName}`} !

            </Link>
            )

          }

          <Link to="/carts"><ShoppingOutlined /></Link>
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
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ color: '#000', listStyle: 'none' }}>
            <li>
              <Link className="dropdown-item" to="/shop/MenWatch">
                MEN'S WATCHES
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/shop/WomenWatch">
                WOMEN'S WATCHES
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/shop/Jewellery">
                JEWELLERY
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/shop/combo">
                COMBO
              </Link>
            </li>
          </ul>
        </div>


        <Link to="">ABOUT US</Link>
      </div>
    </div>

  )
}
