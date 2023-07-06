import React, { useState, useEffect } from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { userLoginActions } from '../../stores/slices/userLogin.slice';
import { convertToUSD } from '@mieuteacher/meomeojs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CartCheckout() {
    const [cartData, setCartData] = useState([])
    const dispatch = useDispatch()
    const userLoginStore = useSelector(store => store.userLoginStore)

    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")));
    }, []);

    useEffect(() => {
        if (userLoginStore.userInfor !== null) {
            let carts = [...userLoginStore.userInfor.carts]
            setCartData(carts)
        } else {
            if (localStorage.getItem("carts")) {
                setCartData(JSON.parse(localStorage.getItem("carts")))
            }
        }
    }, [userLoginStore.userInfor])

    function handleUpdateCart(type, productId) {
        // type => 1: +, 2: -, 3: delete
        if (localStorage.getItem("token")) {
            // online
            if (type == 1) {
                let cartTemp = [...userLoginStore.userInfor.carts];
                cartTemp = cartTemp.map(item => {
                    if (item.productId == productId) {
                        let objTemp = Object.assign({}, item);
                        objTemp.quantity++;
                        return objTemp
                    }
                    return item;
                })
                if (!userLoginStore.loading) {
                    dispatch(userLoginActions.updateCart(
                        {
                            userId: userLoginStore.userInfor.id,
                            carts: {
                                carts: cartTemp
                            }
                        }
                    ))
                }
            }
            if (type == 2) {
                let cartTemp = [...userLoginStore.userInfor.carts];
                for (let i in cartTemp) {
                    if (cartTemp[i].productId == productId) {
                        if (cartTemp[i].quantity == 1) {
                            if (window.confirm("Are you sure want to delete ?")) {
                                cartTemp.splice(i, 1)
                                toast.success(
                                    "Delete successful!"
                                    , {
                                        position: toast.POSITION.TOP_CENTER,
                                    });
                            }
                        } else {
                            let objTemp = Object.assign({}, cartTemp[i]);
                            objTemp.quantity--;
                            cartTemp[i] = objTemp;
                        }
                        break
                    }
                }
                if (!userLoginStore.loading) {
                    dispatch(userLoginActions.updateCart(
                        {
                            userId: userLoginStore.userInfor.id,
                            carts: {
                                carts: cartTemp
                            }
                        }
                    ))
                }
            }
            if (type == 3) {
                let cartTemp = [...userLoginStore.userInfor.carts];
                for (let i in cartTemp) {
                    if (cartTemp[i].productId == productId) {
                        cartTemp.splice(i, 1)
                        break
                    }
                }
                if (!userLoginStore.loading) {
                    dispatch(userLoginActions.updateCart(
                        {
                            userId: userLoginStore.userInfor.id,
                            carts: {
                                carts: cartTemp
                            }
                        }
                    ))
                }
            }
        } else {
            // local
            if (localStorage.getItem("carts")) {
                let cartLocal = JSON.parse(localStorage.getItem("carts"));
                if (type == 1) {
                    cartLocal = cartLocal.map(item => {
                        if (item.productId == productId) {
                            item.quantity += 1;
                        }
                        return item
                    })
                    localStorage.setItem("carts", JSON.stringify(cartLocal))
                }
                if (type == 2) {

                    for (let i in cartLocal) {
                        if (cartLocal[i].productId == productId) {
                            if (cartLocal[i].quantity == 1) {
                                if (window.confirm("Are you sure want to delete ?")) {
                                    cartLocal.splice(i, 1)
                                    toast.success(
                                        "Delete successful!"
                                        , {
                                            position: toast.POSITION.TOP_CENTER,
                                        });
                                }
                            } else {
                                cartLocal[i].quantity--;
                            }
                            break;
                        }
                    }

                    localStorage.setItem("carts", JSON.stringify(cartLocal))
                }

                if (type == 3) {

                    for (let i in cartLocal) {
                        if (cartLocal[i].productId == productId) {
                            cartLocal.splice(i, 1)
                            break;
                        }
                    }

                    localStorage.setItem("carts", JSON.stringify(cartLocal))
                }
                // load lai data local
                setCartData(JSON.parse(localStorage.getItem("carts")))
            }
        }
    }


    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="h-100 py-5">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
                            <MDBCardBody className="text-black">
                                <MDBRow>
                                    <MDBCol lg="7" className="px-5 py-4">
                                        <MDBTypography
                                            tag="h3"
                                            className="mb-5 pt-2 text-center fw-bold text-uppercase"
                                        >
                                            Your Cart
                                        </MDBTypography>

                                        {cartData?.map((item) => (
                                            <div className="d-flex align-items-center mb-5">
                                                <div className="flex-shrink-0">
                                                    <MDBCardImage
                                                        src={item.img}
                                                        fluid
                                                        style={{ width: "150px" }}
                                                        alt="Generic placeholder image"
                                                    />
                                                </div>

                                                <div className="flex-grow-1 ms-3">
                                                    <a href="#!" className="float-end text-black" onClick={() => handleUpdateCart(3, item.productId)}>
                                                        <MDBIcon fas icon="times" />
                                                    </a>
                                                    <MDBTypography tag="h5" className="text-dark">
                                                        {item.name}
                                                    </MDBTypography>

                                                    <div className="d-flex align-items-center">
                                                        <p className="fw-bold mb-0 me-5 pe-3">$ {item.price}</p>

                                                        <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                            <button type="button" class="btn btn-outline-dark"
                                                                onClick={() => {
                                                                    handleUpdateCart(2, item.productId)
                                                                }}
                                                            >-</button>

                                                            <span className="quantityTotalCart" style={{ fontSize: '20px', margin: '0px 10px', fontWeight: 'bold' }}

                                                            >{item.quantity}</span>

                                                            <button type="button" class="btn btn-outline-dark"
                                                                onClick={() => {
                                                                    handleUpdateCart(1, item.productId)
                                                                }}
                                                            >+</button>
                                                        </MDBCol>
                                                        <MDBCol>
                                                            <div className="d-flex justify-content-between px-x">
                                                                <p className="fw-bold"></p>
                                                                <p className="fw-bold"> {convertToUSD(item.price * item.quantity)} </p>
                                                            </div>
                                                        </MDBCol>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}


                                        <hr
                                            className="mb-4"
                                            style={{
                                                height: "2px",
                                                backgroundColor: "#ccc",
                                                opacity: 1,
                                            }}
                                        />

                                        <div
                                            className="d-flex justify-content-between p-2 mb-2"
                                        >
                                            <MDBTypography tag="h5" className="fw-bold mb-0">
                                                Total:
                                            </MDBTypography>
                                            <MDBTypography tag="h5" className="fw-bold mb-0">
                                                {
                                                    convertToUSD(cartData?.reduce((value, nextItem) => {
                                                        return value + (nextItem.quantity * nextItem.price)
                                                    }, 0))
                                                }
                                            </MDBTypography>
                                        </div>
                                    </MDBCol>
                                    <MDBCol lg="5" className="px-5 py-4">
                                        <MDBTypography
                                            tag="h3"
                                            className="mb-5 pt-2 text-center fw-bold text-uppercase"
                                        >
                                            Payment
                                        </MDBTypography>

                                        <form className="mb-5">
                                            <MDBInput
                                                className="mb-5"
                                                label="Card number"
                                                type="text"
                                                size="lg"
                                                defaultValue="1234 5678 9012 3457"
                                            />

                                            <MDBInput
                                                className="mb-5"
                                                label="Name on card"
                                                type="text"
                                                size="lg"
                                                defaultValue="John Smith"
                                            />

                                            <MDBRow>
                                                <MDBCol md="6" className="mb-5">
                                                    <MDBInput
                                                        className="mb-4"
                                                        label="Expiration"
                                                        type="text"
                                                        size="lg"
                                                        minLength="7"
                                                        maxLength="7"
                                                        defaultValue="01/22"
                                                        placeholder="MM/YYYY"
                                                    />
                                                </MDBCol>
                                                <MDBCol md="6" className="mb-5">
                                                    <MDBInput
                                                        className="mb-4"
                                                        label="Cvv"
                                                        type="text"
                                                        size="lg"
                                                        minLength="3"
                                                        maxLength="3"
                                                        placeholder="&#9679;&#9679;&#9679;"
                                                        defaultValue="&#9679;&#9679;&#9679;"
                                                    />
                                                </MDBCol>
                                            </MDBRow>

                                            <p className="mb-5">
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit
                                                <a href="#!"> obcaecati sapiente</a>.
                                            </p>

                                            <button type="button" class="btn btn-dark"

                                            >CHECKOUT</button>

                                            <MDBTypography
                                                tag="h5"
                                                className="fw-bold mb-5"
                                                style={{ marginTop: '10px' }}
                                            >
                                                <Link to="/" style={{ textDecoration: 'none', color: '#000' }} >
                                                    <MDBIcon fas icon="angle-left me-2" />
                                                    Return to shopping
                                                </Link>
                                            </MDBTypography>
                                        </form>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}