import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { compareToken } from '@redux/modules/auth'

type PathProps = {
    id: string,
}

export const withAuth = (WrappedComponent: React.FC<{}>, auth: number): React.FC<RouteComponentProps> => {

    const Auth: React.FC<RouteComponentProps> = (props) => {
        const dispatch = useAppDispatch();
        const tokenMatch = useAppSelector(state => state.auth.tokenMatch);

        useEffect(() => {
            console.log('pagination withAuth')
            dispatch(compareToken())
                .then(() => {
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
                }
                )
        }, [])


        return (
            <WrappedComponent />
        )
    }

    return Auth;
}



