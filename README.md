# sudoku-solver

数独の盤面を入力し、Solve ボタンで解を表示する Web アプリです。入力時はリアルタイムで重複チェックを行い、不正なマスは赤表示されます。不正なマスが1つでもある間は Solve ボタンは押せません。

- **デモ**: [https://naoiw.github.io/sudoku-solver](https://naoiw.github.io/sudoku-solver)

## 技術スタック

- 言語: TypeScript
- パッケージマネージャ: pnpm
- ビルドツール: Vite
- フレームワーク: React
- スタイル: Tailwind CSS

## クイックスタート

```bash
git clone https://github.com/naoiw/sudoku-solver.git
cd sudoku-solver
pnpm install
pnpm dev
```

ブラウザで開発サーバにアクセスして動作を確認できます。

## ドキュメント

詳細は `docs/` を参照してください。

- [ページ仕様](docs/SPEC.md)
- [開発手順](docs/DEVELOPMENT.md)
- [デプロイ手順](docs/DEPLOYMENT.md)

## ライセンス

MIT License（[LICENSE](LICENSE)）
