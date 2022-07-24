import React from 'react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import * as searchServices from '~/apiServices/searchServices';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hook';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputSearch = useRef();
    const debounce = useDebounce(searchValue, 800);

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounce);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounce]);

    return (
        <HeadlessTippy
            render={(attrs) => (
                <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>account</h4>
                        {searchResult.map((result) => (
                            <AccountItem
                                key={result.id}
                                data={result}
                                onClick={() => setSearchValue('')}
                            />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            visible={visible && searchResult.length > 0 ? true : false}
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

                {searchValue.length > 0 && !loading && (
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

                {loading && (
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                )}

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
