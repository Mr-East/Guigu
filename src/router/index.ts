import { createRouter, createWebHashHistory } from "vue-router";
import { constRoute } from "./routes";
let router = createRouter({
    history: createWebHashHistory(),
    routes: constRoute,
    scrollBehavior(){
        return{
            left:0,
            top:0
        }
    }
});



export default router; 