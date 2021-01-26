function Observer(data) {
    // 为实例对象保存 data
    this.data = data;
    // 开始
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    walk: function(data) {
        var me = this;
        // 遍历所有属性(名)
        Object.keys(data).forEach(function(key) {
            // 为对应的属性进行 convert(转换)
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        // Reactive - 响应式属性：当属性发生变化时，更新界面上对应的元素节点
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        // 一个属性对应一个 dep
        var dep = new Dep();
        // 对于嵌套的属性(如对象)，还需要对其属性完成数据劫持
        var childObj = observe(val);
        // 实施数据劫持 - 设置一个 set 方法监视该属性的变化
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                // 当前 Dep(对应一个属性)的 target(操作目标) 存在的话(watcher)
                if (Dep.target) {
                    // 建立 Dep 和 Dep.target(watcher) 的依赖
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    // 如果值为 undefined 或者类型不为 object 就直接返回
    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建一个 Observer(观察者)
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++; // 标识
    this.subs = []; // 包含了相关 watcher 的容器
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        // 建立 watcher 和 当前dep 的依赖 - watcher.js.31
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;