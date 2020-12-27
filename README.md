# Vue 全家桶

# 第一章 Vue 核心

## 1.1 基本认识

- **官网**

  - 英文：https://vuejs.org/
  - 中文：https://cn.vuejs.org/

- 简介

  - 渐进式 JavaScript 框架

    渐进式：可以只使用基础的核心库，随着项目的需求再使用扩展的插件

  - 作者：尤玉溪

  - 作用：**动态构建用户界面**

    构建界面：将后台的数据可以在前台动态的渲染

- 特点

  1. 遵循 MVVM 模式

     ```txt
     V:View 前端的界面，视图
     M:Model 需要渲染到视图的数据集
     VM:ViewModel 负责连接 View 和 Model 
     ```

  2. 编码简介，体积小，运行效率高，适合 移动/PC 端开发

  3. 本身只关注 UI，可以轻松引入 vue 插件或第三方开发项目

- 与其他前端 JS 框架的联合

  1. 借鉴了 Angular 的 **模块** 和 **数据绑定** 技术
  2. 借鉴了 React 的 **组件化** 和 **虚拟 DOM** 的技术

- vue 扩展插件(部分)

  1. vue-cli: vue 脚手架
  2. vue-resouce(axios): ajax 请求
  3. vue-router: 路由
  4. vuex: 状态管理
  5. ...

## 1.2  基本使用

### Hello Vue

1. 编写页面 - **View**
2. 引入 vue.js
3. 创建 vue 对象 - **ViewModel**
   - el: 指定根元素 element,通过选择器(指定要管理的区域)
   - data: 初始化数据 - **Model**
4. 使用 v-model 属性，代表双向数据绑定
5. 显示数据 {{xxx}}

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>01_HelloWorld</title>
    </head>
    <body>
        <!-- 
            1. 引入 vue.js 文件
            2. 创建 vue 对象 - ViewModel
            	el: 指定根元素 element,通过选择器(指定要管理的区域)
            	data: 初始化数据 - Model
            3. 使用 v-model 属性，代表双向数据绑定
            4. 显示数据 {{xxx}}
		-->
        <!-- v(view) -->
        <div id="app">
            <!-- 使用 v-model 属性指定要绑定的数据属性 -->
            <input type="text" v-model="info">
            <p>Hello {{info}}</p>
        </div>
    </body>
    <script src="../js/vue.js"></script>
    <script>
        // 创建 Vue 实例(ViewModel)
        let vm = new Vue({ // 传入一个配置对象
            el: "#app", // el(element):选择器;选择要管理的区域
            data: { // 数据(model)
                info: "巴御前！"
            }
        });
    </script>
</html>
```

### vue 开发者工具调试

1. 安装游览器插件 `vue-devtools`

   参考博客：https://blog.csdn.net/taurus102/article/details/111515228

   也可以通过谷歌应用商城进行搜索下载安装

2. 运行 vue 项目

3. 打开控制台调试，切换到 **vue** 面板

   ![image-20201226084546015](README.assets/image-20201226084546015.png)

### Vue 的 MVVM 结构

> ![image-20201226084630781](README.assets/image-20201226084630781.png)

- **Model** === vm 中的 data；数据对象

- **View** === DOM(页面元素)；模板页面

  **vue 中的 view 使用的两种语法**

  - 指令(自定义标签属性)
  - 大括号表达式(显示数据) 

- **ViewModel** === Vue 实例(vm)

  - DOM Listeners：DOM 监听
  - Data Bindings：数据绑定(可以将内存中的数据显式的出现在页面)

- 声明式开发：只需要使用**指定的语法**就可以(vue)

- 命令式开发：需要自定的去完成整个业务的流程(jquery)

## 1.3  模板语法

- 模板的理解
  - 动态的 Html 页面
  - 包含了一些 JS 语法代码
    - 双大括号表达式(JS 表达式，可以写 JS 语法)
    - 指令(以 v- 开头的自定义标签属性)

- 分类

  1. 双大括号表达式
     - 语法：{{ exp }}
     - 功能：向页面输出数据
     - 注意：可以使用 JS 的语法调用对象的方法
  2. 强制数据绑定
     - 功能：执行变化的属性值
     - 语法1：`v-bind:属性名='属性值' ` 属性值会作为**表达式解析执行**
     - 语法2：`:属性名=属性值` 
  3. 绑定事件监听
     - 功能: 绑定指定事件名的 **回调函数**
     - 语法1: `v-on:事件名 = 'xxx':`
     - 语法2: `@事件名 = 'xxx'`
     - 注意：
       - 绑定事件是可以使用(传入参数)也可以不使用()
       - 传入参数时可以使用 JS 表达式调用 data 中的数据
     - 对应的 vm 管理对象中需要配置 **methods** 对象属性，由其来进行 **DOM监听事件** 的管理

- 实例

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>02_模板语法</title>
  </head>
  <body>
      <div id="app">
          <h2>1. 双大括号表达式</h2>
              <p>{{msg}}</p> <!-- textContent -->
              <!-- 使用 JS 语法 - 调用对象的方法 -->
              <p>{{msg.toUpperCase()}}</p>
              <!-- v-text:普通的文本 -->
              <p v-text="msg"></p> <!-- textContent -->
              <!-- v-html:HTML 标签 -->
              <p v-html="msg"></p> <!-- innerHTML -->
  
          <h2>2. 指令一：强制数据绑定</h2>
              <!-- 原 HTML 语法 -->
              <img src="imgUrl"/>
              <!-- 将 HTML 语法强制转换成 JS 表达式(绑定数据) -->
              <!-- 1. 使用 v-bind: 前缀-->
              <img v-bind:src="imgUrl" />
              <!-- 2. 使用 : 前缀 -->
              <img :src="imgUrl" />
  
              
          <h2>3. 指令二：绑定事件监听</h2>
          <!-- 
              绑定事件是可以使用(传入参数)也可以不使用()；
              传入参数时可以使用 JS 表达式调用 data 中的数据 
          -->
              <!-- 使用 v-on:事件 前缀 -->
              <button v-on:click="test">test</button>
              <!-- 使用 @事件 前缀 -->
              <button @click="test2(msg)">test2()</button>
  
      </div>
  </body>
  <script src="../js/vue.js"></script>
  <script>
      const vm = new Vue({
          el: "#app",
          data: { // data 的所有属性都会成为 vm 对象的属性，而模板页面中可以直接访问
              msg: "<a href='http://www.baidu.com'>百度一下，你就知道</a>",
              imgUrl: "https://cn.vuejs.org/images/logo.png"
          },
          //使用 methods 管理监听事件
          methods: {
              test(){
                  alert("byq");
              },
              test2(value){
                  alert(value)
              }
          }
      });
  </script>
  </html>
  ```

## 1.4 计算属性和监视

> 注意：**谨慎使用箭头函数 () => {} 因为箭头函数的 this 属性是在函数声明是决定的而不是调用**

### 计算属性

- 在 vm 对象中可以配置 computed 属性对象，用来定义 **计算属性** 的方法

- 在页面中可以直接使用 `{{ 方法名 }}` 来显示计算的结果 - 计算属性中对应的方法，返回值都将作为属性值

- 语法：**计算属性名 () {}** 

- 调用的时机：初始化显示 / **相关的 data 属性**数据发生变化时

- ```vue
  <script>
      const vm = new Vue({
          el: "#demo",
          data: {
              firstName : "巴",
              lastName : "御前",
              // fullName1: "巴御前"
          },
          // computed：定义计算属性
          computed: {
              // 执行的时机：初始化显示 / 相关的 data 属性数据发生改变时
              // 计算属性中对应的方法，返回值都将作为属性值
              // 语法：计算属性名(){}
              fullName1 (){
                  console.log("fullName1()...");
                  return this.firstName + " " + this.lastName;
              }
          }
      });
  </script>
  ```

### 监视

- 可以通过 vm 对象的 watch配置 或 $watch() 方法来 **监视指定属性**

- 当属性发生变化时，回调函数就会自动调用，在函数内部进行计算

- 语法

  1. watch 配置：(data)属性名: 回调函数(新的值,旧的值){}
  2. $watch() 方法：vm.$watch("(data)属性名",回调函数(newValue,oldValue){});

- ```vue
  <script>
      const vm = new Vue({
          el: "#demo",
          data: {
              firstName : "巴",
              lastName : "御前",
              fullName2: "巴 御前"
          },
          // 监视语法1：watch-定义监视属性 
          watch: {
              // 语法：(data)属性名: 回调函数(新的值,旧的值){}
              // 调用时机：当监听的数据发生改变时就会触发相应的回调函数
              firstName: function(newValue,oldValue){
                  // 可以只接收一个参数，也可以接收多个参数
                  this.fullName2 = newValue + " " + this.lastName;
                  // 注意：这里不能使用箭头函数 () => {},因为箭头函数的 this 属性是在函数声明是决定的而不是调用
                  console.log(this); // vm 实例对象
              }
          }
      });
  
      // 监视语法2：除了直接在对象中进行配置外，还可以调用 vm 对象的 $watch() 方法进行配置
      // 语法：vm.$watch("(data)属性名",回调函数(newValue,oldValue){});
      vm.$watch("lastName",function(value){
          this.fullName2 = this.firstName + " " + value;
      });
  </script>
  ```

### 计算属性高级

> **回顾：**回调函数：1. 自定义的；2. 没有调用；3. 执行了

-  通过 getter/setter 实现对计算属性数据的显示和监视

  - 定义 get(获取) 回调函数，需要读取当前计算属性的值时，根据相关的数据(data)**计算并返回**当前属性数据的值

    同理：当相关的数据发生改变时也会调用 getter 函数

  - 定义 set(监视) 回调函数，当前计算属性的值发生变化时发生回调，更新相关的数据(data)

  - ```vue
    <script>
        const vm = new Vue({
            el: "#demo",
            // computed：定义计算属性
            computed: {
                // 定义一个计算属性的 get 和 set
                fullName3: {
                    /* 
                    定义 get(获取) 回调函数，当需要读取当前的计算属性值，根据相关的数据计算并返回当前属性的值
                    当相关的数据发生改变时也会执行
                    */
                    get() {
                        return this.firstName + " " + this.lastName;
                    },
                    // 定义 set(监视) 回调函数，当属性值发生改变时发生回调，更新相关的属性数据
                    set(value) {
                        console.log("fullName3.set()...");
                        let names = value.split(" ");
                        this.firstName = names[0];
                        this.lastName = names[1];
                    }
                }
            }
        });
    </script>
    ```

- **计算属性存在缓存，多次读取只调用一次 getter**

  > 缓存使用的时一个对象，key 为计算属性名，value 为值(不知道有没有拥 Map)
  >
  > 在调用过 setter 方法 / 相关的数据(data) 发生改变时才会更新缓存

  ```vue
  <body>
      <!-- 
      1. 计算属性
          - 在 computed 属性对象中定义计算属性的方法
          - 在页面中使用 {{方法名}} 来显示计算的结果
      2. 监视属性
          - 通过 vm 对象的 $watch() 或 watch配置 来监视指定的属性
          - 当属性变化时，回调函数自动调用，在函数内部进行计算
      3. 计算属性高级
          - 通过 getter/setter 实现对属性数据的显示和监视
          - 计算属性存在缓存，多次读取只执行执行一个 getter 计算
  
      -->
      <div id="demo">
          姓：<input type="text" placeholder="First Name" v-model="firstName" /> <br/>
          名：<input type="text" placeholder="Last Name" v-model="lastName" /> <br/>
          姓名3(双线)：<input type="text" placeholder="Full Nmae2" v-model="fullName3" /> <br/>
          <!-- 多次读取，只执行一次 getter -->
          <p>{{fullName1}}</p>
          <p>{{fullName1}}</p>
          <p>{{fullName1}}</p>
      </div>
  </body>
  ```

  ![image-20201226114118717](README.assets/image-20201226114118717.png)

## 1.5 class 与 style 绑定

> 在应用界面中，有些元素的样式是变化的；而 **class/style** 绑定就是专门用来**实现动态样式效果**的技术 

### class 绑定

- 语法：`:class = 'xxx'`; 其中 xxx 的值可以是 **字符串/对象/数组**

- 注意：即使使用了 class 绑定，仍可以使用 class 指定静态的 class 类名

- 实例

  1. 字符串

     - xxx 指定为 data 中对应的属性名即可

     - ```vue
       <!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>04_class与style绑定</title>
           <style>
               .aClass{
                   color: red;
               }
               .bClass{
                   color: blue;
               }
               .cClass{
                   font-size: 30px;
               }
           </style>
       </head>
       <body>
           <div id="demo">
               <h2>1. class绑定：class = 'xxx'</h2>
                   <!-- 仍可以使用 class 定义静态的 class 属性 -->
                   <p class="cClass" :class="a">xxx的值字符串</p>
                   <button @click="update">修改颜色</button>
           </div>
           <script src="../../js/vue.js"></script>
           <script>
               const vm = new Vue({
                   el: "#demo",
                   data: {
                       a: "aClass",
                   },
                   methods: {
                       ////动态的修改 data 数据对应的属性值
                       update(){
                           this.a = "bClass";
                       }
                   }
               });
           </script>
       </body>
       </html>
       ```

  2. 对象

     - 内部语法：`{类名:true/false/data数据[,类名2:.....]}`

     - 建议写成 data 数据，而不是写成一个字面量

     - ```vue
       <!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>04_class与style绑定</title>
           <style>
               .aClass{
                   color: red;
               }
               .bClass{
                   color: blue;
               }
               .cClass{
                   font-size: 30px;
               }
           </style>
       </head>
       <body>
           <div id="demo">
               <h2>1. class绑定：class = 'xxx'</h2>
                   <!-- 以 `key(类名):true/false/data数据,[...]` 的格式定义，建议都写成data数据，而不是写死 -->
                   <p :class="{aClass: isA,bClass: isB,cClass: false}">xxx的值是对象</p>
                   <button @click="update">修改颜色</button>
               <h2>2. style绑定 </h2>
           </div>
           <script src="../../js/vue.js"></script>
           <script>
               const vm = new Vue({
                   el: "#demo",
                   data: {
                       isA: true,
                       isB: false
                   },
                   methods: {
                       //动态的修改 data 数据对应的属性值
                       update(){
                           this.isA = false;
                           this.isB = true;
                       }
                   }
               });
           </script>
       </body>
       </html>
       ```

  3. (不常用)数组

     - 内部语法：`['class类名'/data数据[,....]]`

     - 可以指定多个 class 类名，建议使用 data 的属性名

     - ```vue
       <!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>04_class与style绑定</title>
           <style>
               .aClass{
                   color: red;
               }
               .bClass{
                   color: blue;
               }
               .cClass{
                   font-size: 30px;
               }
           </style>
       </head>
       <body>
           <div id="demo">
               <h2>1. class绑定：class = 'xxx'</h2>
                   <!-- (不常用) 可以指定多个 class 类名，可以使用 data 的属性名 -->
                   <p :class="[a,'cClass']">xxx的值数组</p>
                   <button @click="update">修改颜色</button>
               <h2>2. style绑定 </h2>
           </div>
           <script src="../../js/vue.js"></script>
           <script>
               const vm = new Vue({
                   el: "#demo",
                   data: {
                       a: "aClass",
                   },
                   methods: {
                       //动态的修改 data 数据对应的属性值
                       update(){
                           this.a = "bClass";
                       }
                   }
               });
           </script>
       </body>
       </html>
       ```

### style 绑定

- 语法： `{样式1:data数据[,样式2:data数据2...]}`

- ```vue
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>04_class与style绑定</title>
      <style>
          .aClass{
              color: red;
          }
          .bClass{
              color: blue;
          }
          .cClass{
              font-size: 30px;
          }
      </style>
  </head>
  <body>
      <div id="demo">
          <h2>2. style绑定 </h2>
              <p :style="{color: activeColor,fontSize: fontSize + 'px'}">绑定 style</p>
      </div>
      <script src="../../js/vue.js"></script>
      <script>
          const vm = new Vue({
              el: "#demo",
              data: {
                  activeColor: "red",
                  fontSize: 20 
              },
              methods: {
                  //动态的修改 data 数据对应的属性值
                  update(){
                      this.activeColor = "blue";
                      this.fontSize = 30;
                  }
              }
          });
      </script>
  </body>
  </html>
  ```

## 1.6 条件渲染

- 条件渲染指令

  1. v-if

  2. v-else

  3. v-show

  4. ```vue
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>05_条件渲染</title>
     </head>
     <body>
         <div id="demo">
             <!-- v-if 指定一个 data 数据参数，如果数据为 true 就显示，反之不显示 -->
             <p v-if="ok">成功啦</p>
             <!-- v-esle 可以不指定参数。默认和上面的元素进行匹配 -->
             <p v-else>失败了</p>
     
             <!-- v-show 则需要自己指定要使用的 data 数据参数 -->
             <p v-show="ok">成功了！！</p>
             <p v-show="!ok">失败了！！</p>
             <button @click="ok=!ok">切换</button>
         </div>
         <script src="../../js/vue.js"></script>
         <script>
             const vm = new Vue({
                 el: "#demo",
                 data: {
                     ok: false
                 }
             });
         </script>
     </body>
     </html>
     ```

- 对比 v-if 和 v-show

  <img src="README.assets/image-20201226144817177.png" alt="image-20201226144817177" style="zoom:50%;" />

  **总结：如果需要进行频繁的切换，show 会跟好一点**

## 1.7 列表渲染

### 遍历数组

- 语法: `v-for = (元素,索引) in 数组`

- 使用一个额外的指令 `:key` 指定键(好像)

- **vue 的变更方法**

  - 详情可以查看文档：https://cn.vuejs.org/v2/guide/list.html
  - 在 vue 中，如果需要有关于数组的视图更新，就不要直接通过 **[索引]** 去操作数组中的元素，**因为 vue 默认监听的是数组，而不是数组中的元素**
  - 对于数组，vue **包装了原生 JS 中的数组方法**(也就是变更方法)，使我们在调用这些方法时，依然会触发 **视图更新**
  - 变更方法
    - push()
    - pop()
    - shift()
    - unshift()
    - splice()
    - sort()
    - reverse()

- 实例

  ```vue
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>05_列表渲染</title>
  </head>
  <body>
      <div id="demo">
          <h2>测试：v-for 遍历数组</h2>
          <ul>
              <!-- 
                  v-for 语法: (遍历元素,索引) in data数据(数组) 
                  还可以使用一个 :key 用来指定键
              -->
              <li v-for="(p,index) in persons" :key="index">
                  {{index}} --- {{p.name}} --- {{p.age}}
                  --- <button @click="deleteP(index)">删除</button>
                  --- <button @click="updateP(index,{name: 'Cat',age: 22})">修改</button>
              </li>
          </ul>
      </div>
      <script src="../../js/vue.js"></script>
      <script>
          const vm = new Vue({
              el: "#demo",
              data: {
                  persons: [
                      {name:"Dark",age:17}, 
                      {name:"Tom",age:17}, 
                      {name:"Jack",age:17}, 
                      {name:"MiaoNei",age:18}, 
                  ]
              },
              methods: {
                  deleteP: function(index){
                      // 删除指定 index 的元素
                      this.persons.splice(index,1);
                  },
                  updateP: function(index,person){
                      // 修改指定 index 上的元素
                      // this.persons[index] = person; //不能直接操作 index 对数组内部的元素进行修改
                      this.persons.splice(index,1,person); //通过变更方法去修改数组内的元素数据
                  }
              }
          });
      </script>
  </body>
  </html>
  ```

  

### 遍历对象(不常用)

- 语法：`v-for(value,key) in 对象`

- 使用一个额外的指令 `:key` 指定键(好像)

- 实例

  ```vue
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>05_列表渲染</title>
  </head>
  <body>
      <div id="demo">
          <h2>测试：v-for 遍历对象</h2>
          <ul>
              <!-- v-for 语法：(属性值,属性名) in data数据(对象) -->
              <li v-for="(value,key) in persons[1]" :key="key">
                  {{key}} --- {{value}}
              </li>
          </ul>
      </div>
      <script src="../../js/vue.js"></script>
      <script>
          const vm = new Vue({
              el: "#demo",
              data: {
                  persons: [
                      {name:"Dark",age:17}, 
                      {name:"Tom",age:17}, 
                      {name:"Jack",age:17}, 
                      {name:"MiaoNei",age:18}, 
                  ]
              }
          });
      </script>
  </body>
  </html>
  ```

  

### 列表的搜索过滤和排序

```vue
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>06(2)_列表的搜索和排序</title>
    </head>
    <body>
        <!-- 
			列表过滤
			列表排序
		-->
        <div id="demo">
            <input type="text" placeholder="根据name进行搜索" v-model="searchName" />
            <ul>
                <li v-for="(p,index) in filterPerson" :key="index">
                    {{index}} --- {{p.name}} --- {{p.age}}
                </li>
            </ul>
            <button @click="orderType=1">年龄升序</button> 
            <button @click="orderType=2">年龄降序</button> 
            <button @click="orderType=0">原本顺序</button> 
        </div>
        <script src="../../js/vue.js"></script>
        <script>
            const vm = new Vue({
                el: "#demo",
                data: {
                    searchName: "",
                    orderType: 0, //使用数字区别排序的类型; 0 代表原来顺序，1代表年龄升序，2代表年龄降序
                    persons: [
                        {name:"Dark",age:17}, 
                        {name:"Tom",age:17}, 
                        {name:"Jack",age:17}, 
                        {name:"MiaoNei",age:18}, 
                    ]
                },
                computed: {
                    filterPerson() {
                        //使用解构赋值获取需要的 data 数据
                        const { searchName , persons , orderType } = this;
                        // 遍历原数组中的数据，得到一个新的数组
                        let filterPerson;
                        filterPerson = persons.filter(p => p.name.indexOf(searchName)!==-1);
                        //根据排序的类型不同，进入不同的排序
                        //如果为0就不进行排序
                        if( orderType !== 0 ){
                            filterPerson.sort((p1,p2) => {
                                //如果为1就是升序排序
                                if(orderType === 1){
                                    return p1.age - p2.age;
                                    //如果为2就是降序排序
                                }else{
                                    return p2.age - p1.age;
                                }
                            })
                        }
                        return filterPerson;
                    }
                }
            })
        </script>
    </body>
</html>
```

1. 对于 sort 方法可以自定义排序的规则
   - a 小于 b 返回一个小于0的值，a在b位置的前面
   - a 等于 b 返回一个等于0的值，a、b位置不变
   - a 大于 b 返回一个大于0的值，a在b位置的后面

## 1.8 事件处理

### 绑定监听

1. ```vue
   <!DOCTYPE html>
   <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>07_事件监听</title>
       </head>
       <body>
           <div id="demo">
               <h2>事件监听</h2>
               <!-- 如果不传入参数，默认会传入一个 event(可以通过 target 属性访问当前触发回调函数的 DOM 元素) -->
               <button @click="test1">test1</button>
               <!-- 如果传入一个参数,那么就不会传入默认的 event 对象 -->
               <button @click="test2('巴御前')">test2</button>
               <!-- 如果需要传入参数，又需要操作当前的 DOM 元素，可以显式的传入一个参数 $event,该参数就是 event -->
               <button @click="test3('巴御前',$event)">test3</button>
           </div>
           <script src="../../js/vue.js"></script>
           <script>
               const vm = new Vue({
                   el: "#demo",
                   methods: {
                       test1(event) {
                           alert(event.target.innerHTML);
                       },
                       test2(value) {
                           alert(value + "は一番可愛いよ")
                       },
                       test3(value,event) {
                           alert(event.target.innerHTML + ": " + value + "は私の彼女ですわ");
                       }
                   }
               });
           </script>
       </body>
   </html>
   ```

2. 如果不传入参数，默认会传入一个 event(可以通过 target 属性访问当前触发回调函数的 DOM 元素)

   <img src="README.assets/image-20201226170014781.png" alt="image-20201226170014781" style="zoom:50%;" />

3. 如果传入一个参数,那么就不会传入默认的 event 对象

    <img src="README.assets/image-20201226170030579.png" alt="image-20201226170030579" style="zoom:50%;" />

4. 如果需要传入参数，又需要操作当前的 DOM 元素，可以显式的传入一个参数 $event,该参数就是 event

    <img src="README.assets/image-20201226170043395.png" alt="image-20201226170043395" style="zoom:50%;" />

### 事件修饰符

1. 阻止事件的冒泡 - 在绑定数据监听的后面加上 `.stop`  即可

2.  阻止事件的默认行为 - 在绑定数据监听的后面加上 `.prevent` 即可

3. 实例

   ```vue
   <!DOCTYPE html>
   <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>07_事件监听</title>
       </head>
       <body>
           <div id="demo">
               <h2>事件修饰符</h2>
               <!-- 阻止事件的冒泡 -->
               <div style="width: 200px;height: 200px;background-color: red;" @click="test4">
                   <!-- 添加事件修饰符 .stop 即可 -->
                   <div style="width: 100px;height: 100px;background-color:pink;" @click.stop="test5"></div>
               </div>
   
               <!-- 阻止事件的默认行为 - 添加事件修饰符 .prevent -->
               <a href="http://www.baidu.com" @click.prevent="test6">去百度</a>
           </div>
           <script src="../../js/vue.js"></script>
           <script>
               const vm = new Vue({
                   el: "#demo",
                   methods: {
                       test4() {
                           alert("out");
                       },
                       test5() {
                           alert("inner");
                       },
                       test6() {
                           alert("巴御前添加第一!!");
                       }
                   }
               });
           </script>
       </body>
   </html>
   ```

### 按键修饰符

- 可以在键盘事件的后面加上 **.键对应的keyCode / 键名(只有部分键才有用)** ,这样当只有按下对应的键时才会调用对应的回调函数

- **注意：键名只有部分键才可以生效**

- 实例

  ```vue
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>07_事件监听</title>
      </head>
      <body>
          <div id="demo">
              <h2>按键修饰符</h2>
              <!-- 可以在键盘事件的后面加上 .键对应的keyCode / 键名(只有部分键才有) ,这样当只有按下对应的键时才会调用对应的回调函数 -->
              <input type="text" @keyup.13="test7" />
              <input type="text" @keyup.space="test8" />
          </div>
          <script src="../../js/vue.js"></script>
          <script>
              const vm = new Vue({
                  el: "#demo",
                  methods: {
                      test7(event) {
                          alert(event.target.value);
                      },
                      test8(event) {
                          alert(event.target.value);
                      }
                  }
              });
          </script>
      </body>
  </html>
  ```

  

## 1.9 表单的输入绑定

- 对于 `radio` 类型的表单组件，绑定的 value 值是选中组件的 value 值

- 对于 `checkbox` 类型的表单组件，绑定的 v-model 值应该为 **数组**，其中保存的值是选择的组件对应的 value 值

- 对应 `select` 类型的表单组件，绑定的 v-model 的值是内部 option 对应的 value 值

- ```vue
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>08_表单输入绑定</title>
      </head>
      <body>
          <!-- 使用 v-model(双向数据绑定)自动收集数据 -->
          <div id="demo">
              <!-- 使用 .prevent 阻止事件的默认行为 -->
              <form action="/xxx" @submit.prevent="sumbitForm">
                  <span>用户名：</span>
                  <input type="text" v-model="username" /> <br>
  
                  <span>密码：</span>
                  <input type="password" v-model="password" /> <br>
  
                  <!-- 对于 radio 单选框，v-model 是以 value 值进行区别的 -->
                  <span>性别：</span> 
                  <label for="male">男</label>
                  <input type="radio" id="male" value="男" v-model="sex" name="sex"/>
                  <label for="female">女</label>
                  <input type="radio" id="female" value="女" v-model="sex" name="sex"/> <br>
  
                  <!-- 对于 checkbox ，绑定的 v-model 数据值需要使用数组数据类型来接收 
  					其中保存的值是对于组件的 value 值
  				-->
                  <span>爱好：</span>
                  <label for="fgo">FGO</label>
                  <input type="checkbox" value="fgo" id="fgo" v-model="likes">
                  <label for="yys">阴阳师</label>
                  <input type="checkbox" value="yys" id="yys" v-model="likes">
                  <label for="mrfz">明日方舟</label>
                  <input type="checkbox" value="mrfz" id="mrfz" v-model="likes"> <br>
  
                  <span>城市：</span>
                  <!-- 对于 select 标签，绑定的 v-model 是以内部 option 的 value 值进行区别的 -->
                  <select v-model="cityId">
                      <option value="0">未选择</option>
                      <!-- 传输给后端的 value 应该是对于选项的 id，使用 : 前缀将其转换为表达式  -->
                      <option v-for="(city,index) in cityList" :value="city.id">{{city.name}}</option>
                  </select> <br>
  
                  <span>介绍：</span>
                  <textarea rows="10" v-model="desc"></textarea> <br>
  
                  <input type="submit" value="注册">
              </form>
          </div> 
          <script src="../../js/vue.js"></script>
          <script>
              const vm = new Vue({
                  el: "#demo",
                  data: {
                      username: '',
                      password: '',
                      /* radio：可以设定初始值为指定的 value */
                      sex: '男',
                      /* checkbox：可以设定多个数组元素为指定的 value */
                      likes: ['fgo','yys'],
                      /* select：可以设定对应 option 的 value 值设置初始值 */
                      cityId: "0",
                      cityList: [
                          {name:"北京",id: 1},
                          {name:"东京",id: 2},
                          {name:"深圳",id: 3}
                      ],
                      desc: "巴御前天下第一"
                  },
                  methods: {
                      sumbitForm() {
                          console.log(
                              this.username + " " + this.password
                              + " " + this.sex + " " + this.likes 
                              + " " + this.cityId + " " + this.desc
                          );
                      }
                  }
              });
          </script>
      </body>
  </html>
  ```

  

## 1.10 生命周期

- vue 对象的生命周期

  1. 初始化显示阶段
     - beforeCreate()
     - created()
     - beforeMount()
     - **mounted()**
  2. 更新阶段
     - beforeUpdate()
     - updated()
  3. 销毁 vue 实例: vm.**$destroy()**
     - **beforeDestroy()**
     - destroyed()
  4. 常用的生命周期方法
     - created() /  mounted()：主要负责发送 Ajax 请求，启动定时器等异步任务
     - beforeDestroy()：死亡之前执行，负责做收尾工作，比如清除定时器

- 图解

  ![Vue2-生命周期](README.assets/Vue2-生命周期.jpg)

- 实例

  ```vue
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>09_生命周期</title>
  </head>
  <body>
      <!-- 
          1. 初始化显示阶段
              - beforeCreate()
              - created()
              - beforeMount()
              - mounted()
          2. 更新阶段
              - beforeUpdate()
              - updated()
          3. 销毁 vue 实例: vm.$**destory()**
              - beforeDestory()
              - destoryed()
          4. 常用的生命周期方法
              - created() /  mounted()：主要负责发送 Ajax 请求，启动定时器等异步任务
              - beforeDestroy()：死亡之前执行，负责做收尾工作，比如清除定时器
       -->
      <div id="app">
          <button @click="destroyVm">destroy</button>
          <p v-show="isShow">ABCDEFGHIJK...</p>
      </div>
      <script src="../../js/vue.js"></script>
      <script>
          const vm = new Vue({
              el: "#app",
              data: {
                  isShow: true
              },
              // 1. 初始化显示阶段
              beforeCreate() {
                  console.log('初始化显示阶段');
                  console.log("beforedCreate");
              },
              created() {
                  console.log("created");
              },
              beforeMount() {
                  console.log("beforeMount");
              },
              // * mounted 主要负责发送 Ajax 请求，启动定时器等异步任务
              mounted() {
                  console.log("mounted");
                  // 将定时器的唯一标识作为当前 vm 对象的属性
                  this.interId = setInterval(() => {
                      //这里使用箭头函数是因为异步任务调用时，this 为 window 会导致报错
                      //所以使用箭头函数，在声明时固定 this 为 vm 对象
                      this.isShow = !this.isShow;
                  },1000)
              },
              // 更新阶段
              beforeUpdate() {
                  console.log('更新阶段');
                  console.log('beforeUpdate');
              },
              updated() {
                  console.log('updated');
              },
              methods: {
                  destroyVm() {
                      console.log(this);
                      // 调用 vm.$destory() 使其进入死亡阶段
                      this.$destroy();
                  }
              },
              // 死亡阶段
              // * beforeDestroy 主要负责收尾工作，比如关闭定时器等 
              beforeDestroy() {
                  console.log('死亡阶段');
                  console.log('beforeDestroy');
                  clearInterval(this.interId);   
              },
              destroyed() {
                  console.log('destroyed');
              }
          })
      </script>
  </body>
  </html>
  ```

- 效果

  ![image-20201227113828329](README.assets/image-20201227113828329.png)