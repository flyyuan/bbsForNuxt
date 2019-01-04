<template>
  <div>
    <el-card class="box-card">
      <div 
        slot="header" 
        class="clearfix">
        <span>个人信息</span>
      </div>
      <p> 用户名：{{ name }}</p>
      <p>头像(点击头像即可更换):</p>
      <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        class="avatar-uploader"
        action="http://product.sunray.cn:18080/api/qiniu/infoImages">
        <img 
          v-if="imageUrl" 
          :src="imageUrl" 
          class="avatar">
        <i 
          v-else 
          class="el-icon-plus avatar-uploader-icon"/>
      </el-upload>
      <el-button 
        type="success" 
        @click="dialogVisible = true">修改密码</el-button>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="修改密码"
      width="30%">
      <el-input 
        v-model="password" 
        type="password"
        placeholder="请输入新密码"/>
      <el-input 
        v-model="repassword"
        type="password" 
        placeholder="请再次输入新密码"/>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button 
          type="primary" 
          @click="handleResetPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { resetPassword, resetImage } from '~/plugins/api.js'
var store = require('store')
export default {
  data() {
    return {
      name: '',
      type: 0,
      password: '',
      repassword: '',
      imageUrl: '',
      dialogVisible: false,
      user: {}
    }
  },
  created: function() {
    this.user = store.get('user')
    this.getUser(store.get('user'))
  },
  methods: {
    getUser(user) {
      if (user !== undefined) {
        this.popwidth = 190
        this.imageUrl = user.msg.image
        this.name = user.msg.username
        this.type = user.msg.type
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.success) {
        let data = {
          image: res.file_path
        }
        resetImage(data).then(rs => {
          console.log(rs)
          this.user.msg.image = res.file_path
          store.set('user', this.user)
          console.log(store.get('user'))
          location.reload()
        })
      }
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleResetPassword() {
      const h = this.$createElement
      if (this.password === this.repassword) {
        let data = {
          password: this.password
        }
        resetPassword(data).then(rs => {
          this.$notify({
            title: '修改密码',
            message: h('i', { style: 'color: teal' }, rs.data.msg)
          })
          this.dialogVisible = false
        })
      } else {
        this.$notify({
          title: '两次密码不一致'
        })
      }
    }
  }
}
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: 0 auto;
}
.item-img {
  margin-left: 50px;
  width: 100px;
  height: 100px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  margin: 20px;
  display: block;
}
</style>
