<template>
  <section class="container">
    <div>
      <el-input
        v-model="title"
        style="margin: 10px 0"
        placeholder="请输入标题"/>
    </div>
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
</template>

<script>
import { postNewPost } from '~/plugins/api.js'
export default {
  asyncData({ params, query }) {
    return {
      params: params,
      query: query
    }
  },
  data() {
    return {
      title: '',
      content: '<p>帖子内容</p>',
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
      }
    }
  },
  mounted() {
    console.log('app init, my quill insrance object is:', this.myQuillEditor)
  },
  methods: {
    commit() {
      const h = this.$createElement
      if (this.title === '' || this.title === null) {
        this.$notify({
          title: '标题不可为空'
        })
        return
      }
      let data = {
        parId: this.query.parent,
        content: this.content,
        subId: this.params.id,
        title: this.title
      }
      postNewPost(data).then(rs => {
        console.log(rs)
        this.$router.push(`/sub/${this.params.id}?parent=${this.query.parent}`)
        this.$notify({
          title: rs.data.msg
        })
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
.container {
  width: 100%;
  margin: 0 auto;
  padding: 50px 0;
  background-color: white;
}
.quill-editor {
  width: 100%;
  margin: 0 auto;
  padding: 50px 0;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
