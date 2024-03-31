import {ButtonHTMLAttributes} from "react";
import clsx from "clsx";
import css from './Button.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
};

export function Button(props: Props) {
    const { children, className, ...rest} = props;
    return (
        <button className={clsx(className, css.wrapper)} {...rest}>
            {props.children}
        </button>
    )
}