<script lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter } from "vue-router"
import Divider from '../../components/common/Divider.vue'
import { allDatasApi } from '../../request/api'
import RecommendApp from '../../../src/views/search/RecommendApp.vue'
import AppLists from '../../../src/views/search/AppLists.vue'

export default {
  components: {
    RecommendApp,
    AppLists,
    Divider 
  },
  setup(){
    const router = useRouter()
    const time = ref(null) // 防抖节流
    let searchVal = ref('')
    let closeSearch = ref(false)
    let cancleSearch = ref(false)
    let showSearchs = ref(false) //下拉框显示
    let searchHistoryList = reactive([//下拉列表显示
      {
        id: null,
        name: null
      }
    ])
    let searchAllDatas = reactive([])
    let searchAllList = reactive([])
    const initData = (()=>{
      searchVal.value = ''
      showSearchs.value = false
      searchHistoryList.length = 0
    })
    function focusHandle() {
      cancleSearch.value = true
    }
    // function blurHandle(){}
    function closeSearchHandle() {
      initData()
    }
    function cancleHandle() {
      cancleSearch.value = false
      initData()
    }
    // 实时搜索
    function searchHandle (val:string) {
      searchHistoryList.length = 0
      searchAllList.forEach((k: any) => {
        let item = Object.values(k)
        // toUpperCase()
        if (val && item[0][0].toLowerCase().includes(val)) {
          searchHistoryList.push(
            {
              name: item[0][0],
              id: item[1]
            }
          )
        }
      })
    }
    // 左侧搜索按钮事件
    function searchClickHandle() {
      searchHandle(searchVal.value)
    }
    // 跳转到详情页面
    function chooseHandle(id: string) {
      router.push({path: '/appDetail', query: { id }})
    }
    // 获取所有数据,将数据处理成name的数组
    const methods = {
      getAllDatas(){
        allDatasApi().then(res => {
          if(res && res.feed && res.feed.entry){
            searchAllDatas = res.feed.entry
            for (let i = 0; i < searchAllDatas.length; i++) {
              const values = Object.values(searchAllDatas[i])
              let ids = Object.values(Object.values(values[8])[1])[0]
              searchAllList.push(
                {
                  name: Object.values(values[0]),
                  id: ids
                }
              )
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
    onMounted(async () => {
      await methods.getAllDatas()
    })
    watch(searchVal, (newVal) => {
      if (newVal) {
        closeSearch.value = true
        showSearchs.value = true
        searchHandle(newVal)
      } else {
        closeSearch.value = false
        showSearchs.value = false
        searchHistoryList.length = 0
      }
    })

    return {
      searchVal,
      showSearchs,
      closeSearch,
      cancleSearch,
      searchAllDatas,
      searchAllList,
      searchHistoryList,
      focusHandle,
      // blurHandle,
      cancleHandle,
      searchHandle,
      closeSearchHandle,
      searchClickHandle,
      chooseHandle
    }
  }
}

</script>

<template>
  <div class="search-input-box">
    <div class="search-input">
      <img class="search" src="@/assets/search.svg" width="20" height="20" @click="searchClickHandle"/>
      <input 
        class="input-inner"
        v-model="searchVal"
        placeholder="Search..."
        @focus="focusHandle"
      />
      <!-- @blur="blurHandle" -->
      <img v-show="closeSearch" class="close-search" src="@/assets/closeSearch.svg" width="20" height="20" @click="closeSearchHandle"/>
    </div>
    <p v-if="cancleSearch" class="cancle-p" @click="cancleHandle">取消</p>
  </div>
  <div class="search-list" v-show="showSearchs">
    <div v-show="searchHistoryList.length">
      <li class="list-li" v-for="(item,index) in searchHistoryList" :key="index" @click="chooseHandle(item.id)">
        {{ item.name }}
        <Divider />
      </li>
    </div>
    <div class="text-center" v-show="!searchHistoryList.length">暂无数据</div>
  </div>
  <Divider /> 
  <RecommendApp v-if="!showSearchs"/>
  <AppLists v-if="!showSearchs"/>
</template>

<style scoped>
  .search-input-box{
    height: 50px;
    display: flex;
    align-items: center;
    z-index: 999;
    background: #fff;
    overflow: visible;
    position: sticky;
    top:0;
  }
  .search-input{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100vw;
    padding: 0 6px;
    height: 32px;
    font-size: 16px;
    border-radius: 12px;
    /* background: var(--color-background); */
    background: #efefef;
    overflow: hidden;
  }
  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: var(--color-background);
    color: var(--color-text);
    outline: 0;
  }
  .input-inner::placeholder {
    color: #ccc;
  }
  .cancle-p{
    width: 40px;
    text-align: center;
  }
  .search-list{
    overflow: hidden;
    width: 100vw;
    height: calc(100vh - 120px);
    background: #fff;
    padding-top: 10px;
    z-index: 9999;
  }
  .list-li{
    padding:0 12px 0;
  }
</style>
