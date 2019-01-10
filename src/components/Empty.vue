<template>
    
</template>
<script>
export default {
    data(){
        return {

        }
    },
    beforeRouteEnter (to, from, next) {
        console.log(to,from)
        if(from.path !== "/"){
            console.log("bbb")
            next(vm => {
                vm.$router.replace("/")
            })
        }else if(from.path === "/"){
            console.log("aaa")
            next(vm => {
                vm.$router.replace("/index")
            })
        }
      
    }
}
</script>

