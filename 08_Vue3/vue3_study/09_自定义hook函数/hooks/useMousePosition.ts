import { onMounted, onUnmounted, ref } from 'vue'
export default function(){
    const x = ref(-1);
    const y = ref(-1);

    // 在挂载结束之后绑定 window 全局点击事件
    const clickHandler = (event: MouseEvent) => {
      x.value = event.pageX;
      y.value = event.pageY;
    };
    onMounted(() => {
      window.addEventListener('click',clickHandler)
    });
    // 在页面卸载之后删除 window 的 DOM 监听事件
    onUnmounted(() => {
      window.removeEventListener('click',clickHandler);
    })
    return {
        x,
        y
    }
}