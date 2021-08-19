import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { compareToken } from '@redux/modules/auth'

export const withAuth = (WrappedComponent: React.FC<RouteComponentProps>, auth: number): React.FC<RouteComponentProps> => {

    const Auth: React.FC<RouteComponentProps> = (props) => {
        const dispatch = useAppDispatch();

        useEffect(() => {
            console.log('pagination withAuth')
            dispatch(compareToken())
                .then((res) => {
                    if (res.payload) {
                        const tokenMatch = res.payload.tokenMatch;
                        console.log('tokenMatch in withAuth: ', tokenMatch);
                        if (tokenMatch) {   // logged in
                            if (auth === 0) {
                                props.history.push('/');
                            }
                        } else {    // logged out
                            if (auth === 1) {
                                props.history.push('/');
                            }
                        }
                    } else {
                        console.log('compareToken res', res);
                    }
                }
                )
                .catch((err) => { console.log('compareToken err: ', err) })
        }, [])


        return (
            <WrappedComponent {...props} />
        )
    }

    return Auth;
}



