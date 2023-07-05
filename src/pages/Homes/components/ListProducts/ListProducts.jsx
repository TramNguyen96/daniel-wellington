import React, { useEffect, useState } from 'react'
import "./ListProducts.scss"
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../../../stores/slices/product.slice';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card } from 'antd';
const { Meta } = Card;


export default function ListProducts() {
    const dispatch = useDispatch();
    const productStore = useSelector(store => store.productStore)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(productActions.findAllProducts())
    }, [])
    // console.log(productStore.listProducts)

    // useEffect(() => {
    //     dispatch(productActions.filterProductById(id))
    // }, [id])
    // console.log(productStore.listProducts)

    return (
        <div className='cartProductMenMain'>
            <div className='cartProductMenImg'>

            </div>
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
