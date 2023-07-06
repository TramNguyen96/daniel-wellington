import React, { useEffect, useState } from 'react'
import './ListCartDetail.scss'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../../../stores/slices/product.slice';
import { useParams } from 'react-router-dom';
import { userLoginActions } from '../../../../stores/slices/userLogin.slice';
import { convertToUSD } from '@mieuteacher/meomeojs';

export default function ListCartDetails() {
    const dispatch = useDispatch()
    const productStore = useSelector(store => store.productStore)
    const userLoginStore = useSelector(store => store.userLoginStore)
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        console.log("id", id)
        dispatch(productActions.filterProductById(id))
    }, [])

    useEffect(() => {
        console.log("productStore.listProducts", productStore.listProducts)
    }, [productStore.listProducts])

    function addToCart(buyItem) {
        console.log("da vao add");
        if (localStorage.getItem("token")) {
            let carts = [];
            let flag = false;

            carts = userLoginStore.userInfor.carts.slice().map(item => {
                if (item.productId == buyItem.productId) {
                    let temp = { ...item };
                    temp.quantity += buyItem.quantity;
                    flag = true;
                    return temp
                }
                return item
            })

            if (!flag) {
                carts?.push(buyItem)
            }

            dispatch(userLoginActions.updateCart(
                {
                    userId: userLoginStore.userInfor.id,
                    carts: {
                        carts: carts
                    }
                }
            ))
            return
        }

        // chưa đăng nhập

        if (localStorage.getItem("carts")) {
            // đã từng có giỏ hàng
            let carts = JSON.parse(localStorage.getItem("carts"));
            console.log(carts);
            let flag = false;
            carts.map(item => {
                if (item.productId == buyItem.productId) {
                    item.quantity += buyItem.quantity
                    flag = true;
                }
                return item
            })
            if (!flag) {
                carts?.push(buyItem)
            }
            localStorage.setItem("carts", JSON.stringify(carts));
        } else {
            // chưa từng có
            let carts = [buyItem]
            localStorage.setItem("carts", JSON.stringify(carts));
        }
    }
    return (
        <>
            <div>
                {
                    productStore.listProducts.length > 0
                        ? <div className='cartDetail'>
                            <img src={productStore.listProducts[0].img} />

                            <div className='content'>
                                <div className='content-name'>{productStore.listProducts[0].name}</div>
                                <div className='content-price'>{convertToUSD(productStore.listProducts[0].price)}</div>
                                <button type="button" class="btn btn-outline-dark"
                                        onClick={()=> {
                                            if(quantity > 1){
                                                setQuantity(quantity - 1)
                                            }
                                        }}
                                >-</button>
                                <span className='content-quantity'>{quantity}</span>
                                <button type="button" class="btn btn-outline-dark"
                                        onClick={() => setQuantity(quantity + 1)}
                                >+</button><br/>

                                <p className='content-text'>
                                    <ul>
                                        <li>Free express shipping</li>
                                        <li>Free returns</li>
                                        <li>2 years warranty</li>
                                    </ul>
                                    <p>Cherry flowers are always beautiful, even if they're square-shaped. The Quadro Cherry Blossom combines the beauty of pastel tones with the sophisticated shimmer of genuine mother of pearl. Incrusted in a case made from rose gold plated stainless steel, this monochrome watch balances color with fine detailing and clear design lines. Wear it in spring or whenever your outfits need to bloom.</p>
                                </p>
                                
                                <button type="button" class="btn btn-dark w-50"
                                    onClick={() => addToCart(
                                        {
                                            productId: id,
                                            quantity: quantity,
                                            img: productStore.listProducts[0].img,
                                            name: productStore.listProducts[0].name,
                                            price: productStore.listProducts[0].price
                                        }
                                    )}
                                >ADD TO CART</button>
                            </div>
                        </div>
                        : <></>
                }
            </div>


        </>
    )
}
