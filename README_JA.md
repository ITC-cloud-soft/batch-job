<p align="center">

[//]: # (	<img alt="logo" src="https://oscimg.oschina.net/oscnet/up-b99b286755aef70355a7084753f89cdb7c9.png">)
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">バッチジョブ</h1>
<h4 align="center">React/Antd UI、Quartz、およびC#/Aspnetをベースにしたフロントエンドとバックエンドが分離されたタスク管理実行ツール</h4>
<p align="center">
	<a href="https://gitee.com/y_project/RuoYi-Cloud/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"></a>
</p>
<p align="center">
  <a href="./README.md"><img alt="README in English" src="https://img.shields.io/badge/English-d9d9d9"></a>
  <a href="./README_CN.md"><img alt="简体中文版自述文件" src="https://img.shields.io/badge/简体中文-d9d9d9"></a>
  <a href="./README_JA.md"><img alt="日本語のREADME" src="https://img.shields.io/badge/日本語-d9d9d9"></a>
</p>
## 概要

バッチジョブは、個人および企業に対して無償で完全にオープンソース化されたタスク管理実行ツールです。
* 定時ジョブおよび関連ジョブ（ジョブAが完了した後にジョブBを実行）をサポート。
* HelmおよびYamlerによるインストールをサポート。
* フロントエンドとバックエンドを分離したモデルを採用し、マイクロサービス版のフロントエンドは[Antd 5.0](https://ant.design/index-cn)に基づいています。
* バックエンドはC# ASP.NET、EntityFrameworkCoreを使用しています。

## システムモジュール

~~~
batch-job-backend  
├── batch-job-frontend  
└── batch-job-backend  
    ├── Web                     // インターフェースモジュール
    │       └── Endpoint                                  // システムインターフェース
    ├── Infrastructure          // 共通モジュール
    │       └── Data                                      // データベーステーブル管理モジュール
    │       └── Identity                                  // 認証モジュール
    ├── Application             // ビジネスモジュール
    │       └── BatchJobs                                 // ジョブビジネスモジュール
    │       └── Common                                    // 共通クラスおよびメソッド
    │       └── TodoItems                                 // イベントビジネスモジュール
    │       └── TodoLists                                 // イベントリストモジュール
    ├── Domain                  // データオブジェクトおよびDAOモジュール
    │       └── Common                                    // 共通クラスおよびメソッド
    │       └── Constants                                 // 定数
    │       └── Entities                                  // データベースオブジェクト
    │       └── Events                                    // イベントオブジェクト
    │       └── Exceptions                                // 例外クラス
    └── init.sql               // データベース初期化ファイル
~~~

## 内蔵機能
1. 定時ジョブ実行：指定された日時に定時ジョブを実行することができ、年単位、月単位、週単位、日単位、時単位、分単位での処理が可能。
2. 関連ジョブ実行：定時ジョブが完了した後に関連ジョブを実行することができる。
<table style="width: 400px">
    <tr>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-j-1.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-j-2.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-j-3.png"/></td>
    </tr>
    <tr>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-j-4.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-j-5.png"/></td>
         <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-t-j-6.png"/></td>
    </tr>
</table>

## Installation

以下の流れとおりに従って頂ければ、簡単にkubernetesシステムでインストールできます。

1. Batch-Job Helm レポジトリを追加します：
```bash
helm repo add Batch-Job https://itc-cloud-soft.github.io/batch-job-helm/
```
2.	Helm レポジトリを更新します：
```bash
helm repo update
```
3.	Helm を使用して Batch Job をインストールします：
```bash
lm install my-batch-job batch-job/batch-job-chart
```
4.	インストールステータスを確認します：
```bash
helm status my-batch-job
```


## Batch Job ホームページにアクセス
Batch Job ホームページにアクセスする際に、Lens または Kubernetes コマンドを使用して URL をプロキシすることができます。

1. Lens を使用してアクセスする
   転送ボタンを押すと、URL に自動的に転送されま
<table>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch_lens.png"/></td>
    </tr>
</table>

2. Kubernetes コマンドを使用してアクセスする
```shell
kubectl port-forward service/batch-job-batch-job-helm 8080:80 --namespace batch-job
```
その後、ブラウザで https://localhost:8081 にアクセスしま

## デモ画像
<table>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-ja_1.png"/></td>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-ja_2.png"/></td>
    </tr>
    <tr>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-ja_3.png"/></td>
        <td><img src="https://itc-cloud-soft.github.io/doc-open/img/batch-job/batch-job-ja_4.png"/></td>
    </tr>
</table>
