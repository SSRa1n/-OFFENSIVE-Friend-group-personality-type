import QuizData as quizdata
import PersonalityData as personalitydata

def copydict(dictionary:dict):
    copied_dict = {}
    for key, value in dictionary.items():
        copied_dict[key] = value
    return copied_dict

def get_quiz():
    return quizdata.quiz_list

def get_personality(answer_list:list):
    answer_list = [int(i) for i in answer_list]
    trait_dict = copydict(quizdata.trait_dict)
    for answer, quiz in zip(answer_list, quizdata.quiz_list):
        trait_dict[quiz.type] += quiz.score(answer)
    return trait_dict

def get_personality_percentage(trait_dict:dict):
    full_trait_dict = quizdata.full_trait_dict
    percentage_dict = {}
    result_dict = {}
    SM_threshold = 0.5
    SM_multiplier = 1 / SM_threshold
    for key, value in trait_dict.items():
        percentage_dict[key] = trait_dict[key] / full_trait_dict[key]
    for key, value in percentage_dict.items():
        if key == 'SM':
            if value > -1 and value < -SM_threshold:
                result_dict[key] = percentage_dict[key]
            elif value >= -SM_threshold and value < 0:
                result_dict[key] = -SM_multiplier * percentage_dict[key]
            elif value >= 0 and value < SM_threshold:
                result_dict[key] = -SM_multiplier * percentage_dict[key]
            else:
                result_dict[key] = percentage_dict[key]
        else:
            if value > 0:
                result_dict[key] = percentage_dict[key]
            else:
                result_dict[key] = percentage_dict[key]
    return result_dict

def get_personality_detail(personality_input:str):
    for personality in personalitydata.personality_list:
        if personality.personality_type == personality_input:
            return personality
        
def web_get_percentage(answer_list: list):
    answer_list = answer_list.split(',')
    answer_list = [int(answer) for answer in answer_list]
    return get_personality_percentage(get_personality(answer_list))

personality_dict = get_personality([2,-1,-2,1,1,1,-2,-2,-2,1,2,-2,-2,2,1,2,2,2,-2,1,-2,-2,-2,1,-2])
print(personality_dict)
print(get_personality_percentage(personality_dict))
print(get_personality_detail('YMCGZ'))