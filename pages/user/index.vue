<template>
  <el-card class="box-card">
    <div 
      slot="header" 
      class="clearfix">
      <span>个人信息</span>
      <el-button 
        style="float: right; padding: 3px 0" 
        type="text">编辑</el-button>
    </div>
    <span>头像：
      <img 
        :src="img"
        class="item-img  item"> 
    </span>
    <div 
      class="text item">
      用户名：{{ name }}
    </div>
    <div 
      class="text item">
      用户类型：{{ type }}
    </div>
  </el-card>
</template>
<script>
var store = require('store')
export default {
  data() {
    return {
      name: '',
      type: 0,
      password: '',
      img: ''
    }
  },
  created: function() {
    this.getUser(store.get('user'))
  },
  methods: {
    getUser(user) {
      if (user !== undefined) {
        this.popwidth = 190
        this.img = user.msg.image
        this.name = user.msg.username
        this.type = user.msg.type
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
</style>
