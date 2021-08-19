<template>
    <div class="tab-bar-item" @click="itemClick" >
            <div class="item-icon" v-if="!isActive"><slot name="icon"></slot></div>
            <div class="item-icon-active" v-else><slot name="icon-active"></slot></div>
            <div class="item-text" :style="activeStyle" ><slot name="text"></slot> </div>
    </div>
</template>

<script>


export default {
    name: 'TabBarItem',
    data() {
        return {
            aa: false
        }
    },
    props: {
        link: {
            type: String,
            required: true
        },
    },
    computed: {

        isActive() {
            // console.log(this.$route.path);
            // console.log(this.link);
            // console.log(this.$route.path.indexOf(this.link));
            return this.$route.path.indexOf(this.link) !== -1
        },
        activeStyle() {
            return this.isActive ? {'color': 'red'} : {}
        }
    },
    methods: {
        itemClick() {
            // 点击后跳转对应link的路由
            this.$router.replace(this.link).catch(err => {err});
        }
    },
}
</script>

<style>
    .tab-bar-item {
    flex: 1;
    font-size: 14px;
    text-align: center;
  }
  .tab-bar-item img {
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
  }
  .item-text {
      font-size: 12px;
      margin-top: 3px;
      color: #333;
  }
</style>