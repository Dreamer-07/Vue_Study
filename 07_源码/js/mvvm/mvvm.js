// 相当于 Vue 
function MVVM(options) {
  // 保存配置对象
  this.$options = options;
  // 初始化 vm 对象的 _data 属性为配置对象中的 data 对象
  var data = this._data = this.$options.data;
  // 保存 vm 对象
  var me = this;
  // 遍历 data 对象的所有可枚举的属性名
  Object.keys(data).forEach(function (key) { // key == propName
    // 为每一个属性(名)实现代理
    me._proxy(key);
  });
  observe(data, this);
  // 创建编译对象，传入 配置对象中的 el 属性(如果没有就传入 document.body) 和 当前对象(vm)
  this.$compile = new Compile(options.el || document.body, this)
}

// 原型对象
MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },
  // 实现数据代理
  _proxy: function (key) {
    // 保存 vm 对象
    var me = this;
    // 使用 Object.defineProperty() 添加属性并指定 属性描述符
    Object.defineProperty(me, key, {
      // 访问描述符
      configurable: false, // 不可修改
      enumerable: true, // 可枚举
      // 访问属性时
      get: function proxyGetter() { 
        // 读取 data 中一样对应属性值返回(实现代理读操作)
        return me._data[key];
      },
      // 监视属性的更新
      set: function proxySetter(newVal) { 
        // 将最新的值保存到data中对应的属性上(实现代理写操作)
        me._data[key] = newVal;
      }
    });
  }
};