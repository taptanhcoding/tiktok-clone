import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Wrapper } from '~/components/Popper';
import Button from '~/components/Button';
import Image from '~/components/image';

import classNames from 'classnames/bind';
import styles from './BoxUser.module.scss';

const cx = classNames.bind(styles);
function BoxUser({ children, user, placement = 'bottom', className }) {
    return (
        <HeadlessTippy
            interactive
            delay={[400, 0]}
            placement={placement}
            render={(attrs) => (
                <div className={cx('user-box', className)} tabIndex="-1" {...attrs}>
                    <Wrapper className={cx('user-box_wrapper')}>
                        <div className={cx('user-img')}>
                            <Image src={user.avatar} className={cx('user-avatar')} />
                            <Button primary>Follow</Button>
                        </div>
                        <div className={cx('info')}>
                            <p className={cx('tiktok-id')}>
                                <span>{user.nickname}</span>
                                {user.tick && (
                                    <FontAwesomeIcon
                                        className={cx('tiktok-active')}
                                        icon={faCheckCircle}
                                    />
                                )}
                            </p>
                            <p className={cx('name')}>{user.full_name}</p>
                        </div>
                        <div className={cx('user-inter')}>
                            <span className={cx('wp-data')}>
                                <span className={cx('data')}>{user.followers_count}</span>
                                Follower
                            </span>
                            <span className={cx('wp-data')}>
                                <span className={cx('data')}>{user.likes_count}</span>
                                Follower
                            </span>
                        </div>
                    </Wrapper>
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

BoxUser.propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.object.isRequired,
    placement: PropTypes.string,
    className: PropTypes.string,
};

export default BoxUser;
