import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/types/buttonProps';

const Button: React.FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, variant = 'primary', icon, to, style, ...rest }) => {

    const getStyleClass = (variant: string) => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-500 text-white';
            case 'danger':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-white';
            default:
                return 'bg-blue-500 text-white';
        }
    };
    const buttonClasses = `text-2xl px-4 py-2 font-semibold rounded ${getStyleClass(variant)}`;

    if (to) {
        return (
            <Link href={to} passHref className={`${buttonClasses} ${style}`} {...rest}>
                <i className="bi bi-arrow-return-left"></i> {children}
            </Link>
        );
    }

    return (
        <button className={`${buttonClasses} ${style}`} {...rest}>
            {children}
        </button>
    );
};


export default Button;
