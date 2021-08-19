import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import login, { postLogin } from '@redux/modules/login'
import { RouteComponentProps } from 'react-router';
import { compareToken } from '@redux/modules/auth';


type Login = {
    userID: String;
    password: String;
};

const LoginForm: React.FC<RouteComponentProps> = (props) => {
    const dispatch = useAppDispatch();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<Login>();
    const onSubmit = handleSubmit(data => {
        // console.log('data: ', data);
        dispatch(postLogin(data))
            .then((res) => {
                console.log('loginForm res: ', res);
                if (res.payload.success) {
                    props.history.push('/');
                } else {
                    props.history.push('/login');
                }
            })
            .catch((err) => console.log('postLogin err: ', err));


        // props.history.push('/')
    });

    useEffect(() => {

    }, [])

    return (
        <form onSubmit={onSubmit}>
            <label>
                이메일
                <input placeholder={'이메일을 입력해주세요'}
                    {...register('userID', {
                        required: true,
                        pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    })}
                />
            </label>
            <label>
                비밀번호
                <input placeholder={'비밀번호를 입력해주세요'}
                    {...register('password', {
                        required: true,
                        minLength: 5,
                    })}
                />
            </label>
            <button type='submit'>
                로그인
            </button>
        </form>

    )
}

export default LoginForm