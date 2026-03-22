# @ktmage/spekta-exporter-web

Spekta の IR から静的 HTML サイトを生成する Web エクスポータ。開発用のライブリロード付き dev サーバーも提供する。

## 機能

- **HTML 生成** -- IR の各ページを `/{pageType}/{pageTitle}/index.html` として出力。ルートには先頭ページへのリダイレクト、`404.html` はルートへのリダイレクトを生成。画像は `images/` にコピーされる。
- **dev サーバー** -- ファイル監視 + 自動リビルド + ライブリロード。変更検知はデバウンス付き。

## 設定例

`.spekta.yml` の `exporter` セクション:

```yaml
exporter:
  "@ktmage/spekta-exporter-web":
    name: "My Site"
    description: "サイトの説明"
    port: 4321           # dev サーバーのポート（デフォルト: 4321）
    debounce: 500        # ファイル変更検知のデバウンス ms（デフォルト: 500）
    auto_complete: false  # true にすると変更時に render ではなく build（補完含む）を実行（unstable）
```

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
