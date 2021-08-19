import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { RouteComponentProps } from 'react-router';
import { Button } from '@material-ui/core';
import { postRegister } from '@redux/modules/register';

type Register = {
    userID: String,
    password: String,
    confirmPassword: String
}

export const RegisterForm: React.FC<RouteComponentProps> = (props) => {
    const dispatch = useAppDispatch();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<Register>();

    const onSubmit = handleSubmit(data => {
        dispatch(postRegister(data))
            .then(res => {
                console.log('postRegister res', res);

                if (res.payload.success) {
                    props.history.push('/');
                } else {
                    props.history.push('/register')
                }
            })
            .catch(err => console.log('postRegister err: ', err))
    })

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
            {/* <label>
                비밀번호 확인
                <input />
            </label> */}
            <Button color="primary" onClick={onSubmit} type='submit' />
        </form>

    )
}