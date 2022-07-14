import styles from '~/components/Popper/Popper.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);
function Wrapper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Wrapper;
