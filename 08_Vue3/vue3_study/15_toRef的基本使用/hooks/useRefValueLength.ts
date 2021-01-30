import { computed, Ref } from 'vue'
// 得到一个 ref.value 的计算属性数据
export default function(ref: Ref){
    return computed(() => {
        return ref.value.toString().length;
    })
}