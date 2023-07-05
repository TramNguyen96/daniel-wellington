import React, { useState } from 'react';
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

export default function App() {
    const [optXlModal, setOptXlModal] = useState(false);

    const toggleShow = () => setOptXlModal(!optXlModal);

    return (
        <>
            <MDBBtn onClick={toggleShow} style={{backgroundColor:'#000', border:'none'}}><SearchOutlined/></MDBBtn>
            <MDBModal show={optXlModal} tabIndex='-1' setShow={setOptXlModal}>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>
                                <MDBInput label='Search for anything...' id='typeText' type='text' style={{width:'100%'}} />
                            </MDBModalTitle>
                            
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>...</MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}