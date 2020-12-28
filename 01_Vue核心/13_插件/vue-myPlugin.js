(function(){
    const MyPlugin = {};
    MyPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或 property
        Vue.myGlobalMethod = function () {
            console.log("全局方法执行啦！！");
        }
        
        // 2. 添加全局资源
        Vue.directive('my-directive', (el,binding) => {
            el.textContent = binding.value.toUpperCase();
        })
        
        
        // 3. 添加实例方法
        Vue.prototype.$myMethod = function (methodOptions) {
            console.log('实例对象方法执行啦！！');
        }
    }

    // 将对象暴露给 window 全局对象
    window.MyPlugin = MyPlugin;
})()