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
        </div>
        <p class="item"><span v-html="postData.content" /> </p>
        <span style="float:right">{{ postData.updateDate.replace('T',' ') }}</span>
        <span >用户ID：{{ postData.adminId }}</span>
      </el-card>
      <div v-if="postReply.records.length > 0">
        <el-card 
          v-for="item in postReply.records"
          v-show="item.state === 0"
          :key="item.id"
          shadow="hover"
          class="box-card-reply"
        >
          <div 
            slot="header" 
            class="clearfix">
            <span >用户ID：{{ item.adminId }}</span>
          </div>
          <div 
            v-show="userState && userId === item.adminId"
            slot="header" 
            class="clearfix">
            <el-button 
              style="float:right"
              type="danger"
              @click="handleDeleteParent(item.id)"
            >删除</el-button>
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

      <section class="container">
        发表评论：
        <div 
          v-quill:myQuillEditor="editorOption" 
          :content="content"
          class="quill-editor"
          @change="onEditorChange($event)"
        />
        <el-button 
          style="margin: 0 50%"
          type="success"
          size="medium"
          @click="commit"
        >提交</el-button>
      </section>
    </div>
    <div v-else>
      这里还没有帖子哦~
    </div>
  </div>
</template>
<script>
import {
  getPostOne,
  getPostReply,
  postReply,
  deleteReply
} from '~/plugins/api.js'
import { userState, userId } from '~/plugins/user.js'
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
  data() {
    return {
      content: '<p>评论内容</p>',
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image']
          ]
        }
      },
      userState: false,
      userId: null
    }
  },
  created: function() {
    this.userState = userState()
    this.userId = userId()
  },
  methods: {
    currentChange(item) {
      //   console.log(item)
      this.$router.push(`/post/${this.params.id}?page=${item}`)
    },
    commit() {
      const h = this.$createElement
      let data = {
        postId: this.params.id,
        content: this.content
      }
      postReply(data).then(rs => {
        console.log(rs)
        this.$notify({
          title: rs.data.msg
        })
        location.reload()
      })
    },
    handleDeleteParent(id) {
      deleteReply(id).then(rs => {
        console.log(rs)
        this.$notify({
          title: rs.data.msg
        })
        location.reload()
      })
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
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
.container {
  width: 100%;
  margin: 100px 0;
  padding: 50px 50px;
  background-color: white;
}
.quill-editor {
  width: 100%;
  margin: 0 auto;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
