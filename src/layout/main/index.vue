<template>

    <router-view v-slot="{ Component}">
        <Transition name="fade">
            <component  :is="Component" v-if="flag" />
        </Transition>

    </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting.ts'
import {ref,watch,nextTick} from 'vue'

const flag = ref(true)

let layoutSettingStore = useLayoutSettingStore()

watch(()=>layoutSettingStore.refresh,()=>{
    flag.value = false
    nextTick(()=>{
        flag.value = true
    })
})



</script>



<style scoped lang="scss">



.fade-enter-from{
    opacity: 0;
}
.fade-enter-active
 {
    transition: opacity 0.5s ease;
}
.fade-enter-to {
    opacity: 1;
}
</style>