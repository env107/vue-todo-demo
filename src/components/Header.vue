<template>
<div class="box">
    <div>Todo Demo -{{ version }}</div>
</div>
</template>

<script>
export default {
  name: 'Header',
  computed:{
    version:(context)=>{
      return context.$store.getters.desc;
    }
  },
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

@import "./header.less";
</style>
