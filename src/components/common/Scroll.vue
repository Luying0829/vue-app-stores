<template>
  <div class="infinite-scroll">
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.title }}</li>
    </ul>
    <div v-if="loading">正在加载中...</div>
  </div>
</template>

<script>
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
  export default defineComponent({
    setup() {
      const currentPage = ref(1) // 当前页码
      const pageSize = 10 // 每页数量
      const list = ref([]) // 应用App列表
      const loading = ref(false) // 是否正在加载
      const loadData = async () => { // 加载数据
        loading.value = true // 开始加载数据
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage.value}&_limit=${pageSize}`)
        list.value = [...list.value, ...response.data] // 将数据添加到列表中
        currentPage.value++ // 增加页码
        loading.value = false // 加载完成
      }
      const handleScroll = () => { // 监听滚动事件
        const container = document.querySelector('.infinite-scroll') // 获取滚动容器
        const { scrollTop, scrollHeight, clientHeight } = container // 获取滚动高度和内容高度
        if (scrollTop + clientHeight >= scrollHeight && !loading.value) {
          loadData() // 滚动到底部，加载更多数据
        }
      }
      onMounted(() => {
        window.addEventListener('scroll', handleScroll)
      })

      onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
      })
      return {
        currentPage,
        pageSize,
        list,
        loading,
        loadData,
        handleScroll
      }
    }
  })
</script>
