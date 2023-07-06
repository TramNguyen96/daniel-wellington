import React from 'react'
import './Footer.scss'
import { TwitterOutlined } from '@ant-design/icons'
import { FacebookOutlined } from '@ant-design/icons'
import { InstagramOutlined } from '@ant-design/icons'
import { YoutubeOutlined } from '@ant-design/icons'



export default function Footer() {
    return (
        <div>
            <div className='footer'>
                <div>
                    <h6>SHOP</h6>
                    <a href="/shop/MenWatch">MEN'S WATCHES</a><br />
                    <a href="/shop/WomenWatch">WOMEN'S WATCHES</a><br />
                    <a href="/shop/Jewellery">JEWELLERY</a><br />
                    <a href="/shop/combo">COMBO</a><br />
                </div>
                <div>
                    <h6>SUPPORT</h6>
                    <a href="">HELP</a><br />
                    <a href="">CONTACT US</a>
                </div>
                <div>
                    <h6>ABOUT US</h6>
                    <a href="https://twitter.com/itisDW"><TwitterOutlined /></a>
                    <a href="https://www.facebook.com/danielwellingtonofficial/?locale=vi_VN"><FacebookOutlined /></a>
                    <a href="https://www.instagram.com/danielwellington/"><InstagramOutlined /></a>
                    <a href="https://www.youtube.com/channel/UCY_BDqPMGJaBrxiiazZlEHg"><YoutubeOutlined /></a>
                    <a href="https://www.tiktok.com/@danielwellington"><i className="fa-brands fa-tiktok"></i></a>
                </div>
            </div>

            <div className='copyRightFooter'>
                <small><i className="fa-regular fa-copyright"></i> 2023 Deniel Wellington AB</small>
            </div>
        </div>
    )
}
