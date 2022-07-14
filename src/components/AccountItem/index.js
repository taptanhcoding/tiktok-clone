import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind';
import styles from '~/components/AccountItem/AccountItem.module.scss';

const cx = className.bind(styles);
function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/00bcd008909adb9d0ed13db6256d357f.jpeg?x-expires=1657526400&x-signature=3EjrVtIAzVNgQFS5WBfB9imWhtA%3D"
                alt="Hoa"
            />
            <div className={cx('info')}>
                <p className={cx('tiktok-id')}>
                    <span>ADepTrai</span>
                    <FontAwesomeIcon
                        className={cx('tiktok-active')}
                        icon={faCheckCircle}
                    />
                </p>
                <p className={cx('name')}>Nguyễn Văn A</p>
            </div>
        </div>
    );
}

export default AccountItem;
