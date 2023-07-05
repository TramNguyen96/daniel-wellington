import React, { useEffect, useState } from 'react';
import './CartProductWomen.scss';
import { Fragment } from 'react';
import { Card } from 'antd';
import axios from 'axios';
const { Meta } = Card;


export default function CartProductWomen() {
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
            <div className='cartProductWomenMain'>
                <div className='cartProductWomen'>
                    {products.map((item) => (
                        <div>
                            <Card
                                className='cartProductWomenItems'
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
                <div className='cartProductWomenImg'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartWomen%2Fcart_women_main.jpg?alt=media&token=9e41afa3-007d-4bd2-ba0f-d68d5174b299" alt="cart_Women_main" />
                </div>
            </div>
        </Fragment>
    )
}
