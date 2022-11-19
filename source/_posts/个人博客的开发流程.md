title: 个人博客的开发流程
author: zip
tags: []
categories: []
date: 2022-04-02 15:23:00
---
网上有许多开源博客框架，可以让我们快速的搭建自己的个人网站。常见的博客框架有：[Hexo](https://hexo.io/)，[Typecho](https://zhuanlan.zhihu.com/p/34211709)，[Wordpress](https://cn.wordpress.org/)，[Halo](https://halo.run/)，[Solo](https://b3log.org/solo/)，[Vuepress](https://vuepress.vuejs.org/zh/)。这些都可以大大简化我们搭建个人网站的流程，并且可以自定义我们喜欢的主题。个人网站的好处就是可以让我们可以更加自由的写自己的文章，如果有兴趣开发自己的博客框架，就可以参考以下的建站流程

# 开发个人博客

开发前提：
系统需要安装[Node](https://nodejs.org/zh-cn/)环境，直接下载长期维护版，因为这个版本可能比较稳定。有时候版本过高会导致奇奇怪怪的问题，安装的时候直接下一步就好。个人比较推荐v14.8.0，因为我们在开发的过程中，可以需要用到node-sass的依赖包，执行yarn install的时候就会报错，两种方式解决，一是将node-sass改成sass【官方推荐】，二是将node的版本降低，经过测试v16是会报错的。开发工具的话可以选则[vscode](https://code.visualstudio.com/)或者[webstorm](https://www.jetbrains.com/webstorm/)，webstrom可以使用教育邮箱申请，或者去TB购买账号
后台的技术栈使用的是Java，因此我们还需要安装jdk，通常使用的[jdk1.8国内镜像下载地址](https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/8/jdk/x64/)版本。开发工具下载[IntelliJ IDEA](https://www.jetbrains.com/idea/)，可以选择社区版，这个版本是免费的。下载``Spring Assistant``插件，构建springboot项目，安装pom相关依赖，运行项目![企业微信截图_16483523743010.png](https://cdn.zipblog.top/企业微信截图_16483523743010.png?imageView2/0/q/75)如果碰到依赖包下载特别慢的情况，可以重新配置[maven]([https://cdn.rawchen.com/files/apache-maven-3.6.1.zip](https://cdn.rawchen.com/files/apache-maven-3.6.1.zip))的下载镜像，配置maven的`settings.xml`文件即可

```shell
# 检查node版本
node -v
# 全局安装cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 全局安装yarn
npm install -g yarn --registry=https://registry.npm.taobao.org
# yarn 路径并添加到 $PATH 在Linux中
export PATH=/usr/local/lib/node_modules/yarn/bin/:$PATH
echo $PATH
# 安装vue-cli
yarn global add @vue/cli
# 创建vue项目
vue create hello-world
# 运行项目
yarn install
yarn serve
# 检查jdk版本
java -version
```

前端主要技术栈：vue + vue-cli + vue-router + vuex + axios

+ [vue](https://cn.vuejs.org)：渐进式的JavaScript的框架
+ [vue-cli](https://cli.vuejs.org/zh/)：Vue.js 开发的标准工具
+ [vue-router](https://router.vuejs.org/zh/)：Vue.js 官方的路由管理器
+ [vuex](https://vuex.vuejs.org/zh/)：Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**
+ [axios](http://www.axios-js.com/)：易用、简洁且高效的http库

前端主要还是使用上诉的依赖包，还包含一些辅助依赖包，如@fancyapps/ui，可以有很好的文章图片切换的友好交互；@moefe/vue-aplayer一款音乐播放器的插件，可以显示歌词以及音乐的播放；js-cookie可以简化cookie的操作流程；live2d-widget卡通人物插件，美化博客相关页面等等；具体可以参考[开源代码](https://gitee.com/mcan/zipBlog.git)中的package.json文件。

后端主要技术栈：springboot + mybatis + mysql

+ [Spring Boot](https://spring.io/projects/spring-boot)：解决企业应用开发的复杂性后端开发框架
+ [MyBatis](https://mybatis.org/mybatis-3/zh/index.html)：MyBatis 是一款优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。
+ [MySQL](https://www.mysql.com/)：关系型数据库管理系统

如果使用springboot做web开发服务端，只需要引入web这个starter依赖即可，springboot使用的是内置的tomcat作为web服务器

# 前后端代码托管

前后端的代码均托管在码云上，使用docker进行项目的自动化部署[前台](https://gitee.com/mcan/zipBlog.git)、[后台](https://gitee.com/mcan/zipBlogServer.git)、[管理端](https://gitee.com/mcan/zipBlogAdmin)、[docker部署vue项目](https://juejin.cn/post/6844903837774397447)，[压力测试工具](https://blog.zets.cn/#/article/9)

# 部署线上

我们可以在阿里云购买Linux系统的ECS云服务器，进行项目构建的流程。安装好环境后，我们将执行以下的命令构建项目，管理端可以直接使用对应的[UI页面](https://panjiachen.github.io/vue-element-admin-site/zh/)

```shell
npm install -g @vue/cli
# OR
yarn global add @vue/cli
# 前端vue项目的构建
vue create my-project
# OR
vue ui
```

如果我们使用[sass这个css扩展语言](https://www.sass.hk/)，需要执行以下的代码，但是这块有个坑，它要求系统要安装python2.7，否则在安装依赖的时候，会报错。并且如果项目使用了预渲染，打包生产环境的时候也会报错。windows常用的[解决方式](https://blog.csdn.net/qq_42886417/article/details/103123659)，Vue的预渲染可能导致Linux环境打包生产模式失败。

```shell
npm i node-sass sass-loader style-loader -D
```

## Linux安装jdk

执行以下的脚本

```shell
# 运行环境
yum install java-1.8.0-openjdk java-1.8.0-openjdk-devel.x86_64 
```

## 安装Docker

```shell
# 最新的系统不需要update
yum update 
yum install docker
```

查看端口占用情况

```shell
终止8080端口
netstat -tunlp|grep 8080
kill -9 pid
```

后台运行springboot程序

```shell
# 后台运行jar包 自定义端口
nohup java -jar zip-blog-serve-0.0.1-SNAPSHOT.jar --server.port=8080 &
```

检查防火墙的运行状态

```shell
systemctl status firewalld
service firewalld stop
```

安装依赖的工具

```shell
# 云服务器需要装的node,git,nginx环境
yum install -y nodejs
yum install -y git
docker pull nginx
```

Linux下载码云上的代码

```shell
#切到跟目录
cd / 
#创建文件夹
mkdir zipBlog 
cd zipBlog
git clone https://gitee.com/mcan/zipBlog.git
```

新建好对应的映射文件后，即可运行docker中的``映射80端口``

```shell
docker run \
--name=nginx01 \
-p 80:80 \
-v /nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /nginx/logs:/var/log/nginx \
-v /nginx/html:/usr/share/nginx/html \
-v /nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf \
-d --rm nginx
```

映射443端口

```shell hljs
docker run \
--name=nginx02 \
-p 80:80 \
-p 443:443 \
-v /nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /nginx/logs:/var/log/nginx \
-v /nginx/html:/usr/share/nginx/html \
-v /nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf \
-v /nginx/conf.d/cert/:/etc/nginx/cert \
-d --rm nginx
```

快速删除node包

```shell hljs
cnpm install rimraf -g 
# 使用命令删除 
rimraf node_modules
# jarb上传工具
yum -y install lrzsz
rz -y
```

[node的版本太低的解决方式](https://segmentfault.com/a/1190000015302680)

强制复制的命令

```shell hljs
\cp -rf dist/* /nginx/html/web/ 
# 8000 端口运行vue
yarn serve --port 8000
```

家里的网络和ecs阿里云服务器使用npm安装 前提安装windows运行工具包

公司的网络使用yarn

node-sass安装失败：降低node的版本到v14.8.0安装[python2.7](https://npm.taobao.org/mirrors/python/2.7/)和初始化windows工具依赖环境

[神坑](https://www.jianshu.com/p/a48e061ae8fd)

```shell
yum install libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc
```

# 接入云评论

```shell hljs
npm install --save vuepress-plugin-comment
npm install valine --save
# npm 配置代理服务器
git config --global https.proxy 127.0.0.1:12639
git config --global http.proxy 127.0.0.1:12639
```

# 代码规范

+ 同级目录下使用相对路径，非同级使用@
+ [参考](https://echarts.apache.org/zh/coding-standard.html#%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83)
+ [Vue风格指南](https://v3.cn.vuejs.org/style-guide/)

备注：服务器宕机后的重启步骤

```bash
systemctl start docker
```

```bash
docker run -d -p 80:80 -p 443:443 --name nginx \
-v /nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /nginx/conf/conf.d:/etc/nginx/conf.d \
-v /nginx/html:/usr/share/nginx/html \
-v /nginx/logs:/var/log/nginx \
-v /nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf \
-v /nginx/ssl:/ssl/ \
-v /nginx/cache:/nginx/cache \
-d --rm nginx

```

```bash
docker run --detach --name solo --network=host \
    --env RUNTIME_DB="MYSQL" \
    --env JDBC_USERNAME="root" \
    --env JDBC_PASSWORD="919496" \
    --env JDBC_DRIVER="com.mysql.cj.jdbc.Driver" \
    --env JDBC_URL="jdbc:mysql://127.0.0.1:3307/solo?useUnicode=yes&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true" \
    -v /skins/:/opt/solo/skins/	\
    --rm \
    b3log/solo --lute_http=http://127.0.0.1:8249  --listen_port=8080 --static_server_scheme=https --static_server_host=cdn.jsdelivr.net --static_server_port=  --static_path=/gh/Arrowfield/solo@4.3.2/src/main/resources    --server_scheme=https --server_host=zipblog.top --server_port=