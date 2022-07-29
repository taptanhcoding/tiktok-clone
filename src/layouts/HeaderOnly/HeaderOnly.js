import PropTypes from 'prop-types';
import Header from '~/layouts/component/Header';

import classNames from 'classnames/bind';
import styles from '../DefaultLayout/DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HeaderOnly;
