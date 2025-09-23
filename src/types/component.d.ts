import 'vue'
import XqpSwiper from '@/components/XqpSwiper.vue'
import XqpGuess from '@/components/XqpGuess.vue'

declare module 'vue'{
    export interface GlobalComponents{
        XqpSwiper:typeof XqpSwiper
        XqpGuess:typeof XqpGuess
    }
}

// 组件实例类型
export type XqpGuessInstance = InstanceType<typeof XqpGuess>