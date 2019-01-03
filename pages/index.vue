<template>
  <div>
    <el-button 
      v-show="userState" 
      style="float:right"
      type="primary"
      @click="centerDialogVisible = true, dialogState = 0">新建父板块</el-button>
    <el-card 
      v-for="item in list"
      v-show="item.state === 0"
      :key="item.id"
      class="box-card"
      shadow="hover"
    >
      <div 
        slot="header" 
        class="clearfix">
        <span>{{ item.name }}</span>
        <div 
          v-show="userState" 
          style="float: right; padding: 3px 0" >
          <el-button 
            type="success"
            @click="handleNewSubParent(item)"
          >新建子版块</el-button>
          <el-button
            type="warning"
            @click="handleEditParent(item)"
          >编辑</el-button>
          <el-button 
            type="danger"
            @click="handleDeleteParent(item.id)"
          >删除</el-button>
        </div>
      </div>
      <div 
        v-if="item.sub.length> 0" >
        <div
          v-for="sub in item.sub"
          :key="sub.id">
          <nuxt-link
            :to="`/sub/${sub.id}?parent=${item.id}`" 
            style="display:inline;"
            class="text item"
          >
            {{ sub.name }}
          </nuxt-link>
          <el-button
            v-show="userState" 
            style=" padding: 3px 0"
            type="warning"
            @click="handleEditSubParent(sub)"
          >编辑</el-button>
          <el-button 
            v-show="userState" 
            style=" padding: 3px 0"
            type="danger"
            @click="handleDeleteSubParent(sub.id)"
          >删除</el-button>
        </div>
      </div>
      <div v-else>
        这里还没有子版块哦~
      </div>
    </el-card>
    <el-dialog
      :visible.sync="centerDialogVisible"
      title="父板块"
      width="30%"
      center>
      <div class="demo-input-suffix">
        父板块名：
        <el-input
          v-model="parentName"
          placeholder="请输入内容"/>
      </div>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button 
          type="primary" 
          @click="OnClickParent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="subDialogVisible"
      title="子板块"
      width="30%"
      center>
      <div class="demo-input-suffix">
        子板块名：
        <el-input
          v-model="subParentName"
          placeholder="请输入内容"/>
      </div>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button @click="subDialogVisible = false">取 消</el-button>
        <el-button 
          type="primary" 
          @click="OnClickSubParent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getParent,
  getSub,
  postNewParent,
  deleteParent,
  putParent,
  postNewSubParent,
  deleteSubParent,
  putSubParent
} from '~/plugins/api.js'
import { userState } from '~/plugins/user.js'

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
    return {
      centerDialogVisible: false,
      userState: false,
      parentName: '',
      dialogState: 0,
      item: {},
      subDialogVisible: false,
      subParentName: '',
      subDialogState: 0
    }
  },
  created: function() {
    this.userState = userState()
  },
  methods: {
    init() {},
    newParent() {
      const h = this.$createElement
      postNewParent({ name: this.parentName }).then(rs => {
        console.log(rs)
        this.$notify({
          title: '新建父板块',
          message: h('i', { style: 'color: teal' }, rs.data.msg)
        })
        this.$router.go(0)
        this.centerDialogVisible = false
        this.parentName = ''
      })
    },
    newSubParent() {
      const h = this.$createElement
      let data = {
        boardParentId: this.item.id,
        name: this.subParentName
      }
      postNewSubParent(data).then(rs => {
        console.log(rs)
        this.$notify({
          title: '新建子板块',
          message: h('i', { style: 'color: teal' }, rs.data.msg)
        })
        this.$router.go(0)
        this.subDialogVisible = false
        this.subParentName = ''
      })
    },
    eidtParent() {
      const h = this.$createElement
      let data = {
        id: this.item.id,
        name: this.parentName
      }
      putParent(data).then(rs => {
        console.log(rs)
        this.$notify({
          title: '编辑父板块',
          message: h('i', { style: 'color: teal' }, rs.data.msg)
        })
        this.$router.go(0)
        this.centerDialogVisible = false
        this.parentName = ''
      })
    },
    eidtSubParent() {
      const h = this.$createElement
      let data = {
        id: this.item.id,
        name: this.subParentName
      }
      putSubParent(data).then(rs => {
        console.log(rs)
        this.$notify({
          title: '编辑父板块',
          message: h('i', { style: 'color: teal' }, rs.data.msg)
        })
        this.$router.go(0)
        this.subDialogVisible = false
        this.subParentName = ''
      })
    },
    handleDeleteParent(id) {
      const h = this.$createElement
      deleteParent(id).then(rs => {
        this.$notify({
          title: '删除父板块',
          message: h('i', { style: 'color: teal' }, rs.data.msg)
        })
        this.$router.go(0)
      })
    },
    handleEditParent(item) {
      this.centerDialogVisible = true
      this.parentName = item.name
      this.dialogState = 1
      this.item = item
    },
    handleDeleteSubParent(id) {
      const h = this.$createElement
      deleteSubParent(id).then(rs => {
        this.$notify({
          title: '删除子板块',
          message: h('i', { style: 'color: teal' }, rs.data.msg)
        })
        this.$router.go(0)
      })
    },
    handleEditSubParent(item) {
      this.subDialogVisible = true
      this.subParentName = item.name
      this.subDialogState = 1
      this.item = item
    },
    handleNewSubParent(item) {
      this.item = item
      this.subDialogVisible = true
      this.subDialogState = 0
    },
    OnClickParent() {
      switch (this.dialogState) {
        case 0:
          this.newParent()
          break
        case 1:
          this.eidtParent()
          break
      }
    },
    OnClickSubParent() {
      switch (this.subDialogState) {
        case 0:
          this.newSubParent()
          break
        case 1:
          this.eidtSubParent()
          break
      }
    }
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
