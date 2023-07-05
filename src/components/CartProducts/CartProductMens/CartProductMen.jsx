import React, { useEffect, useState } from 'react';
import './CartProductMen.scss';
import { Fragment } from 'react';
import axios from 'axios';
import { Card } from 'antd';
const { Meta } = Card;


export default function CartProductMen() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/listProduct")
            .then(function (res) {
                console.log('data', res.data);
                setProducts(res.data)
            })
    }, [])


    return (
        <Fragment>
            <div className='cartProductMenMain'>
                <div className='cartProductMenImg'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartMen%2Fcart_men_main.png?alt=media&token=35f69289-cd69-4c1e-991c-443fe62a0361" alt="cart_men_main" />
                </div>
                <div className='cartProductMen'>
                    {products.map((item) => (
                        <div>
                            <Card
                                className='cartProductMenItems'
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<img alt={item.name} src={item.img} />}
                            >
                                <Meta title={item.name} />
                                <p>$ {item.price}</p>
                                <button type="button" className="btn btn-outline-danger">Add To Cart</button>
                            </Card>
                        </div>
                    ))}

                </div>
            </div>
        </Fragment>
    )
}
