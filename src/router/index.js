import { createRouter, createWebHashHistory } from "vue-router";
// import App from "../App.vue";
import Home from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
//import Content from "../views/Content.vue";

const routes = [{
        path: "/dashboard",
        name: "dashboard",
        children: [{
                path: ':type/:menu',
                component: () =>
                    import ("../views/Content.vue")
            },
            {
                path: 'home',
                component: () =>
                    import ("../views/Home.vue")
            }
        ],
        component: Home
    },
    {
        path: "/",
        name: "login",
        component: Login,
    }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});

export default router;