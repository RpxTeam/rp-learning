import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'
import Courses from '../pages/courses'
import MyCourses from '../pages/myCourses'
import Dashboard from '../pages/admin/dashboard'
import AdminUsers from '../pages/admin/users/list'
import CreateUsers from '../pages/admin/users/create'
import ViewUsers from '../pages/admin/users/view'
import NoMatch from '../pages/noMatch'

const routes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: Home
    },
    {
        path: '/login/:social',
        exact: false,
        auth: false,
        component: Home
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/forgot-password',
        exact: true,
        auth: false,
        component: ForgotPassword
    },
    {
        path: '/reset-password/:token/:email',
        exact: true,
        auth: false,
        component: ResetPassword
    },
    {
        path: '/courses',
        exact: true,
        auth: false,
        component: Courses
    },
    {
        path: '/my-courses',
        exact: true,
        auth: true,
        component: MyCourses
    },
    {
        path: '/dashboard',
        exact: true,
        auth: true,
        component: Dashboard
    },
    {
        path: '/admin/users',
        exact: true,
        auth: true,
        component: AdminUsers
    },
    {
        path: '/admin/users/create',
        exact: true,
        auth: true,
        component: CreateUsers
    },
    {
        path: '/admin/users/:id',
        exact: true,
        auth: true,
        component: ViewUsers
    },
    {
        path: '',
        exact: true,
        auth: false,
        component: NoMatch
    },
];

export default routes;