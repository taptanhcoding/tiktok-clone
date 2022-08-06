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
function Menu({
    children,
    items = [],
    onChange = defaultFn,
    hideOnClick = false,
    placement = 'bottom-end',
    positionArrow = 'top',
}) {
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

    // reset to first menu
    const handleResetToFirstMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };
    // handle back to prev level menu
    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };
    const renderResult = (attrs) => (
        <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && (
                    <Header title={current.title} onBack={handleBack} />
                )}

                <div className={cx('menu-children')}>{renderItems()}</div>
                <div className={cx('arrow', positionArrow)} data-popper-arrow></div>
            </PopperWrapper>
        </div>
    );

    return (
        <Tippy
            interactive
            delay={[400, 900]}
            hideOnClick={hideOnClick}
            placement={placement}
            onHide={handleResetToFirstMenu}
            render={renderResult}
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
