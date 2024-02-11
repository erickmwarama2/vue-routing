import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/teams',
            // component: TeamsList,
            meta: { needsAuth: true },
            components: {
                default: TeamsList,
                footer: TeamsFooter
            },
            children: [
                {
                    path: ':teamId',
                    component: TeamMembers,
                    props: true,
                }
            ]
        },
        {
            path: '/users',
            // component: UsersList,
            components: {
                default: UsersList,
                footer: UsersFooter,
            },
            beforeEnter(to, from, next) {
                console.log('users before enter');
                console.log(to);
                console.log(from);
                next();
            }
        },
        // {
        //     path: '/teams/:teamId',
        //     component: TeamMembers,
        //     props: true
        // },
        {
            path: '/',
            redirect: '/teams',
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        }
    ],
    linkActiveClass: 'active-url-link',
    scrollBehavior(_, _2, savedPosition) {
        // console.log(to);
        // console.log(from);
        // console.log(savedPosition);

        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                left: 0,
                top: 0
            };
        }
    }
});

router.beforeEach(function(to, from , next) {
    console.log('Global beforeEach');
    console.log(to);
    console.log(from);
    if (to.meta.needsAuth) {
        console.log('Needs Authentication');
    }
    // if (to.path == '/teams') {
    //     next('/users');
    // } else {
    //     next();
    // }
    next();
});

router.afterEach((to, from) => {
    console.log('Global After each hook');
    console.log(to);
    console.log(from);
});

export default router;