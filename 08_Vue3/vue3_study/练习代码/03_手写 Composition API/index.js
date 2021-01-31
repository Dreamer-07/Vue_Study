// shallowReactive & reactive
// reactive 响应式代理对象的处理器对象
const reactiveHandler = {
    get(target, prop){
        // 如果访问的属性时 _is_reactive 就返回 true
        if(prop === '_is_reactive') return true;
        console.log('get 进行读取数据劫持:' + prop);
        return Reflect.get(target,prop);
    },
    set(target, prop, value){
        console.log('set 进行修改/新增数据劫持:' + prop);
        return Reflect.set(target,prop,value);
    },
    deletProperty(target, prop){
        console.log('deleteProperty 进行删除数据劫持: ' + prop);
        return Reflect.deleteProperty(target,prop)
    }
}

// shallowReactive(浅数据劫持)
function shallowReactive(target) {
    // 1. 判断是否是对象
    if(target && typeof target === 'object'){
        // 2. 创建代理对象后返回
        return new Proxy(target,reactiveHandler)
    };
    return target;
}

function reactive(target) {
    // 1. 判断是否是对象
    if(target && typeof target === 'object'){
        // 2. 判断是否是数组
        if(Array.isArray(target)){
            // 2.1 如果是就遍历数组，进行深度监视
            target.forEach((item,index) => {
                target[index] = reactive(item); 
            });
        }else {
            // 3. 判断是否是对象
            // 3.1 如果是对象也要遍历，进行深度监视
            Object.keys(target).forEach(key => {
                target[key] = reactive(target[key]);
            });
        }
        // 4. 创建代理对象后返回
        return new Proxy(target,reactiveHandler)
    };
    return target;
}


// shallowReadonly & readoly
// readonly 只读代理对象的处理器对象
const readonlyHandler = {
    get(target, prop){
        // 如果访问的属性名是 _is_readonly 就返回 true
        if(prop === '_is_readonly') return true;
        console.log('get 进行读取数据时的劫持：' + prop);
        return Reflect.get(target,prop)
    },
    set(){
        console.warn('set 不能对只读属性进行修改！！');
        return false;
    },
    deleteProperty(){
        console.warn('delete 不能对只读属性进行修改！！');
        return false;
    }
}

// shallowReadonly(浅数据劫持)
function shallowReadonly(target) {
    // 1. 判断是否是对象/数组
    if (target && typeof target === 'target') {
        // 2. 进行只读代理
        return new Proxy(target,readonlyHandler)
    };
    // 不是直接返回
    return target;
}

// readonly
function readonly(target) {
    // 1. 判断是否是对象/数组
    if (target && typeof target === 'object') {
        // 2. 判断是否是数组
        if(Array.isArray(target)){
            // 2.1 如果是就遍历数组，进行深度监视
            target.forEach((item,index) => {
                target[index] = readonly(item); 
            });
        }else {
            // 3. 判断是否是对象
            // 3.1 如果是对象也要遍历，进行深度监视
            Object.keys(target).forEach(key => {
                target[key] = readonly(target[key])
            });
        }
        // 4. 进行只读代理
        return new Proxy(target,readonlyHandler)
    };
    // 不是直接返回
    return target;
}


// shallowRef 和 ref
// shallowRef - 浅数据劫持
function shallowRef(target) {
    // 返回对象
    return {
        // 使用一个属性保存 target
        _value: target,
        // 设置 set & get 方法，使外部通过 .value 属性访问 target
        get value() {
            console.log('get 进行读取数据时的劫持');
            return this._value;
        },
        set value(value) {
            console.log('set 进行修改数据时的劫持');
            this._value = value;
        }
    }
}

// ref
function ref(target) {
    // 防止 target 中有嵌套对象，先将其进行 reactive 处理
    proxyTarget = reactive(target);
    return {
        // 设置一个表示 ref 类型的属性
        _is_ref: true,
        // 使用一个属性保存 target
        _value: proxyTarget,
        // 设置 set & get 方法，使外部通过 .value 属性访问 target
        get value() {
            console.log('get 进行读取数据时的劫持');
            return this._value;
        },
        set value(value) {
            console.log('set 进行修改数据时的劫持');
            this._value = value;
        }
    } 
}


// 判断响应式数据
function isRef (obj) {
    return obj && obj._is_ref
};
function isReactive (obj) {
    return obj && obj._is_reactive
};
function isReadonly (obj) {
    return obj && obj._is_readonly
};
function isProxy (obj) {
    return isReactive(obj) || isReadonly(obj)
};
