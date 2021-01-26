/* 编译对象构造函数 */
function Compile(el, vm) {
    // 保存 vm 对象
    this.$vm = vm;
    /* 
    将 el 对应的元素对象保存
        - isElementNode()：是否为元素节点
        - 如果 el 是元素就保存，如果不是再通过 document.querySelector 查找对应元素节点
    */
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    // 如果对应的元素节点($el)存在
    if (this.$el) {
        // 将 el 元素中的所有子节点保存的 fragment 中(2 is to)
        this.$fragment = this.node2Fragment(this.$el);
        // 初始化：编译 fragment 中所有层次子节点
        this.init();
        // 将编译后的 fragment 添加到页面的 el 元素中
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    constructor: Compile,
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生(子)节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        // 返回
        return fragment;
    },

    init: function() {
        // 编译 this.$fragment 中所有层次的节点
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // 获取 el 对象的所有子节点(这里的 el 是 fragment)
        var childNodes = el.childNodes,
        // 保存当前对象(complie 实例对象)
            me = this;
        // 遍历所有的子节点
        [].slice.call(childNodes).forEach(function(node) {
            // 获取当前节点的 textContent(获取当前节点及其所有后代文本内容)
            var text = node.textContent;
            /* 
            创建正则对象：匹配 {{xxx}}
                - 通过 () 可以进行'子匹配'，可以额外匹配内部的值
            */
            var reg = /\{\{(.*)\}\}/;
            // 是否为元素节点
            if (me.isElementNode(node)) {
                // 编译元素节点 - 解析元素上的 Attr(指令)
                me.compile(node);
            // 是否为 文本节点 && 符合正则规则({{xxx}})
            } else if (me.isTextNode(node) && reg.test(text)) {
                /* 
                编译大括号表达式文本节点
                    - 可以通过 RegExp 访问 $num 属性获取子匹配的数据
                */
                me.compileText(node, RegExp.$1.trim());
            }
            // 判断当前节点是否有子节点，如果有就执行 递归调用
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    // 编译对应的元素节点(解析指令)
    compile: function(node) {
        // 获取所有的属性节点
        var nodeAttrs = node.attributes,
        // 保存 this
            me = this;

        // 遍历所有的属性节点
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 获取属性名
            var attrName = attr.name;
            // 判断是否是指令属性
            if (me.isDirective(attrName)) {
                // 获取对应的属性值 - 表达式
                var exp = attr.value;
                /* 
                获取指令名(v-on:xxx -> on:xxx)
                    - substring(index[,end]): 从第 index 开始截取到 end(不包含)
                */
                var dir = attrName.substring(2);
                // 判断是否为事件指令
                if (me.isEventDirective(dir)) {
                    // 通过编译工具进行事件处理
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    // 判断编译工具中是否有对应的处理函数，如果有就执行
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                // 删除对应的指令属性
                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        // {{}} 本质上和 v-text 指令没有区别，这里通过 编译工具(CompileUtil) 解析
        compileUtil.text(node, this.$vm, exp);
    },

    // 是否是指令属性 - 是否以 v- 开头
    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    // 是否是事件指令 - 是否以 on 开头
    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    // 是否为元素节点
    isElementNode: function(node) {
        // 通过 nodeType 属性判断
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 包含多个解析指令的方法的对象：以指令名作为对应的 key(属性名)
var compileUtil = {
    // 处理 v-text/{{}} 
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    // 处理 v-html
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        // 用于初始化显示和创建对应的 watcher
        this.bind(node, vm, exp, 'model');

        // 保存当前对象(complie 实例)
        var me = this,
            // 获取当前表达式对应的值 
            val = this._getVMVal(vm, exp);
        // 为节点绑定 DOM 事件监听
        node.addEventListener('input', function(e) {
            // 获取新的值
            var newValue = e.target.value;
            // 如果值没有改变就返回
            if (val === newValue) {
                return;
            }
            // 更新 data 中对应表达式的值(会被劫持，触发 set() 函数)
            me._setVMVal(vm, exp, newValue);
            // 保存新的值
            val = newValue;
        });
    },
    // 处理 v-class
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    /**
     * 绑定数据
     * @param {*} node 节点
     * @param {*} vm vm 对象
     * @param {*} exp 数据
     * @param {*} dir 指令名
     */
    bind: function(node, vm, exp, dir) {
        // 初始化显示
        // 获取对应的指令的修改器(函数)
        var updaterFn = updater[dir + 'Updater'];

        // 如果存在就执行对应的修改器(函数) - 传入对应的 node 节点和数据(通过 _getVMVal(获取))
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        /*
        更新数据时：
            这里会先为表达式添加一个 Watcher(监听者)
                (回调函数应该关注的三个点：this是谁，什么时候调用，用来做什么)
                - 在对应的表达式的值发生变化时，就会调用指定的回调函数
                - 该回调函数的作用就是更新对应的元素节点的属性
        */
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        // 获取指令名中的 事件名(on:xxx -> xxx)
        var eventType = dir.split(':')[1],
            // 通过表达式获取 vm 配置对象的 methods 对象中保存的函数
            fn = vm.$options.methods && vm.$options.methods[exp];

        // 如果事件名和对应的函数都存在
        if (eventType && fn) {
            // 为节点绑定上指定的 DOM事件回调函数(其中回调函数的 this 被强制绑定为 vm)
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    // 从 vm 中得到表达式所对应的值
    _getVMVal: function(vm, exp) {
        // 保存 vm
        var val = vm;
        // 切割数据(这里是大括号表达式)，也就是可能存在嵌套调用 a.b.c
        exp = exp.split('.');
        // 遍历
        exp.forEach(function(k) {
            /* 
            第一次会从 vm 中获取数据，并替换 vm 保存
            如果有第二个，就会继续遍历，然后从第一个数据中获取对应的属性值
            以此循环
            */
            val = val[k];
        });
        // 返回 val
        return val;
    },

    // 更新表达式对应的 data 的值
    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

// 包含多个更新节点的方法的工具对象
var updater = {
    // 更新节点的 textContent 属性值
    textUpdater: function(node, value) {
        // 如果数据的类型不为 undefined 就替换当前节点的 textContent 属性
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    // 更新节点的 innetHTML 属性值
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    // 更新节点的 className 属性值
    classUpdater: function(node, value, oldValue) {
        // 获取 node 的静态 class 类名
        var className = node.className;
        // 将静态的 class 和动态的 class 拼接再一次后赋值给 className 属性
        node.className = className + (className ? ' ' : '') + value;
    },

    // 更新节点的 value 属性值
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};