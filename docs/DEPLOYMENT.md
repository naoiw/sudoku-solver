# デプロイ手順（DEPLOYMENT）

## 配信先

- **GitHub Project Pages**: [https://naoiw.github.io/sudoku-solver](https://naoiw.github.io/sudoku-solver)
- リポジトリ名が URL のパスになるため、Vite の **base** 設定が必須です。

## Vite の base 設定

GitHub Pages では `https://naoiw.github.io/sudoku-solver/` のようにサブパスで配信されるため、`vite.config.ts`（または `vite.config.js`）で次を指定します。

```ts
export default defineConfig({
  base: '/sudoku-solver/',
  // ... その他の設定
});
```

これを設定しないと、ビルド後の JS/CSS のパスがルート相対になり、Pages 上で 404 になります。

## GitHub Actions での自動デプロイ

- **トリガー**: 対象ブランチ（例: `main`）への push 時に実行
- **ジョブの流れ**:
  1. Node 20 で実行環境をセットアップ
  2. pnpm をセットアップし、`pnpm install --frozen-lockfile` で依存関係をインストール
  3. `pnpm build` でビルド（出力は `dist/`）
  4. ビルド成果物を GitHub Pages 用にアップロード・デプロイ（`actions/upload-pages-artifact` と `actions/deploy-pages` を利用）

GitHub の Settings → Pages で、**Source** を「GitHub Actions」にしておくと、上記ワークフローでデプロイされた内容が `https://naoiw.github.io/sudoku-solver` に反映されます。公開元ブランチは「GitHub Actions」を選んだ場合は不要で、Actions の成果物がそのまま配信されます。

## 初回目標: 「Hello World!!」の表示

まずは次の状態を目指します。

1. Vite + React + TypeScript でプロジェクトを初期化し、画面に「Hello World!!」とだけ表示する
2. `vite.config` に `base: '/sudoku-solver/'` を設定する
3. 上記の GitHub Actions ワークフローを用意し、`main` に push するとビルド〜デプロイが走るようにする
4. デプロイ後、`https://naoiw.github.io/sudoku-solver` にアクセスすると「Hello World!!」が表示されることを確認する

ここまでできれば、以降は [SPEC.md](SPEC.md) に沿って盤面 UI と solver を実装していけます。デプロイ手順は変わらず、push のたびに自動で最新版が反映されます。
