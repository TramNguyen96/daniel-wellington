import React from 'react';
import './CartJewellery.scss';
import {Fragment} from 'react';
import { Card } from 'antd';
const { Meta } = Card;

export default function CartJewellery() {
     const listCartProduct = [
    {
      id: "1",
      img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartJewellery%2Fcart_jewell_1.png?alt=media&token=70725d89-4b78-4790-9e80-a6d0304aa8e8",
      name: "Elan Lumine Necklace",
      price: "139"
    },
    {
      id: "2",
      img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartJewellery%2Fcart-jewell_2.png?alt=media&token=a1f03d9b-7c33-4f58-b1cc-a98587e033a0",
      name: "Elan Unity Necklace",
      price: "99"
    },
    {
      id: "3",
      img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartJewellery%2Fcart_jewell_3.png?alt=media&token=c9e229ba-d5fa-4787-a211-213587442832",
      name: "Emalie Earrings",
      price: "89"
    },
    {
      id: "4",
      img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartJewellery%2Fcart_jewell_4.png?alt=media&token=1089952d-eb34-40ad-921a-6d72f437cb0a",
      name: "Emalie Earrings",
      price: "109"
    }
    
  ];
  return (
    <div>
        <Fragment>
        <div className='cartJewelleryMain'> 
             <div className='cartJewelleryImg'>
                <img src="https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FcartJewellery%2Fcart_jewell_main.jpg?alt=media&token=6a9a7384-51ec-488b-9e97-df0672737dae" alt="cart_jewell_main" />
            </div>
            <div className='cartJewellery'>
            {listCartProduct.map((item)=>(
                        <div>
                            <Card
                                className='cartJewelleryItems'
                                hoverable
                                style={{
                                width: 240,
                                }}
                                cover={<img alt={item.name} src={item.img} />}
                            >
                                <Meta title={item.name}/>
                                <p>$ {item.price}</p>
                                <button type="button" class="btn btn-outline-danger">Add To Cart</button>
                            </Card>
                        </div>
            ))}
                
            </div>
            
        </div>
    </Fragment>
    </div>
  )
}
