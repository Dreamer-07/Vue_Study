function Watcher(vm, expOrFn, cb) {
    this.cb = cb; // 回调函数
    this.vm = vm; // vm 对象
    this.expOrFn = expOrFn; // 表达式 OR 函数
    this.depIds = {}; // 包含了 n 个相关 dep 的容器对象

    // 判断表达式是否是函数
    if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
    } else {
        // 如果不是函数就获取对应表达式的 getter 方法
        this.getter = this.parseGetter(expOrFn.trim());
    }

    this.value = this.get(); // 获取表达式的值
}

Watcher.prototype = {
    constructor: Watcher,
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.get(); // 获取当前表达式的值
        var oldVal = this.value; // 获取旧的值
        if (value !== oldVal) {
            this.value = value;
            // 调用保存的回调函数，this 指定为 vm 对象
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        /* 
        判断是否建立过依赖
            - watcher.depIds: 与当前 watcher 相关的 dep 的容器对象
        */
        if (!this.depIds.hasOwnProperty(dep.id)) {
            // 为 dep 添加 watcher
            dep.addSub(this);
            // 为 watcher 添加 dep
            this.depIds[dep.id] = dep;
        }
    },
    get: function() {
        // 设置 Dep 全局属性 target 为当前的 watcher
        Dep.target = this;
        // 通过该表达式的 getter() 获取其在 vm 中保存的 data 数据值
        var value = this.getter.call(this.vm, this.vm);
        // 设置回 null
        Dep.target = null;
        return value;
    },

    parseGetter: function(exp) {
        if (/[^\w.$]/.test(exp)) return; 

        // 分隔表达式为数组
        var exps = exp.split('.');

        return function(obj) {
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                /* 
                从对象中获取该表达式对应的值
                    {
                        exps - 表达式：可能是嵌套表达式
                        obj - 传入的对象
                    }
                    这里的 obj 是 vm 对象，从其中获取属性值的会触发相应的 get() 方法
                    由于实施数据劫持早于编译指令，所以会调用对应的 data 属性的 get() 方法 - 查看 observe.js.32
                */
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
};