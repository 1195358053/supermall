<template>
  <div ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll: null      
        }
    },
    mounted() {
        //1.创建scroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad,
            click: true,
            observeDOM: true
        })

        // 2.监听滚动的位置
        if(this.probeType === 2 || this.probeType === 3){
            this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position);
        })
        }
        if(this.pullUpLoad) {
            this.scroll.on('pullingUp',() => {
                this.$emit('pullingUp')
            })
        }
        // this.scroll.on('pullingUp', () => {
        //     this.$emit('pullingUp')
        // })
    },
    methods: {
        scrollTo(x, y, time=1500) {
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll.finishPullUp()
        },
        refresh() {
            // console.log('a')
            this.scroll && this.scroll.refresh()
            console.log('图片刷新')
        }
    }
}
</script>

<style>

</style>