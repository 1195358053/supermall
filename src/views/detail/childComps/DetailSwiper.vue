<template>
    <swiper class="swiperr">
      <swiper-item v-for="(item, index) in topImages" :key="index">
          <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    //   console.log(this.topImages)
  }
};
</script>

<style>
.swiperr {
    height: 300px;
    overflow: hidden
}
</style>