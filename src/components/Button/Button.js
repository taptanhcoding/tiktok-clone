import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({
    to,
    href,
    children,
    onClick,
    className,
    leftIcon,
    RightIcon,
    disabled = false,
    primary = false,
    rounded = false,
    small = false,
    large = false,
    outline = false,
    account = false,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    // Remove event listeners btn when disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        large,
        disabled,
        rounded,
        account,
    });
    return (
        <Comp className={classes} {...props} {...passProps}>
            {leftIcon && <span className={cx('left-icon', 'icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {RightIcon && <span className={cx('right-icon', 'icon')}>{RightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    RightIcon: PropTypes.node,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    rounded: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    medium: PropTypes.bool,
    outline: PropTypes.bool,
    account: PropTypes.bool,
};

export default Button;
