<template>
  <el-container>
    <el-header>
      <el-radio-group 
        v-model="tabPosition" >
        <el-radio-button label="top">top</el-radio-button>
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="bottom">bottom</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
      </el-radio-group>
      <el-tabs 
        v-model="activeName" 
        @tab-click="handleClick">
        <el-tab-pane 
          label="用户管理" 
          name="first">用户管理</el-tab-pane>
        <el-tab-pane 
          label="配置管理" 
          name="second">配置管理</el-tab-pane>
        <el-tab-pane 
          label="角色管理" 
          name="third">角色管理</el-tab-pane>
        <el-tab-pane 
          label="定时任务补偿" 
          name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <el-card
        class="box-card"
      >
        <div 
          slot="header" 
          class="clearfix">
          <span>卡片名称</span>
          <el-button 
            style="float: right; padding: 3px 0" 
            type="text">操作按钮</el-button>
        </div>
        <div 
          v-for="o in 2" 
          :key="o" 
          class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </el-card>
      <el-pagination
        :total="1000"
        background
        layout="prev, pager, next"/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      tabPosition: 'top'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
  margin: 100px 150px;
  min-height: 600px;
}
.box-card {
  min-height: 100px;
}
.el-pagination {
  float: right;
  margin-top: 50px;
}
</style>
