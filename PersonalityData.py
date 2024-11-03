import pandas as pd

class Personality:
    def __init__(self, personality_type:str, name:str, description:str):
        self.personality_type = personality_type
        self.name = name
        self.description = description

    def __str__(self):
        return f'{self.personality_type} - {self.name} : {self.description}'

datasheet = pd.read_csv('NSTI-Personality-Datasheet.csv', index_col=0)
personality_list = []

for index, personality in datasheet.iterrows():
    personality_list.append(
        Personality(
            personality['Personality'],
            personality['Name'],
            personality['Description']
        )
    )