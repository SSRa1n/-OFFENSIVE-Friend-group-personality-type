import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from nltk import edit_distance

app = FastAPI()

if __name__ == "__main__" :
    uvicorn.run("api:app", host="127.0.0.1", port=8000, log_level="info")

# ----------------------------
import main
import QuizData
# ----------------------------

# http://127.0.0.1:8000/docs
# uvicorn api:app --reload
# python -m uvicorn api:app --reload

#----------------DON'T TOUCH------------------------#
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)
#----------------DON'T TOUCH------------------------#

@app.get('/getquiz') # get quiz from database
async def get_quiz():
    return main.get_quiz()

@app.get('/getpercentage') # get percentage from answer
async def get_percentage(answer_key: str):
    return main.web_get_percentage(answer_key)

@app.get('/getdetails') # get personality details
async def get_details(personality: str):
    return main.get_personality_detail(personality)