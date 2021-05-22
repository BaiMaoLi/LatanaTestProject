<template>
  <div>
    <div id="release-items-container">
      <div id="search-container">
        <input id="search-input" class="form-control" placeholder="Type your keyword"
           @keyup="keywordChange()"
           @change="keywordChange()"
           v-model="keyword"
        >
        <i class="fa fa-search" id="search-icon"></i>
      </div>
      <div class="row">
        <div class="col-6 col-md-4 col-lg-2" v-for="(item, index) in releases" :key="index">
          <div class="release-item-container">
            <div class="release-item-wrapper">
              <img class="release-item-thumb" v-lazy="item.thumb" onerror="this.src='./404.png'">
              <div class="release-item-info-container">
                <div class="position-relative" style="height: 100%">
                  <div class="release-item-info-wrapper">
                    <div class="release-item-title">{{item.title}}</div>
                    <div class="release-item-year">{{item.year}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="paginator-container">
        <span class="paginator-btn" v-on:click="getNextPage(-1)">
          <i class="fa fa-step-backward"></i>
        </span>
        <span class="paginator-page-label">
          Page {{curr_page}} of {{pages}}
        </span>
        <span class="paginator-btn" v-on:click="getNextPage(1)">
          <i class="fa fa-step-forward"></i>
        </span>
      </div>
    </div>

    <div class="loading full-container" v-if="loading">
      <div class="loading-text">
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import constants from "../constants";
  export default {
    name: 'List',
    data:function(){
      return {
        curr_page:1,
        per_page:20,
        pages:100,
        loading:false,
        releases:[],
        keyword:'',
        search_timer:null,
      }
    },
    created:function () {
      this.fetchData();
    },
    methods:{
      fetchData:function () {
        this.loading=true;
        let keyword=this.keyword;
        let url=`${constants.discorgs_api_prefix}/database/search?type=release&page=${this.curr_page}&per_page=${this.per_page}&${constants.discorgs_credential}`
        if(keyword!==''){
          url+=`&q=${keyword}`
        }
        axios.get(url, {
          method: 'get',
          headers: constants.discorgs_header
        }).then(
          response=>{
            this.pages=response.data.pagination.pages;
            this.loading=false;
            this.releases=response.data.results;
          },
          error=>{
            this.loading=false;
            console.log(error)
          }
        )
      },
      getNextPage:function (increment) {
        this.curr_page+=increment;
        if(this.curr_page>this.pages){
          this.curr_page=this.pages;
          return;
        }
        if(this.curr_page<0){
          this.curr_page=0;
          return;
        }
        this.fetchData();
      },
      keywordChange:function () {
          clearTimeout(this.search_timer);
          this.search_timer=setTimeout(()=>{
              this.fetchData();
          },500)
      }
    }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    #release-items-container{
      max-width: 1500px;
      margin:0 auto;
      padding:0 20px;
    }
    .full-container{
      width: 100vw;
      height: 100vh;
      position: fixed;
      left:0;
      top:0;
    }
    .release-item-container{
      height: 100%;
      padding:10px 0;
    }
    .release-item-wrapper{
      padding:10px;
      border-radius: 5px;
      color:#ccc;
      background: #888;
      height: 250px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 0 10px 10px #24293e38;
    }
    .release-item-thumb {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      object-fit: cover;
    }
    .release-item-info-container{
      position: absolute;
      bottom:0;
      left: 0;
      width: 100%;
      height: 80px;
      padding:10px;
      text-align: center;
      background: #2f2e2eb0;
      transition: all 0.1s;
    }
    .release-item-wrapper:hover .release-item-info-container{
      background: #1f7ac7de;
    }
    .release-item-info-wrapper{
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .release-item-title{
      font-weight: bold;
      font-size: 21px;
      white-space: nowrap;
      overflow: hidden;
      padding:0 10px;
      text-overflow: ellipsis;
      width: 100%;
    }
    #search-input {
      background: #111;
      border-color: #111;
      color: #fff;
      letter-spacing: 1px;
      font-size: 23px;
    }
    #search-container {
      position: relative;
    }
    #search-icon {
      position: absolute;
      right: 10px;
      color: #fff;
      top: 50%;
      font-size: 25px;
      transform: translateY(-50%);
    }
    #paginator-container {
      color: #ddd;
      font-size: 20px;
      padding: 15px;
    }
    .paginator-btn {
      display: inline-block;
      vertical-align: middle;
      margin: 0 20px;
      transition: all 0.1s;
      cursor: pointer;
    }
    .paginator-btn:hover{
      color:#fff;
    }
  </style>

