import React, { useEffect, useState } from 'react'
import "./ListProducts.scss"
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../../../stores/slices/product.slice';
import { RightCircleOutlined } from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { Card } from 'antd';
const { Meta } = Card;


export default function ListProducts() {
    const [centredModal, setCentredModal] = useState(false);
    const toggleShow = () => setCentredModal(!centredModal);

    const dispatch = useDispatch();
    const productStore = useSelector(store => store.productStore)

    useEffect(() => {
        dispatch(productActions.findAllProducts())
    }, [])
    // console.log(productStore.listProducts)

    const handleCreatProducts = () => {
        dispatch(productActions.creatProducts({
            productId: Date.now(),
            quantity: 1,
        }))
    }
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
                            <Link to="/detailproducts" >
                                <button type="button" class="btn btn-outline-dark">View More</button>
                            </Link>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}
