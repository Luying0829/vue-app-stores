<script lang="ts">
  import { reactive, onMounted, onUnmounted } from "vue";
  import { useRouter } from 'vue-router'
  import Divider from '../../components/common/Divider.vue'
  import { SearchInputApi, AppListsApi } from '../../request/api'
  export default {
    name: "RecommendApp",
    components:{ Divider },
    setup(){
      const router = useRouter()
      let showList = reactive([]) // 用于渲染的数据
      let appList: any[] = [] // 第一个接口的数据
      let starList: any[] = [] // 获取星级和评论数的数据
      let ids = [] // 参数
      // const getImgUrl = (url) => {
      //   return new URL(`../../../assets/img/${code}.png`, import.meta.url).href
      // }
      // 下拉滚动
      const scrollDatas = reactive({
        limitSize: 10, // 每页数量
        loading: false // 是否正在加载
      })
      const methods = {
        async getAppLists(limit: {limit: string}){
          await AppListsApi(limit).then(res => {
            if (res && res.feed && res.feed.entry) {
              appList.push(...res.feed.entry) // 拿到第一个接口的数据
            }
          })
        },
        // 拿id调用接口获取星级+评论数信息
        async getStarInfos(id: {id: string }) {
          await SearchInputApi(id).then(res => {
            if (res && res.results && res.results.length) {
              starList.push(...res.results); // 拿到第二个星级+评论数信息的数据
            }
          })
        }
      }
      // 加载数据
      const loadData = async () => {
        scrollDatas.loading = true // 开始加载数据
        scrollDatas.limitSize +=10
        queryData() // 1.获取数据
        // await methods.getAppLists({ limitSize:scrollDatas.limitSize })
        // let idsStr = getIds(); // 获取id字符串
        // await methods.getStarInfos({id: idsStr})
        // handleData() // 处理数据
        scrollDatas.loading = false // 加载完成
      }
      // 监听滚动事件
      const handleScroll = () => {
        const container = document.querySelector('.infinite-scroll') // 获取滚动容器
        const { scrollTop, scrollHeight, clientHeight } = container // 获取滚动高度和内容高度
        if (scrollTop + clientHeight >= scrollHeight && !scrollDatas.loading) {
          loadData() // 滚动到底部，加载更多数据
        }
      }
      // 1.获取数据
      const queryData = async () => {
        await methods.getAppLists({limitSize: scrollDatas.limitSize})
        let idsStr = getIds() // 获取id字符串
        await methods.getStarInfos({id: idsStr})
        handleData() // 处理数据
      }
      // 2.获取ids
      const getIds = () => {
        ids = appList.map(v => v.id.attributes['im:id']) // 处理星级评论需要用到的参数
        return ids.join(',') // 数组转字符串，拼接逗号
      }
      // 3.处理数据 appList和starList，开始拼接数据
      const handleData = async () => {
        appList.forEach(appItem => {
          starList.forEach(starItem => {
            if (appItem.id.attributes['im:id'] == starItem.trackId) { // 匹配到数据，开始让appList塞数据
              appItem.averageUserRating = starItem.averageUserRating // 星级
              appItem.userRatingCount = starItem.userRatingCount // 评论数
            }
          })
        })
        let mapAppList = appList.map(v => {
          return {
            id: v.id.attributes['im:id'], // 标题
            name: v['im:name'].label, // 名称
            image: v['im:image'][0].label, // 图片
            contentType: v['im:contentType'].attributes.label, // 类型
            averageUserRating: Math.floor(v.averageUserRating), // 星级
            userRatingCount: v.userRatingCount // 评论数
          }
        })
        showList.push(...mapAppList)
      }

      onMounted(async () => {
        queryData(); // 1.获取数据
        const scrollEle = document.querySelector('.infinite-scroll')
        scrollEle && scrollEle.addEventListener('scroll', handleScroll)
      })

      onUnmounted(() => {
        const scrollEle = document.querySelector('.infinite-scroll')
        scrollEle && scrollEle.removeEventListener('scroll', handleScroll)
      })

      function goDetailHandle(id: string) {
        router.push({path: '/appDetail', query: { id }})
      }

      return {
        showList,
        scrollDatas,
        goDetailHandle,
        loadData,
        handleScroll
      }
    }
  }
</script>
  
  <template>
    <div class="appLists infinite-scroll">
      <div class="appLists-list" v-for="(value, key) in showList" :key="key">
        <div class="appLists-box" @click="goDetailHandle(value.id)">
          <p class="appLists-index">{{ key + 1 }}</p>
          <img
            :class="['appLists-img', (key + 1) % 2 == 0 ? 'radius': '']" 
            :src="value.image" alt="" />
          <div class="appLists-text">
            <h5 class="appLists-h5 weight">{{ value.name}}</h5>
            <p class="appLists-dec" >{{ value.contentType}}</p> 
            <div class="appLists-star-box">
              <div class="appLists-star" v-if="value.averageUserRating">
                <img
                v-for="(val,idx) in value.averageUserRating" :key="idx"
                :class="['appLists-star', val > idx ? '' : '1' ]" 
                src="@/assets/star.svg" 
                width="14" height="14" />
              </div>
              <div class="appLists-star" v-else>
                <img src="@/assets/noStar.svg" width="14" height="14" />
              </div>
              <p class="appLists-num" >{{ value.userRatingCount }}</p>
            </div>
          </div>
        </div>
        <Divider />
      </div>
      <div v-if="scrollDatas.loading">正在加载中...</div>
    </div>
    <Divider />
  </template>
  
  <style scoped>
  .appLists-slide::-webkit-scrollbar {
    display: none;
  }
  .appLists-box{
    height: 80px;
    width: 100vw;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .appLists-img{
    width: 55px;
    height: 55px;
    border-radius: 10px;
    /* border-radius: v-bind(borRadius); */
    margin: 10px;
  }
  .appLists-img.radius{
    border-radius: 50%;
  }
  .appLists-text{
    display: flex;
    flex-direction: column;
  }
  .appLists-h5{
    height: 20px;
    font-size: 14px;
  }
  .appLists-dec{
    height: 18px;
    font-size: 12px;
  }
  .appLists-star-box{
    display: flex;
    align-items: center;
  }
  .appLists-num{
    font-size: 10px;
  }
  .infinite-scroll {
    overflow: auto;
    max-height: calc(100vh - 300px);
  }
  </style>
  