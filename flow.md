# 1
イメージまたはテキストとjsonを送信
## イメージまたはテキスト
ファイルで送信
## 送信先
http://127.0.0.1:5000/process

# 2
geminiの出力結果をjsonで送信
## 送信先
http://127.0.0.1:3000/????
## json
### image
```json
{
    "user_id" : "",
    "image_name" : "",
    "caption" : "",
    "tag_id" : "",
    "tag" : ""
}
```

### text
```json
{
    "user_id" : "",
    "image_name" : "",
    "caption" : "",
    "tag_id" : "",
    "tag" : ""
}
```

# 3
出力結果を保存する
## 送信先
http://127.0.0.1:5000/collection/save
## json
```json
{
    "user_id" : "",
    "image_name" : "",
    "caption" : "",
    "tag_id" : ""
}
```

# 4
出力結果を保存しない
## 送信先
http://127.0.0.1:5000/collection/delete
## json
```json
{
    "image_name" : "",
}
```

# 5
サインアップ
## 送信先
http://127.0.0.1:5000/register
## json
```json
{
    "user_name" : "",
    "password" : ""
}
```

# 6
サインアップリザルト
## 送信先
http://127.0.0.1:3000/????
## json
```json
{
    "status" : ""
}
```

# 7
ログイン
## 送信先
http://127.0.0.1:5000/login
## json
```json
{
    "user_name" : "",
    "password" : ""
}
```

# 8
ログインリザルト
## 送信先
http://127.0.0.1:3000/????
## json
```json
{
    "status" : ""
}
```

# 9
ログアウト
## 送信先
http://127.0.0.1:5000/logout

# 10
ログアウトリザルト
## 送信先
http://127.0.0.1:3000/????
## json
```json
{
    "status" : ""
}
```

# 11
コレクション
## 送信先
http://127.0.0.1:5000/collection/get
## json
```json
{
    
}
```

# 12
コレクションリザルト
## 送信先
http://127.0.0.1:3000/????
## json
```json
{
    "result" : [
        {
            "user_name": 1,
            "image_name": "",
            "caption": "これは生ものです",
            "tag":
        },
    ]
}
```
