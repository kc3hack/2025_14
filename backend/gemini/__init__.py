import requests
import json
import hmac
import hashlib
import base64
import time
from api_key import ApiKey

from google import genai
import PIL.Image

def read_image(image_path): #画像をgeminiに渡す関数
    image = PIL.Image.open(image_path)
    client = genai.Client(api_key=ApiKey()) #api_key.pyに保存したapiキーを呼び出す

    prompt = "この画像に写っているものを「粉物」であるとこじつけてください．その際，次に示す規則を守って返事をしてください．\
            1. 長くても100文字以内で全ての返答を終えてください\
            2. あなたはコテコテの関西弁を話す大阪人です\
            3. 画像に写ったそれ自体が粉物であることを説明してください\
            4. 「画像のそれってooでんやろ？」から話し始めてください\
            5. 「せやから画像にあるooはxxに間違いないんでっせ」で話し終えてください．\
            6. 4と5の間では論理的におかしくない，もっともらしい説明をしてください\
            "

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt , image])

    return response.text

def read_text(text): #テキストをgeminiに渡す関数
    client = genai.Client(api_key=ApiKey())  # api_key.pyに保存したapiキーを呼び出す

    prompt = "次に示すテキストについて「粉物」であるとこじつけてください。その際、次に示す規則を守って返事をしてください。\
              1. 長くても100文字以内で全ての返答を終えてください\
              2. あなたはコテコテの関西弁を話す大阪人です\
              3. テキスト自体が粉物であることを説明してください\
              4. 「そのテキストってooでんやろ？」から話し始めてください\
              5. 「せやからそのテキストはxxに間違いないんでっせ」で話し終えてください。\
              6. 4と5の間では論理的におかしくない、もっともらしい説明をしてください\
              "

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt, text])

    return response.text

def read_text(): #「今日のラッキー粉物」関数
    client = genai.Client(api_key=ApiKey())  # api_key.pyに保存したapiキーを呼び出す

    prompt = "「今日のラッキー粉物」をしてください。その際、次に示す規則を守って返事をしてください。\
              1. 100文字以内で全ての返答を終えてください\
              2. あなたは少し胡散臭い占い師です\
              3. 血液型などは、どうでもいいです\
              4. 「今日のラッキー粉物はooです」から話し始めてください\
              5. 論理的におかしくない、もっともらしい説明をしてください\
              "

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt])

    return response.text
