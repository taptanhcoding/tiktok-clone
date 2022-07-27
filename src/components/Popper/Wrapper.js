import PropTypes from 'prop-types';

import styles from '~/components/Popper/Popper.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);
function Wrapper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
export default Wrapper;
