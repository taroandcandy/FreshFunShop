import XqpGuess from "./XqpGuess.vue";
import XqpSwiper from "./XqpSwiper.vue";

declare module 'vue' {
    export interface GlobalComponents {
        XqpSwiper: typeof XqpSwiper
        XqpGuess: typeof XqpGuess
    }
}