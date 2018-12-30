<template>
  <div class="page-header">
    <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal" 
      @select="handleSelect">
      <el-menu-item index="1">
        <nuxt-link
          to="/"
        >
          首页
        </nuxt-link>
      </el-menu-item>
      <el-menu-item 
        style="float:right" 
        index="6">
        <!-- <img src="https://y.gtimg.cn/music/photo_new/T001R300x300M000001KEUEw2SolWO.jpg?max_age=2592000"> -->
        <el-popover
          placement="bottom"
          width="220"
          trigger="hover">
          <div 
            v-if="true">
            <el-button style="float:left" >登录</el-button>
            <el-button style="float:right">注册</el-button>
          </div>
          <div v-else>
            <el-button style="float:left" >个人中心</el-button>
            <el-button style="float:right">退出</el-button>
          </div>
          <img 
            slot="reference" 
            src="https://y.gtimg.cn/music/photo_new/T001R300x300M000001KEUEw2SolWO.jpg?max_age=2592000"> 
        </el-popover>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.page-header {
  width: 100%;
  text-align: center;
  /* padding: 10px; */
  background-color: beige;
}
img {
  height: 50px;
  width: 50px;
}
</style>
