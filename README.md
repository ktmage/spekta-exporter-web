# @ktmage/spekta-exporter-web

Spekta Web Exporter plugin. Generates static HTML documentation sites from IR.

Spekta の Web Exporter プラグイン。IR から静的 HTML 仕様書サイトを生成する。

## Table of Contents / 目次

- [English](#english)
- [日本語](#japanese)

<a id="english"></a>
## English

> [!CAUTION]
> **Disclaimer:**
> This project is experimental. It is provided "as-is" without warranty of any kind. APIs and output format may change without notice. Use at your own risk.

### Features

- **HTML generation** — Outputs each IR page as `/{pageType}/{pageTitle}/index.html`. Generates a root redirect and `404.html`. Images are copied to `images/`.
- **Dev server** — File watching + auto-rebuild + live reload with debounce.
- **basePath support** — Automatically adjusts all links and asset paths for subdirectory deployment.
- **Inline markup** — Converts backtick code and `**bold**` in text nodes.

### Installation

> npm package is not yet published. Currently available as a submodule of the [Spekta monorepo](https://github.com/ktmage/spekta).

After npm publication:

```sh
npm install @ktmage/spekta-exporter-web
```

### Configuration

```yaml
exporter:
  "@ktmage/spekta-exporter-web":
    name: "My Site"
    description: "Site description"
    basePath: "/docs/"       # Base path for subdirectory deployment (default: "/")
    port: 4321               # Dev server port (default: 4321)
    debounce: 500            # File change debounce ms (default: 500)
    auto_complete: false     # Run build instead of render on change (unstable)
```

### basePath

Set `basePath` to prefix all links and asset references in the generated HTML. Use this when deploying to a subdirectory (e.g. GitHub Pages project sites).

### Commands

```sh
spekta web:dev
```

Starts a dev server, watches files in `target_dir`, and auto-rebuilds with live reload.

### URL Structure

```
/{pageType}/{pageTitle}/
/{pageType}/{pageTitle}/#anchor
```

### Supported Nodes

| Node | Description |
|------|-------------|
| `section` | Section heading + children |
| `summary` | Summary text |
| `why` | Reason / background |
| `see` | Reference link |
| `steps` / `step` | Ordered step list |
| `image` | Image |
| `graph` | Mermaid diagram (rendered via CDN) |
| `text` | Text block |
| `code` | Code block |
| `callout` | Callout (note / warning / tip) |
| `list` / `item` | Unordered list |

### License

[MIT](LICENSE)

---

<a id="japanese"></a>
## 日本語

> [!CAUTION]
> **免責事項：**
> 本プロジェクトは実験的な取り組みです。いかなる保証もなく「現状のまま」提供されます。API や出力形式は予告なく変更される可能性があります。ご利用は自己責任でお願いいたします。

### 機能

- **HTML 生成** — IR の各ページを `/{pageType}/{pageTitle}/index.html` として出力。ルートには先頭ページへのリダイレクト、`404.html` はルートへのリダイレクトを生成。画像は `images/` にコピーされる。
- **dev サーバー** — ファイル監視 + 自動リビルド + ライブリロード。変更検知はデバウンス付き。
- **basePath 対応** — サブディレクトリへのデプロイ時にすべてのリンク・アセットパスを自動調整。
- **インラインマークアップ** — テキストノード内のバッククォートによるインラインコードと `**太字**` を変換。

### インストール

> npm パッケージは未公開です。現在は [Spekta モノレポ](https://github.com/ktmage/spekta) のサブモジュールとして利用できます。

npm 公開後は以下でインストールできるようになる予定です。

```sh
npm install @ktmage/spekta-exporter-web
```

### 設定例

```yaml
exporter:
  "@ktmage/spekta-exporter-web":
    name: "My Site"
    description: "サイトの説明"
    basePath: "/docs/"       # サブディレクトリデプロイ時のベースパス（デフォルト: "/"）
    port: 4321               # dev サーバーのポート（デフォルト: 4321）
    debounce: 500            # ファイル変更検知のデバウンス ms（デフォルト: 500）
    auto_complete: false     # true にすると変更時に render ではなく build を実行（unstable）
```

### basePath

`basePath` を設定すると、生成される HTML 内のすべてのリンクとアセット参照にプレフィックスが付与される。GitHub Pages のプロジェクトサイトなど、サブディレクトリにデプロイする場合に使用する。

### コマンド

```sh
spekta web:dev
```

dev サーバーを起動し、`target_dir` のファイル変更を監視して自動リビルド・ライブリロードを行う。

### URL 構造

```
/{pageType}/{pageTitle}/
/{pageType}/{pageTitle}/#anchor
```

### 対応ノード一覧

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

### ライセンス

[MIT](LICENSE)
