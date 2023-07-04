import React from 'react'
import {LeftOutlined} from '@ant-design/icons'

export default function Login() {
  return (
    <div>
        <h2>DANIEL WELLINGTON</h2>
        <label htmlFor="">LOGIN</label>
        <input class="form-control" type="email" placeholder="Email"/>
        <input class="form-control" type="password" placeholder="Password"/>
        <div>
            <span><LeftOutlined />Return to Cart</span>
        </div>
        <div>
            <button type="button" class="btn btn-outline-dark">Login</button>
        </div>
    </div>
  )
}
