<template>
  <div>

    <el-card 
      v-for="item in list"
      :key="item.id"
      class="box-card"
      shadow="hover"
    >
      <div 
        slot="header" 
        class="clearfix">
        <span>{{ item.name }}</span>
        <el-button 
          style="float: right; padding: 3px 0" 
          type="text">操作按钮</el-button>
      </div>
      <div 
        v-if="item.sub.length> 0" >
        <nuxt-link
          v-for="sub in item.sub"
          :key="sub.id" 
          :to="`/sub/${sub.id}`"
          class="text item"
        >
          {{ sub.name }}
        </nuxt-link>
      </div>
      <div v-else>
        这里还没有子版块哦~
      </div>
    </el-card>

  </div>
</template>

<script>
import { getParent, getSub } from '~/plugins/api.js'
export default {
  asyncData({ error }) {
    let list = []
    let parent = []
    return getParent()
      .then(rs => {
        parent = rs.data.data
        let listPromist = parent.map(item => {
          return getSub(item.id).then(rs => {
            item.sub = rs.data.data.records
            return item
          })
        })
        return Promise.all(listPromist).then(list => {
          console.log(list)
          return {
            list: list
          }
        })
      })
      .catch(e => {
        error({ statusCode: 404, message: 'Post not found' })
      })
  },
  data() {
    return {}
  },
  methods: {
    init() {}
  }
}
</script>

<style>
.box-card {
  margin: 0 20%;
  min-height: 100px;
  margin-bottom: 10px;
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
