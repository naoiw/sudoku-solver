# デプロイ手順（DEPLOYMENT）

## 配信先

GitHub Project Pagesで、本番と開発版を**1つのPagesサイトに別パスで配信**します。

| ブランチ | URL | 配置先 |
| --- | --- | --- |
| main | https://naoiw.github.io/sudoku-solver/ | サイトのルート |
| develop | https://naoiw.github.io/sudoku-solver/develop/ | /develop/ |

これらは独立したPages環境ではなく、ひとつのアーティファクト内に2つのビルドを格納する方式です。そのため、開発版を更新しても本番の**内容**は常にmainからビルドされます。

## 設定

GitHubの **Settings → Pages → Build and deployment → Source** は **GitHub Actions** に設定します。

`.github/workflows/deploy-pages.yml` は `main` または `develop` へのpush時に実行します。

1. `main` を `production/` に、`develop` を `preview/` にcheckout
2. 両方の依存関係を固定ロックファイルからインストール
3. `main` は既存のViteの `base: '/sudoku-solver/'` でビルド
4. `develop` は `vite build --base=/sudoku-solver/develop/` でビルド（画像・JS・CSS等の参照先を開発版のパスへ変更）
5. ビルド成果物を `publish/` と `publish/develop/` にまとめて、GitHub Pagesへ1度だけデプロイ

## 注意事項

- `develop` のpushはプレビュー公開を更新します。mainのソースコードは変更しませんが、Pagesのデプロイメント自体は更新されます。
- mainへpushした場合もプレビューを含めて再ビルドします。
- **deploy-pages.ymlがmainにもマージされるまでは**、mainの旧ワークフローによる再デプロイで一時的にプレビューが消える可能性があります。その場合、developへの次のpushで再生成されます。
- GitHub ActionsがPages環境へデプロイできるように、リポジトリのPages設定と環境保護ルールを確認してください。
- プルリクエストのテスト・ビルドは別の `.github/workflows/check.yml` が担当します。
