import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Image from '~/components/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

const AccountItem = forwardRef(({ data, onClick, className }, ref) => {
    return (
        <Link
            ref={ref}
            to={`/@${data.nickname}`}
            className={cx('wrapper', className)}
            onClick={onClick}
        >
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <p className={cx('tiktok-id')}>
                    <span>{data.nickname}</span>
                    {data.tick && (
                        <FontAwesomeIcon
                            className={cx('tiktok-active')}
                            icon={faCheckCircle}
                        />
                    )}
                </p>
                <p className={cx('name')}>{data.full_name}</p>
            </div>
        </Link>
    );
});

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default AccountItem;
