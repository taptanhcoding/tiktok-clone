import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Menu({ children, items = [], onChange = defaultFn, hideOnClick = false }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            delay={[400, 900]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
            render={(attrs) => (
                <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}

                        <div className={cx('menu-children')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool,
};

export default Menu;