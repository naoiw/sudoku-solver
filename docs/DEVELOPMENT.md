# 開発手順

## 起動

Node.js 20 / pnpm 9 を使用。

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm build
```

## ブランチ運用

- **実装・修正は `develop` で行う**。`main` は本番用とし、通常は直接pushしない。
- `main` に取り込むときは、必ず **base: `main` / compare: `develop`** のプルリクエストを作る。
- PRの自動テスト・ビルドを確認し、問題なければマージする。
- **マージ後も `develop` を削除しない。** マージによって `main` に追加されたコミットを `develop` に取り込み、両ブランチの差分を整理してから開発を再開する。
- `develop` は専用のPagesプレビューに自動デプロイされる。確認に `main` へのマージは不要。

普段の作業例：

```bash
git switch develop
git pull origin develop
# 変更・動作確認
pnpm test
pnpm build
git add .
git commit -m "feat: describe changes"
git push origin develop
# GitHubで develop → main のPRを作成・確認・マージ
```

マージ後の同期例：

```bash
git switch develop
git pull origin develop
git fetch origin
git merge origin/main
git push origin develop
```

## ディレクトリ

- `src/App.tsx` : ページレイアウト、状態に応じた表示
- `src/hooks/useSudoku.ts` : 操作・画面状態の管理
- `src/components/SudokuBoard.tsx` : 盤面、選択とキーボード入力
- `src/components/NumberPad.tsx` : 画面入力パッド
- `src/sudokuSolver.ts` : 副作用のない解答 API、探索時のみコピー上で変更
- `src/sudokuValidation.ts` : 重複判定と表示用の不正マスク
- `src/sudokuUtils.ts` : 行・列・ブロックの検査
- `src/index.css` : スタイルとレスポンシブ対応
- `tests/solver.test.cjs` : ソルバーのNode標準テストランナーによる回帰テスト
- `tests/package.json` : テスト用のコンパイル結果を CommonJS として読み込むための設定
- `tests/dist/` : `pnpm test` による一時コンパイル先（Git管理対象外）

`pnpm test` はソルバーのTypeScriptファイルのみを `tests/dist/` にCommonJSとしてコンパイルして実行します。生成されたJavaScriptや `tsconfig.*.tsbuildinfo` は `.gitignore` で除外します。コードや設定を変更したあとは `pnpm test` と `pnpm build` の両方を実行してください。

## CI

- `.github/workflows/validate-develop.yml`：developへのpushおよびmain/develop宛PRのテストとビルド。PRでは公開しない。
- `.github/workflows/deploy-pages.yml`：mainへのpush、またはdevelopのpush検証成功後に、両ブランチを公開。
- デプロイはmain側のワークフローからのみ実行し、Pagesの環境は`github-pages`に統一する。
- `workflow_run`の起動時は検証済みdevelopのコミットSHAをcheckoutし、両ブランチの成果物を公開前に再テストする。
- 古い検証実行はキャンセルできる一方、Pagesのデプロイ処理は順次実行する。

公開構成と設定については[DEPLOYMENT.md](DEPLOYMENT.md)を参照してください。

## 実装メモ

ReactのUIと解答ロジックは分離し、ソルバーへ渡すグリッドは変更しない。解答は1つのみ返し、一意性判定は行わない。入力重複と解なしは別の状態として扱う。
