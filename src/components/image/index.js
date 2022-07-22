import { useState } from 'react';
import { forwardRef } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(
    (
        { fallback: customFallback = images.noImage, src, className, alt, ...props },
        ref,
    ) => {
        const [fallback, setFallback] = useState('');

        return (
            <img
                className={classNames(styles.wrapper, className)}
                src={fallback || src}
                alt={alt}
                ref={ref}
                {...props}
                onError={() => {
                    setFallback(customFallback);
                }}
            />
        );
    },
);

export default Image;
