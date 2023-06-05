from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

import pickle

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

tokenizer = AutoTokenizer.from_pretrained("facebook/blenderbot-400M-distill")
model = AutoModelForSeq2SeqLM.from_pretrained("facebook/blenderbot-400M-distill")

def chat(message):
    inputs = tokenizer(message, return_tensors="pt")
    result = model.generate(**inputs, max_length=70)
    return tokenizer.decode(result[0])

@app.get("/")
async def root(message: Union[str, None] =""):
    answer = chat(message)
    return {"answer" : answer}
