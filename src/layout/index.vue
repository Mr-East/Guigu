<template>
    <div class="layout_container">
        <!-- 侧边栏 -->
        <div class="layout_slider" >

            <logo></logo>
            <el-menu background-color="#001529" text-color="white" :default-active="$route.path" :collapse="layoutSettingStore.fold?true:false">
                <Menu :menuList="userStore.menuRoutes"></Menu>
            </el-menu> 
        </div>

        <!-- 头部导航栏 -->
        <div class="layout_tabbar " :class="{fold:layoutSettingStore.fold?true:false}">
            <Tabbar></Tabbar>
        </div>

        <!-- 主体内容展示区 -->
        <div class="layout_main" :class="{fold:layoutSettingStore.fold?true:false}">
            <Main></Main>   
        </div>

    </div>
</template>

<script setup lang="ts">
import logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '../store/modules/user';
import useLayoutSettingStore from '@/store/modules/setting.ts'

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

let $route = useRoute();
let userStore = useUserStore();
let layoutSettingStore = useLayoutSettingStore();


 onMounted(() => {
    console.log(layoutSettingStore.fold);
    
 })
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    .layout_slider{
        z-index: 0;
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background-color;
        transition: all .3s ;
     

        
    }
    .layout_tabbar{
        z-index: 1;
        position: fixed;
        top: 0;
        left: $base-menu-width;
        height: $base-menu-tabbar-height;
        width: calc(100% - $base-menu-width);
        background-color: white;
        transition: all .3s ;

        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout_main{
        position: absolute;
        top: $base-menu-tabbar-height;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-menu-tabbar-height);
        background-color: yellow;
        overflow: auto;
        padding: 20px;
        transition: all .3s ;

        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>