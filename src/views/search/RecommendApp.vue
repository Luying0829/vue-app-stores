<script lang="ts">
  import { ref, reactive, onMounted } from "vue";
  import { useRouter } from 'vue-router'
  import Divider from '../../components/common/Divider.vue'
  import { RecommendApi } from '../../request/api'
  export default {
    name: "RecommendApp",
    components:{ Divider },
    setup(){
      const router = useRouter()
      const limitSize = ref(10)
      const recommendData = reactive({
        value: {}
      })
      let titleLists = ref([])
      const methods = {
        async getRecommends(limit) {
          await RecommendApi(limit).then(res => {
            if(res && res.feed && res.feed.entry){
              recommendData.value = res.feed.entry
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
      const handleData = () => {
        let arr = recommendData.value.map( i => {
          return {
            id: i.id.attributes['im:id'],  //id
            title: i.title.label,  // 标题
            type: i.category.attributes.label, // 类目
            imgSrc: i['im:image'][0].label // 图片路径
          }
        })
        titleLists.value.push(arr)
      }

      function goDetailHandle(id: string) {
        router.push({path: '/appDetail', query: { id }})
      }
      const queryData = async () => {
        await methods.getRecommends({limitSize: limitSize.value})
        handleData()
      }
      onMounted(async()=>{
        queryData()
      })
      return {
        limitSize,
        recommendData,
        titleLists,
        handleData,
        goDetailHandle
      }
    }
  }
</script>
  
  <template>
    <div class="recommend">
      <h3 class="recommend-h3 weight">Recommend</h3>
      <div class="recommend-slide">
        <div class="recommend-boxs" v-for="(item, index) in titleLists[0]" :key="index">
        <div class="recommend-box" @click="goDetailHandle(item.id)">
          <img class="recommend-img" :src="item.imgSrc" alt="">
          <h4 class="text recommend-h4 weight" >{{ item.title }}</h4>
          <p class="text recommend-dec" >{{ item.type }}</p>
        </div>
        </div>
      </div>
    </div>
    <Divider />
  </template>
  
  <style scoped>
  .recommend-slide{
    height: 130px;
    display:flex;
    overflow-x: auto;
  }
  .recommend-slide::-webkit-scrollbar {
    display: none;
  }
  .recommend-boxs{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin: 8px 6px 4px 0;
  }
  .recommend-img{
    width: 70px;
    height: 70px;
    border-radius: 10px;
  }
  .text{
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .recommend-h3{
    font-size: 16px;
    height: 20px;
    line-height: 20px;
  }
  .recommend-h4{
    font-size: 16px;
    width: 70px;
    height: 20px;
  }
  .recommend-dec{
    font-size: 12px;
    width: 80px;
  }
  </style>
  