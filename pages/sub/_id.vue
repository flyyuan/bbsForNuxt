<template>
  <div>
    <el-button 
      v-show="userState"
      style="float:right;margin-right:100px"
      type="primary" 
      @click="$router.push(`/newPost/${params.id}?parent=${query.parent}`)">新建帖子</el-button>
    <div v-if="postData.records.length > 0">
      <el-card 
        v-for="item in postData.records"
        v-show="item.state === 0"
        :key="item.id"
        class="box-card"
        shadow="hover"
      >
        <div 
          slot="header" 
          class="clearfix">
          <a 
            :href="`/post/${item.id}`" 
            target="blank">{{ item.title }}</a>
         
          <el-button
            v-show="userState" 
            style="float:right; padding: 3px 0;margin:0 3px"
            type="warning"
            @click="handleEditSubParent(item.id)"
          >编辑</el-button>
          <el-button 
            v-show="userState" 
            style="float:right; padding: 3px 0"
            type="danger"
            @click="handleDeleteSubParent(item.id)"
          >删除</el-button>
        </div>
        <p class="item"><span v-html="item.content" /> </p>
        <span style="float:right">{{ item.updateDate.replace('T',' ') }}</span>
        <span >用户ID：{{ item.adminId }}</span>
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
import { getPost, deletePost } from '~/plugins/api.js'
import { userState } from '~/plugins/user.js'

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
  data() {
    return {
      userState: false
    }
  },
  created: function() {
    this.userState = userState()
  },
  methods: {
    currentChange(item) {
      this.$router.push(`/sub/${this.params.id}?page=${item}`)
    },
    handleEditSubParent(id) {
      this.$router.push(
        `/newPost/${this.params.id}?parent=${this.query.parent}&postId=${id}`
      )
    },
    handleDeleteSubParent(id) {
      this.$notify({
        title: '删除中'
      })
      deletePost(id).then(rs => {
        this.$notify({
          title: rs.data.msg
        })
        this.$router.go(0)
      })
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
  max-height: 100px;
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
