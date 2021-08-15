import React from 'react'
import { useForm } from "react-hook-form";

type loginForm = {
    firstName: string,
    lastName: string,
}

export const Login: React.FC<{}> = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit = handleSubmit(data => console.log(data));
    // firstName and lastName will have correct type

    return (
        <form onSubmit={onSubmit}>
            <label>First Name</label>

            <label>Last Name</label>
            <input />
            <button
                type="button"
            >
                SetValue
            </button>
        </form>
    );
}