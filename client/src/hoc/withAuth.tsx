import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useAppDispatch } from '@redux/hooks'
import { compareToken } from '@redux/modules/auth/auth'

export const withAuth = (WrappedComponent: React.FC<RouteComponentProps>, auth: number): React.FC<RouteComponentProps> => {

    const Auth: React.FC<RouteComponentProps> = (props) => {
        const dispatch = useAppDispatch();

        useEffect(() => {
            dispatch(compareToken())
                .then((res) => {
                    if (res.payload) {
                        const tokenMatch = res.payload.tokenMatch;
                        if (tokenMatch) {   // logged in
                            if (auth === 0) {
                                props.history.push('/home');
                            }
                        } else {    // logged out
                            if (auth === 1) {
                                props.history.push('/home');
                            }
                        }
                    } else {

                    }
                }
                )
        }, [])


        return (
            <div style={{ width: '100vw', height: '100vh' }}>
                <WrappedComponent {...props} />
            </div>
        )
    }

    return Auth;
}



