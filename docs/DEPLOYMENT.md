# デプロイ手順（DEPLOYMENT）

## 公開URL

GitHub Pagesの同一サイト内で、本番と開発版を別々のパスで公開します。

| ソースブランチ | URL |
| --- | --- |
| main | https://naoiw.github.io/sudoku-solver/ |
| develop | https://naoiw.github.io/sudoku-solver/develop/ |

GitHub Pages自体は1つの環境・デプロイ先です。両ブランチのビルド成果物をまとめた1つのアーティファクトを毎回配信します。

## ブランチとワークフロー

- `develop` にpushすると `.github/workflows/validate-develop.yml` がテストとビルドを実行します。
- 検証が成功すると、デフォルトブランチの `deploy-pages.yml` が `workflow_run` イベントを受け取って実行されます。
- `main` へのpushも同じデプロイワークフローを起動します。
- 両方をcheckoutし、`main` は通常の `/sudoku-solver/`、`develop` は `vite build --base=/sudoku-solver/develop/` でビルドします。
- `main/dist` を公開ルートに、`develop/dist` を公開ルート内の `develop/` にコピーし、まとめて公開します。

**注意:** `github-pages` 環境がmainブランチのみデプロイ可能な場合でも公開できるよう、Pagesにデプロイするジョブは常にmainを実行元とする設計です。develop自身からの直接デプロイは行いません。こうすることでブランチ保護ルールを緩める必要がありません。

## 設定

GitHub Settings → Pages → Build and deployment → Source は `GitHub Actions` に設定します。

`deploy-pages.yml` はデフォルトブランチ（main）にも存在している必要があります。GitHubの `workflow_run` トリガーはデフォルトブランチ上のワークフローにのみ適用されるためです。

PRへの更新時に `check.yml` が別途テスト・ビルドを実行します。

## 注意事項

- developの更新に合わせて最新のmainも再ビルドします。mainのソース自体は変更されません。
- 直接アクセス可能な開発プレビューURLなので、未公開の秘密情報をdevelopのフロントエンドに含めないでください。
- `github-pages` の環境保護設定はmainのまま維持してください。
