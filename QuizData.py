import pandas as pd

class Question:
    def __init__(self, type:str, indicator:str, weight:int, question:str):
        self.type = type
        self.indicator = indicator
        self.weight = weight
        self.question = question
        self.multiplier = 1 if self.indicator == self.type[0] else -1

    def score(self, point: int):
        return point * self.multiplier * self.weight
    
    def __str__(self):
        return f'{self.type} for {self.indicator} : {self.question}\nwith weight : {self.weight} x {self.multiplier}'
    
datasheet = pd.read_csv('NSTI-Datasheet.csv', index_col=0)

trait_dict = {}
full_trait_dict = {}

quiz_list = []

for index, quiz in datasheet.iterrows():
    trait_dict[quiz['Type']] = 0 if quiz['Type'] not in trait_dict else 0
    if quiz['Type'] not in full_trait_dict:
        full_trait_dict[quiz['Type']] = quiz['Weight'] * 2 
    else:
        full_trait_dict[quiz['Type']] += quiz['Weight'] * 2 
    quiz_list.append(
        Question(
            quiz['Type'],
            quiz['Indicator'],
            quiz['Weight'],
            quiz['Question']
        )
    )
print(trait_dict)
print(full_trait_dict)
# for quiz in quiz_list:
#     print(quiz)