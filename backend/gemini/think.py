import requests
import json
import hmac
import hashlib
import base64
import time
from gemini.api_key import apiKey
from models import Tag

from google import genai
import PIL.Image

def read_image(image_path): #画像をgeminiに渡し、その出力を返す関数
    image = PIL.Image.open(image_path) #渡された画像パスを開く
    client = genai.Client(api_key=apiKey) #api_key.pyに保存したapiキーを呼び出す

    prompt = "この画像に写っているものを「粉物」であるとこじつけてください．その際，次に示す規則を守って返事をしてください．\
            1. 長くても100文字以内で全ての返答を終えてください\
            2. あなたはコテコテの関西弁を話す大阪人です\
            3. 画像に写ったそれ自体が粉物であることを説明してください\
            4. 「画像のそれってooでんやろ？」から話し始めてください\
            5. 「せやから画像にあるooはxxに間違いないんでっせ」で話し終えてください．\
            6. 4と5の間では論理的におかしくない，もっともらしい説明をしてください\
            7. 必ず食べ物に例えてください\
            "

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt , image]) #プロンプトと画像をgeminiに渡す

    return response.text, tagging_result_text(response.text) #geminiの出力結果とタグ付けされた結果をテキストで返す

def read_text(text): #テキストをgeminiに渡す関数
    client = genai.Client(api_key=apiKey)  # api_key.pyに保存したapiキーを呼び出す

    prompt = "次に示すテキストについて「粉物」であるとこじつけてください。その際、次に示す規則を守って返事をしてください。\
            1. 長くても100文字以内で全ての返答を終えてください\
            2. あなたはコテコテの関西弁を話す大阪人です\
            3. テキスト自体が粉物であることを説明してください\
            4. 「そのテキストってooでんやろ？」から話し始めてください\
            5. 「せやからそのテキストはxxに間違いないんでっせ」で話し終えてください。\
            6. 4と5の間では論理的におかしくない、もっともらしい説明をしてください\
            7. 必ず食べ物に例えてください\
            "

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt, text]) #プロンプトとテキストをgeminiに渡す

    return response.text, tagging_result_text(response.text) #geminiの出力結果とタグ付けされた結果をテキストで返す

def daily_lucky_powder(): #「今日のラッキー粉物」関数
    client = genai.Client(api_key=apiKey)  # api_key.pyに保存したapiキーを呼び出す

    tag_data = Tag.query.all() #全てのタグを取得
    l = ["お好み焼き", "たこ焼き", "ガレット"] #空のリストを作成
    for item in tag_data:
        l.append(item.tag) #lにタグの名前を入れていく

    # タグをカンマ区切りの文字列に変換
    tags_string = ', '.join(l)

    prompt = "「今日のラッキー粉物」をしてください。その際、次に示す規則を守って返事をしてください。\
            1. 100文字以内で全ての返答を終えてください\
            2. あなたは少し胡散臭い占い師です\
            3. 血液型などは、どうでもいいです\
            4. 「今日のラッキー粉物はooです」から話し始めてください\
            5. 論理的におかしくない、もっともらしい説明をしてください\
            6. 渡されたリストの中からテーマとする粉物を1つ選択してください\
            "

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt, tags_string]) #geminiにプロンプトを渡す

    return response.text, judge_daily_lucky_powder(response.text) #geminiの出力結果と、出力に利用したタグの粉物の名前を返す

def judge_daily_lucky_powder(result_text): #「今日のラッキー粉物」関数で使用した粉物を返す
    client = genai.Client(api_key=apiKey)  # api_key.pyに保存したapiキーを呼び出す

    tag_data = Tag.query.all() #全てのタグを取得
    l = ["お好み焼き", "たこ焼き", "ガレット"] #空のリストを作成
    for item in tag_data:
        l.append(item.tag) #lにタグの名前を入れていく

    # タグをカンマ区切りの文字列に変換
    tags_string = ', '.join(l)

    prompt = "次に示すリストの中身について、テキストと一致するものを出力してください。その際、次に示す規則を守って返事をしてください。\
            1. リストの中身から選んで出力してください\
            2. 単語のみを出力してください\
            "

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt, result_text, tags_string]) #geminiにプロンプトを渡す

    return response.text #daily_lucky_powderで使用したタグの粉物を返す

def tagging_result_text(result_text): #geminiの出力結果をもとにタグ付けを行う関数
    client = genai.Client(api_key=apiKey)  # api_key.pyに保存したapiキーを呼び出す

    prompt = "次に示すテキストの「粉物」についてタグ付けをしてください。その際、次に示す規則を守って返事をしてください。\
            1. タグは一つだけつけてください\
            2. タグは粉物の食べ物に関する名前をつけてください\
            3. タグは単語のみを出力してください\
            "

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt, result_text]) #プロンプトとテキストをgeminiに渡す

    return response.text #タグ付けされた結果をテキストで返す

