import React, { useCallback } from 'react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hook';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputSearch = useRef();
    const debounceValue = useDebounce(searchValue, 600);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounceValue);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounceValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <HeadlessTippy
                render={(attrs) => (
                    <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                        <PopperWrapper menuTitle="Tài khoản">
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
                            setSearchValue(e.target.value.trimStart());
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

                    <button className={cx('search-btn')} onMouseDown={handleSubmit}>
                        <SearchIcon width="2.4rem" height="2.4rem" />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
