<template>
 <div class="check-buttom" :class="{check:isChecked}">
   <img src="~@assets/img/cart/tick.svg" alt="">
 </div>
</template>

<script>
export default {
  name:'CheckButtom',
  props:{
    isChecked:{
      type:Boolean,
      default(){
        return false
      }
    }
  }
}
</script>

<style scoped>
  .check-buttom{
    border-radius: 50%;
    border: 2px solid #aaaaaa;
  }
  .check{
    border-color:var(--color-tint);
    background-color: var(--color-tint);
  }
</style>