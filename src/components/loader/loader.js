import React from 'react'
import {Spin} from 'antd'

function Loader() {
    return (
        <div style={{textAlign:'center', padding:'20px'}}>
            <Spin size={'large'} /> 
        </div>
    )
}

export default Loader