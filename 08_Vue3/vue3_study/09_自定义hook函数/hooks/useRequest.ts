//2. 封装 Ajax 
import axios from 'axios'
import { ref } from 'vue'
// 指定泛型 T 用来确定请求成功后的数据类型
export default function<T>(url: string){
    // 定义是否在请求中的标识位变量
    const loading = ref(true);
    // 定义请求成功后获取的数据 - <T | null> 约束该变量的数据类型为 T | (字面量)null
    const data = ref<T | null>(null);
    // 定义请求失败是的提示信息
    const errorMsg = ref('');

    // 利用 axios 发送 Ajax 请求
    axios.get(url).then(
        (value) => {
            loading.value = false;
            data.value = value.data
        },
        (reason) => {
            loading.value = false;
            errorMsg.value = reason.message || '未知错误信息';
        }
    );

    // 返回请求的数据
    return {
        loading,
        data,
        errorMsg
    }
}