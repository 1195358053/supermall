<template>
  <div class="cart-list">
    <scroll class="cart_scroll" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem.vue"

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
      this.$refs.scroll.refresh()
  }
};
</script>

<style scope>
.cart-list {
    height: calc(100% - 44px - 49px - 40px);
}
.cart_scroll {
    height: 100%;
    overflow: hidden;
}

</style>