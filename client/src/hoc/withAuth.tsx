import React, { useEffect } from 'react'
import { useAppDispatch } from '@redux/hooks'

export const withAuth = (WrappedComponent: React.FC<{}>, auth: number): React.FC<{}> => {

    const Auth: React.FC<{}> = () => {
        const dispatch = useAppDispatch();

        useEffect(() => {


        }, [])


        return (
            <WrappedComponent />
        )
    }

    return Auth;
}



