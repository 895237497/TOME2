<template>
    <div id="Emitters">
        <ComTable
        :showMenu="showMenu"
        :showService="showService"
        :showScenic="showScenic"
        />
    </div>
</template>

<script>
import ComTable from '../ComTable'
export default {
    components:{
        ComTable
    },
    data(){
        return{
            showMenu:true,
            showService:true,
            showScenic:true
        }
    }
}
</script>

<style lang="less">

</style>
