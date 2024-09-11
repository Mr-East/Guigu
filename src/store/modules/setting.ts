import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore('SettingStore', {

    state: () => {
        return {
            fold:false,
            refresh:false,
        }
    },
    actions: {
        toggleFold() {
            this.fold = !this.fold
        }
    }
}
)

export default useLayoutSettingStore;