<template>
 <v-constainer>
     <v-layout
      justify-center
     >
        <VBoard
         :board="board"
        />
     </v-layout>
     <v-layout
      justify-center
     >
        <h2>{{ current }}</h2>
     </v-layout>
     <v-layout
      justify-center
     >
        <h2>白の数: {{ board.whites }}</h2>
     </v-layout>
     <v-layout
      justify-center
     >
        <h2>黒の数: {{ board.blacks }}</h2>
     </v-layout>
 </v-constainer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import VBoard from '@/components/reversi/VBoard.vue';

import { Board, CellState } from '../../models/reversi';

@Component({
    components: {
        VBoard,
    },
})
export default class VGame extends Vue {
    public board: Board = new Board();

    public get current() {
        if (this.board.turn === CellState.Black) {
            return '黒の手番';
        } else {
            return '白の手番';
        }
    }
}
</script>