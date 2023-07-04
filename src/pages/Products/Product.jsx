import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../stores/slices/product.slice';
const { Meta } = Card;

export default function Product() {
    const { type } = useParams();
    const dispatch = useDispatch();
    const productStore = useSelector(store => store.productStore)
    const [addCart, setAddCart] = useState(false);
    

    useEffect(() => {
        dispatch(productActions.filterProductByType(type))
    }, [type])
    console.log(productStore);
    return (
        <div>Product {type}
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
                            <button
                                type="button"
                                class="btn btn-outline-danger"

                            >Add To Cart</button>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}
