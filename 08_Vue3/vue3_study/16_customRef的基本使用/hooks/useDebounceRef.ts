import { customRef } from 'vue';
/**
 * 返回一个防抖的 ref
 * @param value 数据
 * @param delay 防抖时间(毫秒),默认值 200
 */
export default function<T>(value: T, delay = 200) {
    /* 
    使用 customRef() 自定义一个 ref
        - 该函数接收两个参数 tarck & trigger    
            track：用来跟踪收集依赖
            trigger：用来触发响应(更新视图)
    */
    return customRef<T>((tarck,trigger) => {
        let timeoutId: number    
        return {
            get(): T {
                // 通知 Vue 进行依赖跟踪
                tarck();
                return value;
            },
            set(newValue: T): void {
                // 先清除定时器
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    value = newValue;
                    // 通知 vue 更新视图
                    trigger();
                },delay);    
            }
        }
    });
}