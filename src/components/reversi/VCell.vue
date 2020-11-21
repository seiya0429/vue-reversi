<template>
 <div class="cell_wrapper">
  <div class="cell"></div>
  <div class="stone"></div>
 </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class VCell extends Vue {
}
</script>

<style scoped>
.cell_wrapper {
    position: relative;
}
.cell {
    width: 64px;
    height: 64px;
    background-color: darkgreen;
    border: 2px solid black;
}
.stone {
    position: absolute;
    top: 2px;
    left: 2px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
}
.white-stone {
    background-color: white;
}
.black-stone {
    background-color: black;
}
</style>