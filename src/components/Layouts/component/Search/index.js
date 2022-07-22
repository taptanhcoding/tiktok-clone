import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [visible, setVisible] = useState(false);
    const inputSearch = useRef();
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3, 4]);
        }, 3000);
    }, []);
    return (
        <HeadlessTippy
            render={(attrs) => (
                <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>account</h4>
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
                    </PopperWrapper>
                </div>
            )}
            visible={visible && searchValue.length > 0 ? true : false}
            onClickOutside={() => setVisible(false)}
            interactive={true}
        >
            <div className={cx('search')}>
                <input
                    ref={inputSearch}
                    placeholder="Search account and videos"
                    spellCheck={false}
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setVisible(true);
                    }}
                    onFocus={() => setVisible(true)}
                />

                {searchValue.length > 0 && (
                    <button
                        className={cx('clear-btn')}
                        onClick={() => {
                            setSearchValue('');
                            inputSearch.current.focus();
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
                <button
                    className={cx('search-btn')}
                    onClick={() => setSearchResult((prev) => [...prev, searchValue])}
                >
                    <SearchIcon width="2.4rem" height="2.4rem" />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
