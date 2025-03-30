import json


class QuestionAnswerManager:
    def __init__(self, questions_file='questions.json'):
        """
        Initialize the QuestionAnswerManager with questions from a JSON file.
        """
        with open(questions_file, 'r') as f:
            self.questions = json.load(f)

    def question_answer(self, question_number):
        """
        Retrieve question details based on the question number.
        """
        if str(question_number) not in self.questions:
            return "", "", ""

        # Retrieve the question details
        question = self.questions[str(question_number)]

        # Construct the messages
        qa_system_message = question.get('system_message', '')
        qa_human_message = question.get('human_message', '')
        qa_answer_message = question.get('answer_message', '')

        return qa_system_message, qa_human_message, qa_answer_message

    def message_type(self, debug, question_number, qa_message_type, response=None):
        """
        Processes the question number and type (question or answer).
        """
        mt_system_message, mt_human_message, mt_answer_message = self.question_answer(question_number)

        if qa_message_type == "question":
            class_system_message = mt_system_message
            class_human_message = mt_human_message
        else:
            class_system_message = mt_answer_message
            class_human_message = response

        if debug:
            print("===================================================")
            print("Question Number:" + str(question_number))
            print("System Message : " + class_system_message)
            print("Human Message  : " + class_human_message)
            print("===================================================")
        return class_system_message, class_human_message