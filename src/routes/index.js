import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import { HeaderOnly } from '~/components/Layouts';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/following',
        component: Following,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/search',
        component: Search,
    },
    {
        path: '/upload',
        component: Upload,
        layout: HeaderOnly,
    },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
