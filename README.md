# KOA2 WEB base on TypeScript #

## 环境要求 ##

1、Node 环境 node >= 7.6 （需要原生的 async/await 语法支持)  
2、推荐采用 yarn 管理依赖， 使用npm 也可以   
3、TypeScript >= 2.x  
4、PM2 安装配置
> - 全局安装 PM2: npm install -g pm2  
> - 安装 PM2 的 TypeScript 解释器： pm2 install typescript (执行该命令建议翻墙)

5、获得 mysql 数据库配置参数  
6、获得 redis 缓存配置参数  

## 使用该框架 ## 
1、拉取框架代码 git clone  
2、安装依赖: yarn install ( npm install )  
3、添加 mysql & redis 配置参数， (如何修改在后面介绍)  
4、启动服务：
> - 开发环境启动服务: 在工程根目录下执行命令： npm start  
> - 生产环境部署服务： 在工程跟目录下执行命令： npm run deploy  

## 框架介绍 ##
博客： [基于 KOA2 + Typescript 的 web 开发框架介绍](https://feifeiyum.github.io/2017/03/06/koa2-web-typescript-md/)

## 问题 ##
工程可能在 windows 下运行存在问题。[Windows - pm2 install typescript](https://github.com/Unitech/pm2/issues/2675)。 
### 解决方案 ###
1、可以先把整个工程通过 typescript 把 ts 脚本解释成 js 脚本。 进入 src 目录， 执行 tsc app.ts  
2、将 config 目录下的 pm2.dev.config.json 和 pm2.prod.config.json 两个文件中的配置 "script": "./src/app.ts", 改成 "script": "./src/app.js"  
3、正常启动工程 (npm start)