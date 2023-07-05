import React from 'react'
import Banner from './components/Banners/Banner'
import ListProducts from './components/ListProducts/ListProducts'
import OfferFooter from './components/OfferFooters/OfferFooter'
import Explore from './components/Explore/Explore'

export default function Home() {

    
    return (
        <div>
            {/* <h1>Home Page</h1> */}
            <Banner />
            <ListProducts />
            <hr style={{ width: "100%", backgroundColor: "f5f5f5" }} />
            <Explore/>
            <OfferFooter/>
        </div>
    )
}