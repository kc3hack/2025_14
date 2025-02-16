from pathlib import Path

basedir = Path(__file__).parent
# print(basedir)

# BaseConfigクラスを作成
class BaseConfig:
    SECRET_KEY = "{SECRET_KEY}"

# BaseConfigクラスを継承しLocalConfigクラスを作成
class LocalConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{basedir/'local.sqlite'}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# config辞書にマッピング
config = {
    "local": LocalConfig,
}
