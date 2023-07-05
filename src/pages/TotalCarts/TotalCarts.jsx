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
import { productActions } from "../../stores/slices/product.slice";
import { userLoginActions } from '../../stores/slices/userLogin.slice';

export default function CartCheckout() {
    const [cartData, setCartData] = useState([])
    const dispatch = useDispatch()
    const productStore = useSelector(store => store.productStore)
    const userLoginStore = useSelector(store => store.userLoginStore)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        dispatch(userLoginActions.checkTokenLocal(localStorage.getItem("token")));
    }, []);
    useEffect(() => {
        if (userLoginStore.userInfor !== null) {

            let carts = [...userLoginStore.userInfor.carts]

            setCartData(carts)
        }
    }, [userLoginStore.userInfor])

    function handleDeleteProduct(productId) {
        console.log(productId);

        let carts = userLoginStore.userInfor.carts
        // console.log(carts);

        let updatedCart = carts.filter((product) => product.productId !== productId)

        setCartData(updatedCart)

        // console.log(updatedCart);

        dispatch(userLoginActions.updateCart(
            {
                userId: userLoginStore.userInfor.id,
                carts: {
                    carts: updatedCart
                }
            }
        ))
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
                                                    <a href="#!" className="float-end text-black" onClick={() => handleDeleteProduct(item.productId)}>
                                                        <MDBIcon fas icon="times" />
                                                    </a>
                                                    <MDBTypography tag="h5" className="text-dark">
                                                        {item.name}
                                                    </MDBTypography>

                                                    <div className="d-flex align-items-center">
                                                        <p className="fw-bold mb-0 me-5 pe-3">$ {item.price}</p>

                                                        <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                            <button type="button" class="btn btn-outline-dark"
                                                                onClick={(e) => {
                                                                    if (Number(e.target.parentNode.querySelector(".quantityTotalCart").innerText) > 1) {
                                                                        e.target.parentNode.querySelector(".quantityTotalCart").innerText =
                                                                            Number(e.target.parentNode.querySelector(".quantityTotalCart").innerText) - 1
                                                                    }
                                                                }}
                                                            >-</button>

                                                            <span className="quantityTotalCart" style={{ fontSize: '20px', margin: '0px 10px', fontWeight: 'bold' }}

                                                            >{item.quantity}</span>

                                                            <button type="button" class="btn btn-outline-dark"
                                                                onClick={(e) => {
                                                                    e.target.parentNode.querySelector(".quantityTotalCart").innerText =
                                                                        Number(e.target.parentNode.querySelector(".quantityTotalCart").innerText) + 1
                                                                }}
                                                            >+</button>
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

                                        <div className="d-flex justify-content-between px-x">
                                            <p className="fw-bold">Subtotal:</p>
                                            <p className="fw-bold">$</p>
                                        </div>
                                        <div className="d-flex justify-content-between px-x">
                                            <p className="fw-bold">Shipping:</p>
                                            <p className="fw-bold">5$</p>
                                        </div>

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