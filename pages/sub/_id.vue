<template>
  <div>
    <div v-if="postData.records.length > 0">
      <el-card 
        v-for="item in postData.records"
        :key="item.id"
        class="box-card"
        shadow="hover"
      >
        <div 
          slot="header" 
          class="clearfix">
          <nuxt-link
            :to="`/post/${item.id}`"
          >  <span>{{ item.title }}</span></nuxt-link>
          <el-button 
            style="float: right; padding: 3px 0" 
            type="text">操作按钮</el-button>
        </div>
        <p class="item"><span v-html="item.content" /> </p>
        <span style="float:right">{{ item.updateDate.replace('T',' ') }}</span>
      </el-card>
      <el-pagination
        :current-page="parseInt(query.page)"
        :total="postData.total"
        background
        layout="prev, pager, next"
        @current-change="currentChange"/>
    </div>
    <div v-else>
      这里还没有帖子哦~
    </div>
  </div>
</template>
<script>
import { getPost } from '~/plugins/api.js'
export default {
  watchQuery: ['page'],
  asyncData({ params, query, error }) {
    console.log(query)
    return getPost(query.page, 10, params.id).then(rs => {
      console.log(rs.data.data)
      return {
        query: query,
        params: params,
        postData: rs.data.data
      }
    })
  },
  methods: {
    currentChange(item) {
      //   console.log(item)
      this.$router.push(`/sub/${this.params.id}?page=${item}`)
    }
  }
}
</script>
<style scoped>
.box-card {
  margin: 0 20%;
  min-height: 100px;
  margin-bottom: 10px;
}
.el-pagination {
  float: right;
  margin-top: 10px;
}
a {
  text-decoration: none;
}
.text {
  font-size: 14px;
}

.item {
  margin: 0 0 18px 20px;
  display: block;
}
p {
  width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
