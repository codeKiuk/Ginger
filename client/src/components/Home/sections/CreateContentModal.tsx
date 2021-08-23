import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'

export const CreateContentModal: React.FC<{}> = () => {


    useEffect(() => {
        console.log('modal mounted');
    }, [])

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 20000, position: 'fixed',
            width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.25)',
        }}>
            hi
        </div>
    )
}