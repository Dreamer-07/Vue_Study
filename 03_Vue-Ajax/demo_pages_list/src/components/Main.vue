<template>
    <h2 v-if="firstView">请输入用户名</h2>    
    <h2 v-if="loading">Loading...</h2>
    <h2 v-if="errorMsg">{{errorMsg}}</h2>
    <div class="row">
      <div class="card" v-for="(user,index) in userList" :key="index">
        <a :href="user.url" target="_blank">
          <img :src="user.imgUrl" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.name}}</p>
      </div>
    </div>
</template>

<script lang="ts">
    import PubSub from 'pubsub-js'
    import axios from 'axios'
    export default {
        data () {
            return {
                firstView: true,
                loading: false,
                userList: null,
                errorMsg: ''
            }
        },
        mounted() {
          // 订阅消息
          PubSub.subscribe('search',(msg: string,searchName: string) => {
            const that = (this as any)
            const URL = `https://api.github.com/search/users?q=${searchName}`
            // 更新状态
            that.firstView = false;
            that.loading = true;
            that.userList = null;
            that.errorMsg = '';
            // 发送 Ajax 请求
            axios.get(URL)
            // 响应成功
            .then(response => {
              that.loading = false;
              const result = response.data;
              that.userList = result.items.map((item: any) => ({
                //  user.url: 用户主页地址
                url: item.html_url,
                //  user.img_url: 用户头像图片地址
                imgUrl: item.avatar_url!,
                //  user.name: 用户名
                name: item.login
              }))
            // 响应失败
            }).catch(error => {
              that.loading = false;
              that.errorMsg = error.message;
            })
          });
        },
    }
</script>

<style>
    .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
    }

    .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
    }

    .card-text {
    font-size: 85%;
    }
</style>