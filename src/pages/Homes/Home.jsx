import React from 'react'
import Banner from './components/Banners/Banner'
import ListProducts from './components/ListProducts/ListProducts'

export default function Home() {
    return (
        <div>
            {/* <h1>Home Page</h1> */}
            <Banner />
            <ListProducts />
        </div>
    )
}
