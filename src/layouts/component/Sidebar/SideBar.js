import { Link } from 'react-router-dom';
import * as searchServices from '~/services/searchService';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import Menu, { MenuItem } from './Menu';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import {
    GroupActiveIcon,
    GroupIcon,
    HashTagIcon,
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    MusicIcon,
} from '~/components/Icons';
import { Wrapper } from '~/components/Popper';
import { useEffect, useState } from 'react';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Image from '~/components/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Sidebar() {
    const [listUser, setListUser] = useState([]);
    const [listFollow, setListFollow] = useState([]);
    const [typeList, setTypeList] = useState('less');
    const [follow, setFollow] = useState('less');
    useEffect(() => {
        const userLists = async () => {
            const result = await searchServices.search('l', typeList);
            const result2 = await searchServices.search('a', follow);
            setListUser(result);
            setListFollow(result2);
        };

        userLists();
    }, [typeList]);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="Dành cho bạn"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Đang Follow"
                    to={config.routes.following}
                    icon={<GroupIcon />}
                    activeIcon={<GroupActiveIcon />}
                />
                <MenuItem
                    title="LIVE"
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />
            </Menu>
            <Wrapper menuTitle="Tài khoản được đề xuất" className={cx('sidebar-item')}>
                {listUser.map((user) => (
                    <div>
                        <HeadlessTippy
                            interactive
                            delay={[400, 0]}
                            placement="bottom"
                            render={(attrs) => (
                                <div className={cx('user-box')} tabIndex="-1" {...attrs}>
                                    <Wrapper className={cx('user-box_wrapper')}>
                                        <div className={cx('user-img')}>
                                            <Image
                                                src={user.avatar}
                                                className={cx('user-avatar')}
                                            />
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
                                                <span className={cx('data')}>
                                                    {user.followers_count}
                                                </span>
                                                Follower
                                            </span>
                                            <span className={cx('wp-data')}>
                                                <span className={cx('data')}>
                                                    {user.likes_count}
                                                </span>
                                                Follower
                                            </span>
                                        </div>
                                    </Wrapper>
                                </div>
                            )}
                        >
                            <AccountItem
                                key={user.id}
                                data={user}
                                className={cx('user-item')}
                            />
                        </HeadlessTippy>
                    </div>
                ))}
                <p
                    className={cx('user-more')}
                    onClick={() => {
                        setTypeList((prev) => (prev == 'less' ? 'more' : 'less'));
                    }}
                >
                    {typeList == 'less' ? 'Xem tất cả' : 'Ẩn bớt'}
                </p>
            </Wrapper>
            <Wrapper menuTitle="Các tài khoản đang follow" className={cx('sidebar-item')}>
                {listFollow.map((user) => (
                    <AccountItem key={user.id} data={user} className={cx('user-item')} />
                ))}
                <p
                    className={cx('user-more')}
                    onClick={() => {
                        setFollow((prev) => (prev == 'less' ? 'more' : 'less'));
                    }}
                >
                    {follow == 'less' ? 'Xem thêm' : 'Ẩn bớt'}
                </p>
            </Wrapper>

            <Wrapper menuTitle="Khám phá" className={cx('sidebar-item')}>
                <div className={cx('item')}>
                    <Button className={cx('discover')} leftIcon={<HashTagIcon />}>
                        Suthatla
                    </Button>
                    <Button className={cx('discover')} leftIcon={<HashTagIcon />}>
                        Mackedoi
                    </Button>
                    <Button className={cx('discover')} leftIcon={<MusicIcon />}>
                        Yêu Đơn Phường Là Gì -(MEE Remix)
                    </Button>
                </div>
            </Wrapper>
            <Wrapper className={cx('sidebar-item', 'item')}>
                <a className={cx('link')} href="" target="_blank">
                    Giới thiệu
                </a>
                <a className={cx('link')} href="" target="_blank">
                    Tiktok Browser
                </a>
            </Wrapper>
        </aside>
    );
}

export default Sidebar;
