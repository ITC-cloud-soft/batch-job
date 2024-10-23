<p align="center">

[//]: # (	<img alt="logo" src="https://oscimg.oschina.net/oscnet/up-b99b286755aef70355a7084753f89cdb7c9.png">)
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">Batch Job</h1>
<h4 align="center">基于 React/Antd UI，Quartz 和 C#/Aspnet 前后端分离的任务管理执行工具</h4>
<p align="center">
	<a href="https://gitee.com/y_project/RuoYi-Cloud/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"></a>
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
1.  定时JOB执行：可以按指定的日期时间执行定时JOB。具体按年、按月、按周、按日、按时、按分处理。
2.  关联JOB执行：可以在定时JOB执行完成后执行相关联的JOB。

## 演示图
<table>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/img.png"/></td>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/img_1.png"/></td>
    </tr>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/img_2.png"/></td>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/img_3.png"/></td>
    </tr>
    
</table>
