# 榛果交易平台

## 项目简介

本项目是 BUAA 软件学院大二下的软件工程大作业，本团队使用 Vue2 开发了一个二手交易平台的前端 UI，后端使用 Django 框架编写，后端仓库位于[这里](https://github.com/zhtjtcz/Software-Backend)。

项目运行方式如下，请先确保 git 和 npm 已经安装在您的电脑上：

```bash
# 克隆仓库到本地
git clone https://github.com/Withinlover/Hazelnut-Front

# 下载运行项目所需要的依赖
cd Hazelnut-Front && npm install

# 运行项目
npm run serve
```

运行完上述命令后，前端项目将运行在本机的 8080 端口，可以使用浏览器来进行访问。

## 技术架构

本项目技术架构为经典的 Vue2 前端架构，采用 Vuex 进行全局状态管理，采用 Vuex 进行路由管理，使用 Element-UI 作为前端的 UI 组件库。

下面是本项目文件的组织形式：

```json
{
  "public": "存放单页面应用的全局文件",
  "src": {
    "assets": "存放图片等资源",
    "components": "存放非页面级组件",
    "router": "存放vue-router路由模块",
    "store": "存放vuex全局状态模块",
    "theme": "存放element-ui的棕色主题",
    "views": "存放页面级组件",
    "App.vue": "作为项目的根组件",
    "icon.js": "存放项目中使用的一些图标",
    "main.js": "作为项目入口挂载根组件，并进行一些基本配置"
  },
  ".browserlistrc": "记录需要适配的浏览器",
  ".gitignore": "记录git版本管理需要忽略的文件",
  "babel.config.js": "作为Babel的配置文件按",
  "package.json": "作为项目依赖库的版本控制文件",
  "README.md": "作为项目说明文件"
}
```

## 致谢

感谢小组里的所有成员，在开发过程中我们团结互助，深刻体会到了软件工程的含义。

在大工程中，一个人的力量是极其微小的，唯协作能成大事。

下面是一些技术架构相关的链接：

- [Vue2](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex)
- [Vue-Router](https://github.com/vuejs/vue-router)
- [Element-UI](https://github.com/ElemeFE/element)
