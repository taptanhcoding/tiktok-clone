import Tippy from '@tippyjs/react';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import className from 'classnames/bind';
import styles from './MenuItems.module.scss';

const cx = className.bind(styles);
function MenuItems({ children }) {
    return (
        <Tippy
            render={(attrs) => (
                <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h2>Menu Items</h2>
                    </PopperWrapper>
                </div>
            )}
            placement="bottom-end"
            // onClickOutside={() => {}}
            interactive={true}
        >
            {children}
        </Tippy>
    );
}

export default MenuItems;
