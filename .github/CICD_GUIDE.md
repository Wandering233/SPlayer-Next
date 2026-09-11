# GitHub Actions CI/CD 使用指南

## 📋 Workflow 文件说明

本项目包含两个 GitHub Actions Workflow:

| 文件 | 触发条件 | 功能 |
|------|----------|------|
| `android-build.yml` | Push/PR/手动 | 构建 Debug/Release APK 和 AAB |
| `android-test.yml` | Push/PR/手动 | 运行 Lint、单元测试、E2E 测试 |

## 🚀 自动触发场景

### 1. Push 到分支

```yaml
# 触发 android/** 或 src/android/** 的变更
git push origin android-feature-branch
```

**执行内容**:
- ✅ 安装依赖
- ✅ 构建前端
- ✅ Sync Capacitor
- ✅ 运行 Lint
- ✅ 运行单元测试
- ✅ 构建 Debug APK
- ✅ 分析 APK 大小

### 2. Pull Request

```yaml
# 创建 PR 到 main 或 develop
Pull Request: feature/android-audio → develop
```

**执行内容**:
- ✅ 所有测试和 Lint
- ✅ 构建验证
- ❌ 不运行 E2E 测试 (节省时间)

### 3. 推送标签 (Release)

```bash
git tag -a v1.0.0-android-beta -m "Android Beta"
git push origin v1.0.0-android-beta
```

**执行内容**:
- ✅ 所有测试
- ✅ 构建签名 Release APK (需配置密钥)
- ✅ 构建 AAB (Google Play)
- ✅ 创建 GitHub Release
- ✅ 上传构建产物

## 🎯 手动触发

### 方式一：GitHub UI

1. 访问 `Actions` 标签页
2. 选择 `Android Build` 或 `Android Test & Lint`
3. 点击 `Run workflow`
4. 选择分支和参数
5. 点击确认

### 方式二：GitHub CLI

```bash
# 触发构建
gh workflow run android-build.yml --ref main

# 触发 Release 构建
gh workflow run android-build.yml --ref main -f build_type=release

# 触发测试
gh workflow run android-test.yml --ref develop
```

## 🔐 配置 Secrets

访问: `https://github.com/YOUR_USERNAME/splayer-next/settings/secrets/actions`

### 必需 Secrets (Release 构建)

| Secret | 说明 | 示例 |
|--------|------|------|
| `ANDROID_KEYSTORE_BASE64` | 密钥库 Base64 编码 | `UEsDBBQAAAAI...` |
| `ANDROID_KEYSTORE_PASSWORD` | 密钥库密码 | `MyStorePass123` |
| `ANDROID_KEY_ALIAS` | 密钥别名 | `splayer-next` |
| `ANDROID_KEY_PASSWORD` | 密钥密码 | `MyKeyPass456` |

### 生成密钥库并编码

```bash
# 1. 生成密钥库
keytool -genkey -v -keystore splayer-keystore.jks \
  -alias splayer-next -keyalg RSA -keysize 2048 -validity 10000

# 2. 转换为 Base64
base64 -w 0 splayer-keystore.jks > keystore.base64

# 3. 复制内容到 GitHub Secrets
cat keystore.base64 | pbcopy  # macOS
cat keystore.base64 | xclip -selection clipboard  # Linux
```

## 📊 构建产物

### Debug 构建

| 产物 | 位置 | 保留期 |
|------|------|--------|
| Debug APK | Actions → Artifacts → `splayer-next-debug-apk` | 14 天 |
| Lint 报告 | Actions → Artifacts → `lint-report` | 7 天 |
| 测试报告 | Actions → Artifacts → `test-report` | 7 天 |

### Release 构建

| 产物 | 位置 | 保留期 |
|------|------|--------|
| Release APK | GitHub Release + Artifacts | 永久/30 天 |
| AAB | GitHub Release + Artifacts | 永久/30 天 |
| Lint 报告 | Actions → Artifacts | 7 天 |

## 🔍 查看构建日志

1. 访问 `Actions` 标签页
2. 选择对应的 Workflow 运行
3. 点击具体的 Job (如 `build-android`)
4. 展开步骤查看详细日志

### 常见日志位置

```
✅ Setup Node.js
✅ Install dependencies
✅ Build Frontend
✅ Sync Capacitor
✅ Build Debug APK
📦 Upload Artifact
```

## ⚡ 优化构建速度

### 1. 缓存优化

Workflow 已配置以下缓存:
- ✅ pnpm store 缓存
- ✅ Gradle 依赖缓存 (自动)
- ✅ Android SDK 缓存 (自动)

### 2. 路径过滤

只在相关文件变更时触发:

```yaml
paths:
  - 'src/**'
  - 'android/**'
  - 'capacitor.config.ts'
```

### 3. 并行执行

- `test-android` 和 `ui-e2e-test` 并行运行
- Lint、Test、Build 串行但快速失败

## 🐛 故障排查

### 问题：构建失败

**检查清单**:
1. ✅ 查看具体失败的步骤日志
2. ✅ 本地复现：`pnpm build && pnpm cap sync android`
3. ✅ 检查 `android/build.gradle` 配置
4. ✅ 验证 Java 版本 (需要 JDK 17)

### 问题：签名失败

```
Execution failed for task ':app:packageRelease'.
```

**解决方案**:
1. 检查 Secrets 是否正确配置
2. 验证密钥库 Base64 是否完整
3. 确认密码和别名匹配
4. 本地测试：`./gradlew assembleRelease`

### 问题：超时

```
Error: The operation was canceled because the job exceeded the timeout
```

**解决方案**:
1. 增加 `timeout-minutes` (当前 60 分钟)
2. 优化构建脚本
3. 使用更快的 Runner (付费)

### 问题：空间不足

```
No space left on device
```

**解决方案**:
```yaml
- name: Cleanup disk space
  run: |
    sudo rm -rf /usr/share/dotnet
    sudo rm -rf /opt/ghc
    sudo rm -rf "/usr/local/share/boost"
```

## 📈 监控与分析

### 构建时长趋势

访问: `Actions` → 选择 Workflow → 查看历史运行时间

### APK 大小分析

每次构建会自动输出:
```
=== APK Size Analysis ===
-rw-r--r-- 1 user user 45M Dec 10 12:00 app-debug.apk

=== Largest files in APK ===
lib/x86_64/libexo.so
assets/public/index.html
...
```

### 测试覆盖率

查看 `test-report` artifact 中的 HTML 报告。

## 🔗 集成其他服务

### Discord 通知

```yaml
- name: Discord Notification
  if: always()
  uses: Ilshidur/action-discord@master
  with:
    args: 'SPlayer-Next Android build ${{ job.status }}'
  env:
    DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}
```

### Slack 通知

```yaml
- name: Slack Notification
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "SPlayer-Next Android build completed"
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### 上传到 Firebase App Distribution

```yaml
- name: Upload to Firebase
  uses: wzieba/Firebase-Distribution-Github-Action@v1
  with:
    appId: ${{ secrets.FIREBASE_APP_ID }}
    serviceCredentialsFileContent: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
    groups: testers
    file: android/app/build/outputs/apk/debug/app-debug.apk
```

## 📚 相关文档

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Capacitor CI/CD](https://capacitorjs.com/docs/guides/getting-started/ci-cd)
- [Android Gradle Plugin](https://developer.android.com/studio/build)
- [ExoPlayer 文档](https://exoplayer.dev/)

---

**最后更新**: 2024 年 12 月  
**维护者**: SPlayer-Next Team
