<template>
    <div id="app">
       <Header/>
       <Menu/>
       <!-- <section>
           <router-view></router-view>
       </section> -->
    </div>
</template>

<script>
import Header from '../common/header/Header'
import Menu from '../common/Menu'
export default {
    components:{
        Header,
        Menu
    }
}
</script>

<style lang="less">
    body,html{
        width: 100%;
        height: 100%;
        /* overflow: hidden; */
    }
    #app{
        height: 100%;
        box-sizing: border-box;
        /* overflow: hidden; */
    }
</style>


