import React from 'react'
import './Footer.scss'
import {TwitterOutlined} from '@ant-design/icons'
import {FacebookOutlined} from '@ant-design/icons'
import {InstagramOutlined} from '@ant-design/icons'
import {YoutubeOutlined} from '@ant-design/icons'



export default function Footer() {
  return (
    <div>
        <div className='footer'>
            <div>
            <h6>SHOP</h6>
            <a href="">MEN'S WATCHES</a><br/>
            <a href="">WOMEN'S WATCHES</a><br/>
            <a href="">JEWELLERY</a><br/>
            </div>
            <div>
                <h6>SUPPORT</h6>
                <a href="">HELP</a><br/>
                <a href="">CONTACT US</a>
            </div>
            <div>
                <h6>ABOUT US</h6>
                <a href=""><TwitterOutlined /></a>
                <a href=""><FacebookOutlined /></a>
                <a href=""><InstagramOutlined /></a>
                <a href=""><YoutubeOutlined /></a>
                <a href=""><i class="fa-brands fa-tiktok"></i></a>
            </div>
        </div>
        
        <div>
            <small><i class="fa-regular fa-copyright"></i> 2023 Deniel Wellington AB</small>
        </div>
    </div>
  )
}
