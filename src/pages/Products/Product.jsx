import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../stores/slices/product.slice';
const { Meta } = Card;

export default function Product() {
    const { type } = useParams();
    const dispatch = useDispatch();
    const productStore = useSelector(store => store.productStore)

    useEffect(() => {
        dispatch(productActions.filterProductByType(type))
    }, [type])
    // console.log(productStore);

    return (
        <div style={{fontSize:'25px', fontWeight:'bold', marginTop:'20px'}}>DW - {type}
            <p style={{fontSize:'18px', fontWeight:'normal', marginBottom:'20px'}}>MAKE A STATEMENT ABOUT YOUR STYLE</p>
            <div className='cartProductMen'>
                {productStore.listProducts?.map((item) => (
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
                            <Link to={"/detailproducts/" + item.id} >
                                <button type="button" class="btn btn-outline-dark"

                                >View More</button>
                            </Link>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}
