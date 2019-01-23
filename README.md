# Ai Design 单页应用项目工程模板

本模版用于构建基于 Ai Design Taurus 组件库单页项目工程。

本模版中涉及的国际化语言资源是通过工程编译来加载的。

## 开发

首先，打开命令行控制台，进入工程根目录，然后执行下面的命令进行预打包：

```bash
# 将项目第三方依赖包预打包,提升项目开发编译速度
aid vendor
```

> 注意：如果第三方包被更新需要重新运行这个命令以提升开发效率

执行以下命令启动本地开发服务器：

```bash
aid dev
```

你可以通过`-p`参数指定服务器端口：

```bash
aid dev -p 3000
```

本地开发服务器启动完毕后会自动打开默认浏览器并跳转至项目首页。

## 单元测试

单元测试用例写在`test/unit/spec`目录下，执行下面的命令运行单元测试：

```bash
aid test --watch
```

## 集成测试

集成测试用例写在`test/e2e/spec`目录下，执行下面的命令运行集成测试：

```bash
aid test --e2e
```

> 注意：集成测试默认使用 chrome 浏览器

## 打包发布

通过以下命令进行工程编译：

```bash
aid build
```

工程编译后的文件默认会保存到`dist`目录下。