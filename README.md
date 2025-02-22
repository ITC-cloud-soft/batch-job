<p align="center">

[//]: # (	<img alt="logo" src="https://oscimg.oschina.net/oscnet/up-b99b286755aef70355a7084753f89cdb7c9.png">)
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">Batch Job</h1>
<h4 align="center">Task management and execution tool based on React/Antd UI, Quartz, and C#/Aspnet with front-end and back-end separation</h4>
<p align="center">
	<a href="https://gitee.com/y_project/RuoYi-Cloud/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"></a>
</p>
<p align="center">
  <a href="./README.md"><img alt="README in English" src="https://img.shields.io/badge/English-d9d9d9"></a>
  <a href="./README_CN.md"><img alt="简体中文版自述文件" src="https://img.shields.io/badge/简体中文-d9d9d9"></a>
  <a href="./README_JA.md"><img alt="日本語のREADME" src="https://img.shields.io/badge/日本語-d9d9d9"></a>
</p>

## Introduction

Batch Job is a fully open-source task management and execution tool, freely available for personal and corporate use.
* Supports scheduled jobs and linked jobs (Job A completes, then Job B executes).
* Supports Helm installation and Yamler installation.
* Adopts a front-end and back-end separation model, with the microservice version front-end based on [Antd 5.0](https://ant.design/index-cn).
* The back-end uses C# ASP.NET and EntityFrameworkCore.

## System Modules

~~~
batch-job-backend  
├── batch-job-frontend  
└── batch-job-backend  
    ├── Web                     // Interface module
    │       └── Endpoint                                  // System interface
    ├── Infrastructure          // General module
    │       └── Data                                      // Database table management module 
    │       └── Identity                                  // Authentication module
    ├── Application             // Business module
    │       └── BatchJobs                                 // Job business module 
    │       └── Common                                    // Common classes and methods
    │       └── TodoItems                                 // Event business module 
    │       └── TodoLists                                 // Event list module 
    ├── Domain                  // Data objects and Dao module
    │       └── Common                                    // Common classes and methods
    │       └── Constants                                 // Constants 
    │       └── Entities                                  // Database objects
    │       └── Events                                    // Event objects
    │       └── Exceptions                                // Exception classes
    └── init.sql               // Initial database file
~~~

## Built-in Features
1. Scheduled Job Execution: Can execute scheduled jobs at specified date and time, supporting scheduling by year, month, week, day, hour, and minute.
2. Linked Job Execution: Allows execution of linked jobs after the scheduled job is completed.

<table style="width: 400px">
    <tr>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-e-1.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-e-2.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-e-3.png"/></td>
    </tr>
    <tr>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-e-4.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-e-5.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-e-6.png"/></td>
    </tr>
</table>


## Installation

You can easily install Batch-Job via Helm Charts. Follow these steps:

1. Add the Batch-Job Helm repository:
```bash
helm repo add Batch-Job https://itc-cloud-soft.github.io/batch-job-helm/
```
4. Update Helm repositories:
```bash
helm repo update
```
4. Install Batch-Job using Helm:
```bash
lm install my-batch-job batch-job/batch-job-chart
```
4. Check installation status:
```bash
helm status my-batch-job
```

## Access Batch Job Page
When access  Batch Job homepage could use Lens or Kubernetes command to proxy the url.
1. Use Lens to access
   Press forward button will automatically forward to browser
<table>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch_lens.png"/></td>
    </tr>
</table>

2. Use kubernetes command to access
```shell
kubectl port-forward service/batch-job-batch-job-helm 8080:80 --namespace batch-job
```
then access `https://localhost:8080` in browser
### License

Batch Job is licensed under the MIT License.
## Demo Images
<table>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-en_1.png"/></td>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-en_2.png"/></td>
    </tr>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-en_3.png"/></td>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-en_4.png"/></td>
    </tr>
</table>
