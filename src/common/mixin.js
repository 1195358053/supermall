import { debounce } from "./utils.js"
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null,
            isShowBackTop: false
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemImgListener = () => {
            this.newRefresh;
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
        console.log('我是混入')
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 1500);
        },
        listenShowBackTop(position) {
            // 1.判断BackTop是否显示
            this.isShowBackTop = -position.y > 1000;
        }
    }
}