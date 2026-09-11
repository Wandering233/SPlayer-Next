# SPlayer-Next Android 发布密钥配置指南

## 🔐 生成 Release 密钥库

### 方法一：使用 keytool (推荐)

```bash
# 生成密钥库
keytool -genkey -v -keystore splayer-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias splayer-next \
  -storepass YOUR_STORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD \
  -dname "CN=SPlayer Next, OU=Development, O=YourOrg, L=City, ST=State, C=CN"

# 验证密钥库
keytool -list -v -keystore splayer-keystore.jks -alias splayer-next
```

### 方法二：使用 Android Studio

1. 打开 Android Studio
2. `Build` → `Generate Signed Bundle / APK`
3. 选择 `APK` 或 `Android App Bundle`
4. 点击 `Create new...` 创建新密钥库
5. 填写信息并保存

## 📦 配置 GitHub Secrets

### 1. 将密钥库转换为 Base64

```bash
# Linux/macOS
base64 -w 0 splayer-keystore.jks > splayer-keystore.base64

# Windows (PowerShell)
[Convert]::ToBase64String([IO.File]::ReadAllBytes("splayer-keystore.jks")) | Out-File -Encoding ASCII splayer-keystore.base64
```

### 2. 添加到 GitHub Secrets

访问: `https://github.com/YOUR_USERNAME/splayer-next/settings/secrets/actions`

添加以下 Secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `ANDROID_KEYSTORE_BASE64` | (base64 内容) | 密钥库的 Base64 编码 |
| `ANDROID_KEYSTORE_PASSWORD` | YOUR_STORE_PASSWORD | 密钥库密码 |
| `ANDROID_KEY_ALIAS` | splayer-next | 密钥别名 |
| `ANDROID_KEY_PASSWORD` | YOUR_KEY_PASSWORD | 密钥密码 |

### ⚠️ 安全提示

- **永远不要**将密钥库文件提交到 Git
- **永远不要**将密钥密码明文存储在代码中
- 定期备份密钥库到安全位置
- 丢失密钥库将无法更新已发布的应用

## 🚀 触发 Release 构建

### 方式一：推送标签 (自动)

```bash
# 打标签并推送
git tag -a v1.0.0-android-beta -m "Android Beta Release"
git push origin v1.0.0-android-beta
```

GitHub Actions 将自动:
- 构建签名的 Release APK
- 构建签名的 AAB (用于 Google Play)
- 创建 GitHub Release
- 上传构建产物

### 方式二：手动触发

1. 访问 `Actions` → `Android Build`
2. 点击 `Run workflow`
3. 选择 `release` 构建类型
4. 点击 `Run workflow`

## 📱 构建产物说明

| 文件 | 用途 | 分发渠道 |
|------|------|----------|
| `app-debug.apk` | 调试版本 | 开发测试 |
| `app-release.apk` | 签名发布版 | 直接安装/GitHub Releases |
| `app-release.aab` | Android App Bundle | Google Play Store |

## 🔍 验证构建

```bash
# 验证 APK 签名
apksigner verify --verbose app-release.apk

# 查看 APK 信息
aapt dump badging app-release.apk

# 安装到设备
adb install app-release.apk
```

## 📝 本地测试 Release 构建

```bash
# 设置环境变量
export ANDROID_KEYSTORE_PASSWORD=your_password
export ANDROID_KEY_ALIAS=splayer-next
export ANDROID_KEY_PASSWORD=your_key_password

# 复制密钥库到项目
cp splayer-keystore.jks android/app/

# 构建 Release
cd android
./gradlew assembleRelease

# 验证输出
ls -lh app/build/outputs/apk/release/
```

## 🔧 故障排除

### 问题：签名失败

```
Execution failed for task ':app:packageRelease'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.Workers$ActionProvider
```

**解决方案**:
- 检查密钥库路径是否正确
- 验证密码是否正确
- 确认密钥别名匹配

### 问题：密钥库未找到

```
Keystore file not found: android/app/splayer-keystore.jks
```

**解决方案**:
- 本地构建：确保密钥库文件在正确位置
- CI/CD：检查 GitHub Secrets 是否正确配置

### 问题：Base64 解码失败

```
base64: invalid input
```

**解决方案**:
- 重新生成 Base64，确保没有换行符
- 使用 `base64 -w 0` (Linux) 或 `-wrap 0` (macOS)

## 📚 相关文档

- [Android Keystore 系统](https://developer.android.com/training/articles/keystore)
- [签署应用](https://developer.android.com/studio/publish/app-signing)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
