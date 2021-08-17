import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const withAuth = (WrappedComponent: React.FC<{}>, auth: number): React.FC<{}> => {

    const Auth: React.FC<{}> = () => {
        const dispatch = useDispatch();

        useEffect(() => {


        }, [])


        return (
            <WrappedComponent />
        )
    }

    return Auth;
}



