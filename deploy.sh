#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
yarn build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
echo 'iaccounts.jarrett.fun' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Jarrett817/money-lover_vue3.git master:gh-pages
# git push -f git@gitee.com:Jarrett0817/i-accounts.git master
cd -