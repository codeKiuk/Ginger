import React, { Suspense, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { compareToken } from '@redux/modules/auth/auth'
import { Loading } from '@components/commons/Loading'

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
                                props.history.push('/home');
                            }
                        } else {    // logged out
                            if (auth === 1) {
                                props.history.push('/home');
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
            <div style={{ width: '100vw', height: '100vh' }}>
                <Suspense fallback={<Loading />}>
                    <WrappedComponent {...props} />
                </Suspense>
            </div>
        )
    }

    return Auth;
}



