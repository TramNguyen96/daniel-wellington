import React from 'react'
import './ListCartDetail.scss'

export default function ListCartDetails() {
    return (
        <>
            <div>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <div>Name</div>
                    <button type="button" class="btn btn-outline-dark">-</button>
                    <span>Price</span>
                    <button type="button" class="btn btn-outline-dark">+</button>

                    <button type="button" class="btn btn-outline-dark">ADD TO CART</button>

                </div>
            </div>
        </>
    )
}
