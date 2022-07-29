import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faPlus,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

import { MailIcon, MessageIcon } from '~/components/Icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/image';
import Search from '~/layouts/component/Search/index';
import config from '~/config/';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'Language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'Language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Phím tắt trên bàn phím',
        to: '',
    },
];
const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
        to: '/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faTiktok} />,
        title: 'Nhận xu',
        to: '/getcoin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
        to: '/setting',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        to: '/logout',
        separate: true,
    },
];
function Header() {
    const curentUser = false;

    //handle logic
    const handleMenuChange = (MenuItem) => {
        switch (MenuItem.type) {
            case 'Language':
                break;
            default:
        }
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </Link>
                <Search />

                <div className={cx('actions')}>
                    {curentUser ? (
                        <>
                            <Button medium leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                <span>Tải lên</span>
                            </Button>
                            <Tippy content="Tin nhắn" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Hộp thư" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <MailIcon width="3.2rem" height="3.2rem" />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                <span>Tải lên</span>
                            </Button>
                            <Button primary>
                                <span>Đăng nhập</span>
                            </Button>
                        </>
                    )}
                    <Menu
                        items={curentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {curentUser ? (
                            <Image
                                src="1https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/56661eb3e71ec6f35b3a89215fba913b~c5_100x100.jpeg?x-expires=1658563200&x-signature=03YB7l5Su%2BGmJZpO0CXT0KpAYB0%3D"
                                className={cx('user-avatar')}
                                alt="nguyen van a"
                                // onMouseDown={(e) => e.preventDefault()}
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
