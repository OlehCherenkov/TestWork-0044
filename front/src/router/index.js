import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../middleware/auth'

// Admin

// Auth
import Login from '../views/Admin/Auth/Login'

// Clients
import Clients from '../views/Admin/Clients/Clients';
import ClientsList from '../views/Admin/Clients/Index';
import CreateClient from '../views/Admin/Clients/Create';
import EditClient from '../views/Admin/Clients/Edit';

// Pets
import Pets from '../views/Admin/Pets/Pets';
import PetsList from '../views/Admin/Pets/Index';
import CreatePet from '../views/Admin/Pets/Create';
import EditPet from '../views/Admin/Pets/Edit';

// Reports
import Reports from '../views/Admin/Reports/Reports';
import ReportsList from '../views/Admin/Reports/Index';
import CreateReport from '../views/Admin/Reports/Create';
import EditReport from '../views/Admin/Reports/Edit';

Vue.use(VueRouter)

const routes = [
    {
        path: '/admin/login',
        alias: '/admin',
        name: 'admin-login',
        component: Login
    },
    {
        path: '/admin/clients',
        component: Clients,
        meta: {
            middleware: [auth],
        },
        children: [
            {
                path: '',
                name: 'admin-clients',
                component: ClientsList,
                meta: {
                    middleware: [auth],
                    title: 'Clients'
                }
            },
            {
                path: 'create',
                name: 'admin-create-client',
                component: CreateClient,
                meta: {
                    middleware: [auth],
                    title: 'Creating client'
                }
            },
            {
                path: 'edit/:id',
                name: 'admin-edit-client',
                component: EditClient,
                meta: {
                    middleware: [auth],
                    title: 'Editing client',
                    errorRedirect: 'admin-clients'
                }
            },
        ]
    },
    {
        path: '/admin/pets',
        component: Pets,
        meta: {
            middleware: [auth],
        },
        children: [
            {
                path: '',
                name: 'admin-pets',
                component: PetsList,
                meta: {
                    middleware: [auth],
                    title: 'Pets'
                }
            },
            {
                path: 'create',
                name: 'admin-create-pet',
                component: CreatePet,
                meta: {
                    middleware: [auth],
                    title: 'Creating pet'
                }
            },
            {
                path: 'edit/:id',
                name: 'admin-edit-pet',
                component: EditPet,
                meta: {
                    middleware: [auth],
                    title: 'Editing pet',
                    errorRedirect: 'admin-pets'
                }
            },
        ]
    },
    {
        path: '/admin/reports',
        component: Reports,
        meta: {
            middleware: [auth],
        },
        children: [
            {
                path: '',
                name: 'admin-reports',
                component: ReportsList,
                meta: {
                    middleware: [auth],
                    title: 'Reports'
                }
            },
            {
                path: 'create',
                name: 'admin-create-report',
                component: CreateReport,
                meta: {
                    middleware: [auth],
                    title: 'Creating report'
                }
            },
            {
                path: 'edit/:id',
                name: 'admin-edit-report',
                component: EditReport,
                meta: {
                    middleware: [auth],
                    title: 'Editing report',
                    errorRedirect: 'admin-reports'
                }
            },
        ]
    },
    {
        path: '*',
        redirect: '/admin/clients',
        meta: {
            middleware: [auth],
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes
})

function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    if (!subsequentMiddleware) return context.next;
    return (...parameters) => {
        context.next(...parameters);
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];
        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);
        return middleware[0]({ ...context, next: nextMiddleware });
    }
    return next();
});

export default router
