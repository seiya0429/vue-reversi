<template>
 <div
  class="cell_wrapper"
  @click="onClick"
 >
  <div class="cell"></div>
  <div class="stone" :class="stoneClass"></div>
 </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import { Cell, Point } from '../../models/reversi';

@Component
export default class VCell extends Vue {

    @Prop({required: true})
    public cell!: Cell;

    public created() {
    }

    @Emit('put')
    public put(p: Point) {}

    public onClick() {
        this.put(new Point(this.cell.x, this.cell.y));
    }

    public get stoneClass() {
        return {
            'white-stone': this.cell.isWhite,
            'black-stone': this.cell.isBlack,
        }
    }
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