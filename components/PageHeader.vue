<template>
  <div class="page-header">
    <el-menu
      mode="horizontal" >
      <el-menu-item index="1">
        <nuxt-link
          class="link_button"
          to="/"
        >
          首页
        </nuxt-link>
      </el-menu-item>
      <el-menu-item 
        style="float:right" 
        index="6">
        <el-popover
          :width="popwidth"
          placement="bottom"
          trigger="hover">
          <div 
            v-if="userState">
            <nuxt-link
              class="link_button" 
              style="float:left" 
              to="/login">
              登录
            </nuxt-link>
            <nuxt-link
              class="link_button" 
              style="float:right" 
              to="/register">
              注册
            </nuxt-link>
          </div>
          <div v-else>
            <nuxt-link
              class="link_button" 
              style="float:left" 
              to="/user">
              个人中心
            </nuxt-link>
            <el-button 
              type="danger"
              style="float:right" 
              @click="exit">退出</el-button>
          </div>
          <img 
            slot="reference" 
            :src="img"> 
        </el-popover>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
var store = require('store')
export default {
  data() {
    return {
      user: {},
      img: '',
      popwidth: 190,
      userState: false
    }
  },
  created: function() {
    this.getUser(store.get('user'))
  },
  methods: {
    getUser(user) {
      console.log(user)
      if (user !== undefined) {
        this.user = user
        this.popwidth = 190
        this.userState = false
        this.img = user.msg.image
      } else {
        this.img =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAMFBMVEX///+34Oqz3un5/P3y+fvB5O3r9vnS6/LJ5+/g8fbY7vPn9Pi74uvc8PTF5u7O6fCrE6KnAAAE/klEQVRogcVb7ZaEIAhVzL7G6v3fdktrmhQByz3d/bVzyqsIV0RTqhRNO4xLb53TWjtn+2Uc2qa4lSKYT2e1hvXvF/5/233M/5A2o3VwZbywg7Nj9XGvpATnyV2V2gyzgPSgnoc6BjeTk5Lu1G56zmxGXcbqmfX4kLl0rD9jfsDa3mQNzO1d2v4+q2fub7F+HpEGfMppu2eDDYCukLWZa9CuxHORjrSuCuuGEvea+HGAdtZapwVCJo6okWkL3DI0QRhMMyxcsMEoo6U9CqCPvfTT06OWeRdD22OO0tChLiFm4icXkXS088Tk3MJMvElGHjfHE/nyQr67kO+SXt0+MhY9RUQcN5RcMKNlR+zyyjVT/aXm9lkDtJ0kQttQDeTm6UP6xSCgVWog28CDkOqrtiJapSzZCvZGT72Q6WoK0mgayUBa8gUnpFWKXEEhDSb6eXl2SCpP2n/SITTIs4aGbihyT0MnGHIzM4bT7prQM0s9L1UnFrKl6wJhyGdLppebYK2N/FlxFG2gI+kyBmZ2S9yKc6zLDNPOvPKW7O4M19jp0uQyUpv3XJc4y9S189kaly9j8pYHLbj6J5ToNUSLF8EAzlm+axtrGK2FGb/HyLa2G5o1syzHOcA56dfQrJn1VWRoMNLn4Q3NiYbvoVywGLny8NIhqifIDc2beR+GqKAgjmCBk+6ZpWR6JUl7AJm6f7FNsOQ5sXSworGDSbWjLvIQGU9vmwBpD0XVAoEUhMZaNQh7KCmCyUttg7iLmtxJhskVt7Qaj07DSojltFuiSG5P4m5SppYI1Re92AMDcT6MZYF7wDJpdgKHL8VDaTOlvGtXk4Mi8ykyWuAVPQbzzykDuK49qU3b/RQKQQsLuRJeWMPtUnKBtfllnKZpXOZrZdQ1qyBImAW80G+jiyvSEHD9zVebjeR8gJ3fbbABI1Pzha+U8kNm/QrsufI2lqyaiJ/0vLQrRgE7ZGvNp1lE4WyZckqyCH2w80kAmygZrfs9qc9ovm4m78OwD3PzbfQ8kMzfF6pf2W2Caaeun621c99NbS7HJYhXO+bX36LdSSHxkM83iooLOLJlhDXfyOVXxUddGLI5cpPNJ+8dKsbIRYvKpYCu0mE5Lktbcorb4vbhbQQ0+fFziOUnFXzqAOZbPl/CTFFncgOQKQ6TiExwzasnyIY47D0Sxapo5Q2JpXfVT7aO0pq+FLFBj01t9HtRNVKC2HOPcUWGlp7XipFrP5bKorIgj6Rw+M1LoppEFWk+EQvTWSuJF6yieiSH2G1/ltdEOmp6dOzNv8ofh1hF14rV4SIOqab837pwcdqkV7XWwUQzrpZMZvjmZaIYyZYlHk+Sg1WZ4lT6k1wxWQ0rrA5pQpkevKV55WOdTjMKrOqXrs8PiZFEBnWa5KlnmTuWtUv798C5kP1Pzn5IZgnLvTg2yD40v9wgtXKwd5Srxfbd+Zo9fl+l3NboUQ5xXyWTZduyZTFTZCDthu/goCs4x8H3H5wK4dtw8UVbkyn68IGR2ToCLLy1myVTanpy0Q3AkjeqzZC9Ev70Yt9WQsHdo53mfK1MmidSJSDQbt4+HDhGbrbPCmby/qZc9Jj7or4s6fx9Ubf/R6FgPX3pfuxr94HVW/ef1Wv3vdVb99vVa/f51VvfL6jXvtdQb32f4pkHQnyTodb6Hsfjle+PvtSOGPb/fG8V8Mr3ZQfqfE/3B91eMNOOhtYUAAAAAElFTkSuQmCC'
        this.popwidth = 100
        this.userState = true
      }
    },
    exit() {
      store.clearAll()
      this.$router.push({ path: this.redirect || '/login' })
    }
  }
}
</script>


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

.link_button {
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  border: solid 1px #20538d;
  /* background: #fff; */
  color: black;
  padding: 8px 12px;
}
</style>
