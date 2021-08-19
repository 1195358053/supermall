<template>
  <div class="goods" >
      <goods-list-item v-for="(items, index) in goodss" :key="index" :goodsItem="items">
          <!-- {{item.show.img}} -->
      </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
    name: 'GoodsList',
    components: {
        GoodsListItem
    },
    props: {
        goodss: {
            type: Array,
            default() {
                return [] 
            }
        }
    },
    

}
</script>

<style>
    .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>