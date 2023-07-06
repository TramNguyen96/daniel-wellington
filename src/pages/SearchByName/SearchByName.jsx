import React, { useState } from 'react';
import './SearchByName.scss'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBInput
} from 'mdb-react-ui-kit';
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../stores/slices/product.slice';
import { convertToUSD } from '@mieuteacher/meomeojs';

export default function App() {
    const [optXlModal, setOptXlModal] = useState(false);
    const toggleShow = (() => {
        setOptXlModal(!optXlModal)
        dispatch(productActions.clearSearchData())
});

    const dispatch = useDispatch()
    const productStore = useSelector(store => store.productStore)
    
    const [searchTimeOut, setSearchTimeOut] = useState(null);

    function searchKeyWords(keyWord){
        console.log("🚀 ~ file: SearchByName.jsx:29 ~ searchKeyWords ~ keyWord:", keyWord)
        clearTimeout(searchTimeOut);

        setSearchTimeOut(setTimeout(() => {
            if(!productStore.loading){
                if(keyWord !== ""){
                    dispatch(productActions.searchProductByName(keyWord))
                }
            }
        }, 500))
    }

    return (
        <>
            <MDBBtn onClick={toggleShow} style={{backgroundColor:'#000', border:'none'}}><SearchOutlined/></MDBBtn>
            <MDBModal show={optXlModal} tabIndex='-1' setShow={setOptXlModal}>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>
                                <MDBInput label='Search for anything...' id='typeText' type='text' className='inputSearch'
                                            onChange={(e) => {
                                                searchKeyWords(e.target.value)
                                            }}
                                />
                            </MDBModalTitle>
                            
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <div className='searchItems'>
                            {productStore.searchData.map((item) =>
                                <MDBModalBody key={item.id}
                                                onClick={() => {
                                                    window.open("/detailproducts/" + item.id, "_blank");
                                                }}
                                >
                                    <div className='searchItem' >
                                        <div className='searchItem-img'>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className='searchItem-content' >
                                            <p>{item.name}</p>
                                            <p>{convertToUSD(item.price)}</p>
                                        </div>
                                    </div>
                                </MDBModalBody>
                            )}
                        </div>
                        
                        
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}