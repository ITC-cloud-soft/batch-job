<p align="center">

[//]: # (	<img alt="logo" src="https://oscimg.oschina.net/oscnet/up-b99b286755aef70355a7084753f89cdb7c9.png">)
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">Batch Job</h1>
<h4 align="center">基于 React/Antd UI，Quartz 和 C#/Aspnet 前后端分离的任务管理执行工具</h4>
<p align="center">
	<a href="https://gitee.com/y_project/RuoYi-Cloud/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"></a>
</p>
<p align="center">
  <a href="./README.md"><img alt="README in English" src="https://img.shields.io/badge/English-d9d9d9"></a>
  <a href="./README_CN.md"><img alt="简体中文版自述文件" src="https://img.shields.io/badge/简体中文-d9d9d9"></a>
  <a href="./README_JA.md"><img alt="日本語のREADME" src="https://img.shields.io/badge/日本語-d9d9d9"></a>
</p>

## 简介

Batch Job是一套全部开源的任务管理执行工具，毫无保留给个人及企业使用。
* 支持定时Job和关联Job（A Job完成后执行B Job）。
* 支持Helm安装、 Yamler 的安装。
* 采用前后端分离的模式，微服务版本前端(基于 [Antd5.0](https://ant.design/index-cn))。
* 后端采用C# Aspnet、EntityFrameworkCore。

## 系统模块

~~~
batch-job-backend  
├── batch-job-frontend  
└── batch-job-backend  
    ├── Web                     // 接口模块
    │       └── Endpoint                                  // 系统接口
    ├── Infrastructure          // 通用模块
    │       └── Data                                      // 数据库表 表管理模块 
    │       └── IDentity                                  // 认证模块
    ├── Application             // 业务模块
    │       └── BatchJobs                                 // job业务模块 
    │       └── Common                                    // 公共类 方法
    │       └── TodoItems                                 // 事件业务模块 
    │       └── TodoLists                                 // 事件列表模块 
    ├── Domain                  // 数据对象和Dao模块
    │       └── Common                                    // 公共类 方法
    │       └── Constants                                 // 常量 
    │       └── Entities                                  // 数据库对象
    │       └── Events                                    // 事件对象
    │       └── Exceptions                                // 异常类
    └── init.sql               // 数据库初始文件
~~~

## 内置功能
1.  定时JOB执行：可以按指定的日期时间执行定时JOB。具体按年、按月、按周、按日、按时、按分处理。参考下面图片：
2.  关联JOB执行：可以在定时JOB执行完成后执行相关联的JOB。
<table style="width: 400px">
    <tr>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-1.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-2.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-3.png"/></td>
    </tr>
    <tr>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-4.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-5.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-6.png"/></td>
    </tr>
</table>
## 访问 Batch Job
当访问 Batch Job 首页时，可以使用 Lens 或 Kubernetes 命令。

1. 使用 Lens 访问
   按下转发按钮将自动转发到 URL
<table>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch_lens.png"/></td>
    </tr>
</table>

2. 使用 Kubernetes 命令访问
```shell
kubectl port-forward service/batch-job-batch-job-helm 8080:80 --namespace batch-job
```
然后在浏览器中输入`https://localhost:8081`访问
## 演示图
<table>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-cn_1.png"/></td>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-cn_2.png"/></td>
    </tr>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-cn_3.png"/></td>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-cn_4.png"/></td>
    </tr>
    
</table>
