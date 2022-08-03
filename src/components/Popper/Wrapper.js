import PropTypes from 'prop-types';

import styles from '~/components/Popper/Popper.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);
function Wrapper({ children, className, menuTitle }) {
    return (
        <div className={cx('wrapper', className)}>
            {menuTitle && <h4 className={cx('menu-title')}>{menuTitle}</h4>}

            {children}
        </div>
    );
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
export default Wrapper;
