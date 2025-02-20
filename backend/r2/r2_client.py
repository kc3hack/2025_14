import boto3
import r2.r2_secret_access_key as r2_key
from botocore.config import Config

# Cloudflare R2 設定
R2_ENDPOINT_URL = r2_key.r2_endpoint_url
R2_ACCESS_KEY_ID = r2_key.r2_access_key_id
R2_SECRET_ACCESS_KEY = r2_key.r2_secret_access_key
R2_BUCKET_NAME = r2_key.r2_bucket_name

# `s3v4` を明示的に設定
config = Config(signature_version="s3v4")

s3 = boto3.client(
    "s3",
    endpoint_url=R2_ENDPOINT_URL,
    aws_access_key_id=R2_ACCESS_KEY_ID,
    aws_secret_access_key=R2_SECRET_ACCESS_KEY,
    config=config
)