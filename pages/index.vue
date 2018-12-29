<template>
  <el-container>
    <el-header>
      <el-radio-group 
        v-model="tabPosition" >
        <el-radio-button 
          v-for="item in parent" 
          :key="item.id" 
          :label="item.id">{{ item.name }}</el-radio-button>
      </el-radio-group>
      <el-tabs 
        v-model="activeName" 
        @tab-click="handleClick">
        <el-tab-pane 
          v-for="item in sub" 
          :label="item.name" 
          :name="item.id.toString()" 
          :key="item.id"/>
    </el-tabs></el-header>
    <el-main>
      <el-card
        v-for="item in post.records"
        :key="item.id"
        class="box-card"
      >
        <div 
          slot="header" 
          class="clearfix">
          <span>{{ item.title }}</span>
        </div>
        <div class="text item">
          {{ item.content }}
        </div>
      </el-card>
      <el-pagination
        :total="total"
        background
        layout="prev, pager, next"/>
    </el-main>
  </el-container>
</template>

<script>
import { getParent, getSub, getPost } from '~/plugins/api.js'
export default {
  asyncData({}) {
    let parent = []
    let sub = []
    let post = []
    return getParent().then(rs => {
      parent = rs.data.data
      return getSub(parent[0].id).then(rs => {
        sub = rs.data.data
        return getPost(1, 1, sub[0].id).then(rs => {
          post = rs.data.data
          console.log(post)
          console.log(sub)
          console.log(parent)
          return {
            parent: parent,
            sub: sub,
            post: post,
            total: post.total
          }
        })
      })
    })
  },
  data() {
    return {
      parent: [],
      sub: [],
      post: [],
      total: 0,
      activeName: '0',
      tabPosition: '0'
    }
  },
  methods: {
    init() {},
    handleClick(tab, event) {
      console.log(tab)
    }
  }
}
</script>

<style>
.el-header {
  line-height: 60px;
  background-color: white;
}
.el-main {
  background-color: #e2e2e2;
  margin: 100px 150px 0;
  min-height: 600px;
}
.box-card {
  min-height: 100px;
  margin-bottom: 10px;
}
.el-pagination {
  float: right;
  margin-top: 10px;
}
</style>
