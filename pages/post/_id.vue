<template>
  <div>
    <div v-if="postData.title.length > 0">
      <el-card 
        class="box-card"
        shadow="hover"
      >
        <div 
          slot="header" 
          class="clearfix">
          <span>{{ postData.title }}</span>
          <el-button 
            style="float: right; padding: 3px 0" 
            type="text">操作按钮</el-button>
        </div>
        <p class="item"><span v-html="postData.content" /> </p>
      </el-card>
      <div v-if="postReply.records.length > 0">
        <el-card 
          v-for="item in postReply.records"
          :key="item.id"
          shadow="hover"
          class="box-card-reply"
        >
          <div 
            slot="header" 
            class="clearfix">
            <el-button 
              style="float: right; padding: 3px 0" 
              type="text">操作按钮</el-button>
          </div>
          <p class="item">
            <span v-html="item.content" />
          </p>
          <span style="float:right">{{ item.updateDate.replace('T',' ') }}</span>
        </el-card>
      </div>
      <el-pagination
        :current-page="parseInt(query.page)"
        :total="postReply.total"
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
import { getPostOne, getPostReply } from '~/plugins/api.js'
export default {
  watchQuery: ['page'],
  asyncData({ params, query, error }) {
    console.log(query.page)
    let postData
    let postReply
    return getPostOne(params.id).then(rs => {
      postData = rs.data.data
      return getPostReply(params.id, query.page, 10).then(rs => {
        postReply = rs.data.data
        return {
          query: query,
          params: params,
          postData: postData,
          postReply: postReply
        }
      })
    })
  },
  methods: {
    currentChange(item) {
      //   console.log(item)
      this.$router.push(`/post/${this.params.id}?page=${item}`)
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
.box-card-reply {
  margin: 0 20%;
  min-height: 100px;
  margin-bottom: 10px;
  background-color: rgb(245, 245, 245);
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
</style>
