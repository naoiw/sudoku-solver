# GitHub Pages デプロイ

## 公開先

1つの`github-pages`環境から本番と開発版を同時に公開します。

| ソース | URL |
| --- | --- |
| main | https://naoiw.github.io/sudoku-solver/ |
| develop | https://naoiw.github.io/sudoku-solver/develop/ |

## ワークフロー（2ファイル）

1. `.github/workflows/validate-develop.yml` はdevelopへのpush、またはmain/develop宛PRでテストとビルドを実行します。PRの成功だけでは公開しません。
2. developのpush検証が成功すると、main上の`.github/workflows/deploy-pages.yml`が`workflow_run`で起動します。検証が失敗・キャンセルした場合やPRであった場合は公開しません。
3. mainへのpushでは公開ワークフローを直接起動します。手動実行はmainからのみ実行できます。
4. 公開時にmainとdevelopをそれぞれ再検証してビルドします。`workflow_run`時のdevelopは、検証成功したコミットSHAを使用します。
5. mainの成果物を公開ルートに、developを`develop/`にまとめ、**1アーティファクト**としてPagesに公開します。

developのビルドには`vite build --base=/sudoku-solver/develop/`を使い、相対パスを修正します。本番は通常の`pnpm build`です。デプロイは同時実行せず順次処理します。

## 設定と権限

- GitHub Settings → Pages → Build and deployment → Source：GitHub Actions
- GitHub Pages Environment：`github-pages`（1つのみ）
- mainのみを許可する`github-pages`環境保護ルールを維持できます。デプロイはデフォルトブランチmainから実行されるため、develop自身に公開権限は必要ありません。
- ビルドには`contents: read`のみ、デプロイジョブのみに`pages: write`・`id-token: write`を設定しています。
- `workflow_run`のトリガーはデフォルトブランチに配置されたワークフローにのみ反応するため、`deploy-pages.yml`をmainに置いてください。
- `Validate develop`のワークフロー名を変える場合は、`deploy-pages.yml`の`workflow_run.workflows`も更新してください。

## 注意点

- developの検証が成功すればmainにマージせず開発プレビューを更新できます。本番実装はmainの内容を使います。
- 新しいdevelopの検証が失敗した場合、過去の検証済みプレビューは残ります。
- 公開ワークフローが実行中にさらにdevelopが更新された場合、検証を通過したコミットが一時的に表示され、次の成功した公開で更新されます。
- 開発プレビューは誰でもアクセスできます。秘密情報を埋め込まないでください。
