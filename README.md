# @ktmage/spekta-exporter-web

Spekta の Web Exporter プラグイン。IR から静的 HTML 仕様書サイトを生成する。

## 機能

- **HTML 生成** -- IR の各ページを `/{pageType}/{pageTitle}/index.html` として出力。ルートには先頭ページへのリダイレクト、`404.html` はルートへのリダイレクトを生成。画像は `images/` にコピーされる。
- **dev サーバー** -- ファイル監視 + 自動リビルド + ライブリロード。変更検知はデバウンス付き。
- **basePath 対応** -- サブディレクトリへのデプロイ時にすべてのリンク・アセットパスを自動調整。

## インストール

```sh
npm install @ktmage/spekta-exporter-web
```

## 設定例

`.spekta.yml` の `exporter` セクション:

```yaml
exporter:
  "@ktmage/spekta-exporter-web":
    name: "My Site"
    description: "サイトの説明"
    basePath: "/docs"      # サブディレクトリデプロイ時のベースパス（デフォルト: "/"）
    port: 4321             # dev サーバーのポート（デフォルト: 4321）
    debounce: 500          # ファイル変更検知のデバウンス ms（デフォルト: 500）
    auto_complete: false   # true にすると変更時に render ではなく build（補完含む）を実行（unstable）
```

### basePath

`basePath` を設定すると、生成される HTML 内のすべてのリンクとアセット参照にプレフィックスが付与される。GitHub Pages のプロジェクトサイトなど、サブディレクトリにデプロイする場合に使用する。

## コマンド

```sh
spekta web:dev
```

dev サーバーを起動し、`target_dir` のファイル変更を監視して自動リビルド・ライブリロードを行う。

## URL 構造

```
/{pageType}/{pageTitle}/
/{pageType}/{pageTitle}/#anchor
```

## 対応ノード一覧

| ノード | 説明 |
|--------|------|
| `section` | セクション見出し + 子ノード |
| `summary` | 概要テキスト |
| `why` | 理由・背景の説明 |
| `see` | 参照リンク |
| `steps` / `step` | 手順リスト |
| `image` | 画像 |
| `graph` | Mermaid ダイアグラム（CDN 経由で描画） |
| `text` | テキストブロック |
| `code` | コードブロック |
| `callout` | コールアウト（note / warning / tip） |
| `list` / `item` | リスト |

インラインマークアップとして、バッククォートによるインラインコードと `**` による太字に対応している。

## ライセンス

[MIT](LICENSE)
