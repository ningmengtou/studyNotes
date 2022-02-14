##### git常用命令

```
设置用户签名
git config --global user.name 用户名 设置用户签名

设置用户签名
git config --global user.email 邮箱

初始化本地库
git init

查看本地库状态
git status

添加到暂存区
git add 文件名
git add .    (一次性添加多个修改文件)

提交到本地库
git commit -m "提交信息" 文件名
git commit -m "提交信息" .  (一次性提交多个添加文件)

查看历史记录
git reflog  / git log

版本穿梭
git reset --hard 版本号
```

##### 分支的操作

```
查看分支
git branch -v

创建分支
git branch 分支名称

切换到某分支
git checkout 分支名称

把指定的分支合并到当前分支上（需要明确当前是哪一个分支）比如master分支
git merge 分支名 (比如 hot-fix 分支)

在进行合并操作后  提交文件提交不需要写文件名
git commit -m "merge"

注意：合并分支只会修改合并的分支文件  被合并的文件不会被修改(master修改,hot-fix不修改)
```

##### 远程库操作

```
查看别名
git remote -v

创建别名
git remote add 别名(建议和库的名字一样) 库的地址

本地代码推送到远程库
git push 别名(远程库地址) 分支

拉取远程库到本地库
git pull 别名(远程库地址) 分支

克隆git上的项目 克隆会自动初始化git仓库，拉取代码，创建别名(origin)
git clone 地址
```

