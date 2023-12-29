<script lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import { SearchInputApi } from '../../request/api'
export default {
    name: "appDetails",
    setup(){
      const route = useRoute()
      let appInfos = ref([])
      const methods = {
        // 拿id调用接口获取详情
        getStarInfos( id ) {
          SearchInputApi(id).then(res => {
            if(res && res.results){
              appInfos.value = res.results
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
      onMounted(async() =>{
        await methods.getStarInfos({id: route.query.id})
      })
      return {
        appInfos
      }
    }
  }
</script>

<template>
<div class="details">
  <h3 class="detail-h3 weight">页面详情</h3>
  <div class="detail-slide">
    <div class="detail-boxs" v-for="(item,index) in appInfos" :key="index">
    <div class="detail-box">
      <img class="detail-img" :src="item.artworkUrl512" alt="">
      <div class="appLists-box">
        <h4 class="detail-h4 weight" >{{ item.trackName }} </h4>
        <p class="detail-dec">{{ item.userRatingCount }}</p>
      </div>
    </div>
      <p class="detail-dec" >{{ item.description }}</p>
    </div>
  </div>
</div>
</template>
<style scoped>
  .detail-slide{
    width: 100vw;
    height: 100vh;
  }
  .detail-h3{
    font-size: 16px;
    height: 20px;
    line-height: 20px;
  }
  .detail-dec{
    font-size: 15px;
  }
  .detail-box{
    display: flex;
    box-sizing: border-box;
    margin: 8px 6px 4px 0;
  }
  .appLists-box{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .detail-boxs{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 8px 6px 4px 0;
  }
  .detail-img{
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
  .text{
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .detail--h3{
    font-size: 16px;
    height: 20px;
    line-height: 20px;
  }
  .detail-h4{
    font-size: 16px;
    height: 20px;
  }
</style>
