import React, { ReactNode } from 'react'
import './index.css'

interface CusLayoutProps {
    model?: string,
    [x: string]: ReactNode;
}

const CusLayout:React.FC<CusLayoutProps> = props => {
    return (
        <div {...props} className={props.model === 'global' ? 'wrap' : 'ctn'}>
            {props.children}
        </div>
    )
}

export default CusLayout;