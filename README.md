# SUDOKU SOLVER

React と TypeScript で作ったブラウザ数独ソルバーです。9×9の盤面を入力し、重複チェックと解答の自動計算ができます。

## 主な機能

- キーボード・画面上の数字パッドによる数字の入力
- 行・列・3×3ブロックの重複チェックと該当マスの強調表示
- MRVを用いたバックトラッキングによる解答
- 自動入力した数字の色分け、解答部分のみ消去、全消去
- スマートフォンでは盤面直下に数字パッドを配置、PCでは右側の操作パネルを表示

## 公開先

| 環境 | ブランチ | URL |
| --- | --- | --- |
| 本番 | `main` | https://naoiw.github.io/sudoku-solver/ |
| 開発プレビュー | `develop` | https://naoiw.github.io/sudoku-solver/develop/ |

本番とプレビューは、1つの GitHub Pages サイト（`github-pages` 環境）内の別々のパスで公開します。

## 技術スタック

- **TypeScript / React 18** — アプリケーションロジック・画面構成
- **CSS / Vite** — スタイル・開発サーバー・ビルド
- **Node.js 20 / pnpm 9** — 開発・ビルド
- **GitHub Actions / GitHub Pages** — テスト・デプロイ

## ローカル開発

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev    # 開発サーバーを起動
pnpm test   # 自動テスト
pnpm build  # 本番用ファイルを dist/ に生成
```

`pnpm dev` は Vite の開発サーバーを起動し、ファイル変更を画面に反映します。生成物（`dist/`）は Git 管理対象外です。

## ブランチ運用

1. 通常の実装・修正は `develop` で行い、`main` は本番用として維持します。
2. Pull Request ではテストとビルドを実行し、デプロイは行いません。
3. `develop` への push は検証成功後、`main` 側のワークフローから開発プレビューに反映します。
4. 本番反映は **`develop` → `main` の Pull Request** で行います。マージ後も `develop` は削除せず、`main` と同期して使い続けます。

## ディレクトリ構成

- `index.html` — 画面のエントリポイント
- `src/` — Reactコンポーネント、状態管理、解答・検証ロジック
- `tests/` — 自動テスト
- `.github/workflows/` — 検証・GitHub Pages デプロイ設定
- `docs/` — 仕様・開発・デプロイドキュメント

## ドキュメント

- [仕様書](docs/SPEC.md)
- [開発手順](docs/DEVELOPMENT.md)
- [デプロイ構成](docs/DEPLOYMENT.md)

## ライセンス

[MIT License](LICENSE)
