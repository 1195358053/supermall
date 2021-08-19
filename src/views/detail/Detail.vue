<template>
  <div id="detail" >
     <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"></detail-nav-bar>
     <scroll class="contentt" ref="scroll" @scroll="contentScroll" :probe-type="3">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shops"></detail-shop-info>   
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>  
        <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
        <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
        <goods-list :goodss="recommendInfo" ref="recommend"></goods-list>


    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <!-- <toast :isMessage="isMessage" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComps/DetailNavBar";
import DetailSwiper from "views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "views/detail/childComps/DetailCommentInfo"
import GoodsList from "components/content/goods/GoodsList"
import DetailBottomBar from "views/detail/childComps/DetailBottomBar"
// import Toast from "components/common/toast/Toast"
import {debounce} from "common/utils.js"

import Scroll from "components/common/scroll/Scroll";
import {itemListenerMixin, backTopMixin} from "common/mixin.js"
import { getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
// import {mapActions} from 'vuex'
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // isMessage: '',
      // show: false, 
    };
  },
  created() {
    // 1.保存存入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 1.获取顶部轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages)

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(this.goods)

         // 3.创建店铺信息
        this.shops = new Shop(data.shopInfo);
        //   4.获取商品详细信息
        this.detailInfo = data.detailInfo;
        // console.log(this.detailInfo)
        // 5.获取参数详细信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // console.log(this.paramInfo)
        // 6.获取评论信息
        if(data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
            console.log(data)
        }
       
      // this.$nextTick(() => {
      //   这个函数是根据最新的数据渲染完DOM后的回调函数。 此时图片还未加载完
      //     this.themeTopYs.push(0);  
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log('12311')
      // console.log(this.$refs.param.$el.offsetTop)
      // })
    });

    // 请求推荐数据
    getRecommend().then(res => {
        // console.log('Detail组件recommend数据')
        // console.log(res);
        this.recommendInfo = res.data.list
    })

    // 给getThemeTop赋值
     this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);  
      this.themeTopYs.push(this.$refs.param.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs)
    }, 100) 
  },
  methods: {
     
      imageLoad() {
          // this.$refs.scroll.refresh()
          this.newRefresh()
        //   console.log('--')
       this.getThemeTopY()
      },
      titleClick(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1500)
      },
      contentScroll(position) {

        // [0, 14081, 14975, 15187]
        const positionY = -position.y;
        let length = this.themeTopYs.length;
        for(let i = 0; i < length - 1; i++){
          //下标0-2   positionY >= themeTopYs[i] && positionY < themeTopYs[i+1]
          //下标3     positionY > this.themeTopYs[i]
          //判断过于频繁   不等于该数值时在进入判断语句     
          if((this.currentIndex !== i && i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ) {
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.navbar.currentIndex = this.currentIndex
          }
        }

        this.listenShowBackTop(position)
      },
      addCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // console.log(this.goods)
        // 1.将商品添加到购物车
        // this.$store.cartList.push(product)
        this.$store.dispatch('addCart', product).then(res => {
          // 2.映射写法
        // this.addCart(product).then(res => {
        //   console.log(res)

        
          // 封装
          // this.show = true;
          // this.isMessage = res;

          // setTimeout(() => {
          //   this.show = false;
          //   this.isMessage= ''
          // }, 1000);

          this.$toast.Show(res, 2000);
        // })
        
        })
      }
  },
  mounted() {
      
  },
  
  destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener) 
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;

  z-index: 999;
}
.detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
    
}
.contentt {
    height: calc(100% - 44px);
    /* overflow: hidden; */
}
</style>