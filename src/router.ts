import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes = <RouteRecordRaw[]>[
    {
        path: "/",
        name: "home",
        component: () => import("@/pages/index.vue"),
        meta: {
            title: "Where in the world?",
        },
	},
	{
		path: "/:code",
		name: "country-detail",
		component: () => import("@/pages/CountryDetail.vue"),
		props : true,
		meta: {
			title : "Country Detail"
		},
	},
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("@/pages/NotFound.vue"),
        meta: {
            title: "404 Not Found",
        },
    },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

router.afterEach((to, _) => {
	document.title = (to.meta.title as string) ?? 'Where in the world?';
});

export default router;