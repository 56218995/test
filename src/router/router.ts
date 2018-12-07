declare global {
    interface System {
      import (request: string): Promise<any>
    }
    var System: System
}
import login from '../views/login.vue'
import home from '../views/home/home.vue'
import main from '../views/main.vue'
export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('../components/lockscreen/components/locking-page.vue')
};
export const loginRouter = {
    path: '/',
    name: 'login',
    meta: {
        title: 'LogIn',
        hideInMenu: true
    },
    component:()=>import('../views/login.vue')
};
export const otherRouters={
    path:'/main',
    name:'main',
    permission:'',
    meta:{icon: 'logo-buffer',title:'Setting'},
    icon:'&#xe68a;',
    component:main,
    children:[
        {path: 'home', meta:{title:'HomePage'}, name: 'home', component:()=>import('../views/home/home.vue')}
    ]
}
export const appRouters=[{
    path:'/setting',
    name:'setting',
    permission:'',
    meta:{
        icon: 'logo-buffer',
        title:'Setting'
    },
    icon:'&#xe68a;',
    component:main,
    children:[
        {
            path: 'user',
            permission:'Pages.Users',
            icon: 'md-trending-up',
            meta:{                
                title:'Users'
            }, 
            name: 'user', 
            component:()=>import('../views/setting/user/user.vue')
        },
        {
            path: 'role',
            permission:'Pages.Roles',
            icon: 'ios-infinite',
            meta:{                
                title:'Roles'
            },
            name: 'role', 
            component:()=>import('../views/setting/role/role.vue')
        },
        {
            path: 'tenant',
            permission:'Pages.Tenants',
            icon: 'md-crop',
            meta:{ title:'Tenants'},
            name: 'tenant', 
            component:()=>import('../views/setting/tenant/tenant.vue')
        }
    ]
}]
export const routers = [
    loginRouter,
    locking,
    ...appRouters,
    otherRouters
];
