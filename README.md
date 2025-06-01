<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-TailwindCSS-000000.svg?logo=tailwindcss&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [トラブルシューティング](#トラブルシューティング)

<!-- プロジェクト名を記載 -->

## プロジェクト名

Icon Room

<!-- プロジェクトについて -->

## プロジェクトについて

アイコンの線の太さや色をカスタマイズしてダウンロードできるサイト制作

<!-- プロジェクトの概要を記載 -->

  <p align="left">
    <br />
    <!-- プロジェクト詳細にBacklogのWikiのリンク -->
    <a href="Backlogのwikiリンク"><strong>プロジェクト詳細 »</strong></a>
    <br />
    <br />

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| React                 | 18.2.0     |
| Next.js               | 13.5.1     |
| Tailwind CSS          | 3.3.3      |


<p align="right">(<a href="#top">トップへ</a>)</p>


## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

### コンテナの作成と起動

.env ファイルを以下の環境変数例と[環境変数の一覧](#環境変数の一覧)を元に作成

.env
MICROCMS_API_KEY=root
MICROCMS_SERVICE_DOMAIN=django-db

依存関係のインストール
npm install

起動
npm run dev

### 動作確認

http://localhost:3000 にアクセスできるか確認
アクセスできたら成功

### 環境変数の一覧

| 変数名                  | 役割                                      | デフォルト値                       |
| ----------------------  | ----------------------------------------- | ---------------------------------- |
| MICROCMS_API_KEY        | MicroCMSのAPIキー | apikey                               |
| MICROCMS_SERVICE_DOMAIN | MicroCMSのサービスドメイン名   | servicedomein                          |



## トラブルシューティング

### .env: no such file or directory

.env ファイルがないので環境変数の一覧を参考に作成しましょう


<p align="right">(<a href="#top">トップへ</a>)</p>
