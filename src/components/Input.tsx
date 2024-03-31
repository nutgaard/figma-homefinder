import {InputHTMLAttributes} from "react";
import clsx from "clsx";
import css from './Input.module.css';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

export function Input(props: Props) {
    const { label, className, ...rest } = props;
    return (
        <label className={clsx(className, css.wrapper)}>
            <span>{label}</span>
            <input {...rest} />
        </label>
    )
}