import foundational_models_connection as fmc
import foundational_models_invoker as fmv
import foundational_models_qa as qa

class MultiModelQA:
    def __init__(self, debug=True):
        self.debug = debug
        self.unique_questions = 0
        self.total_questions = 0
        self.correct_questions = 0

        # Initialize keys and invokers
        self.keys = fmc.APIKeys()
        self.qa_manager = qa.QuestionAnswerManager()
        self.invokers = {
            "mistral": fmv.LLMMessageInvoker(provider="mistral"),
            "inhouse": fmv.LLMMessageInvoker(provider="inhouse"),
            "openai": fmv.LLMMessageInvoker(provider="openai"),
            "anthropic": fmv.LLMMessageInvoker(provider="anthropic"),
            "google": fmv.LLMMessageInvoker(provider="google")
        }

    def ask_and_score(self, asker_name, answerers, question_number):
        """Asks a question using one model, and has others answer it."""
        asker = self.invokers[asker_name]
        # Ask the question
        system_message, human_message = self.qa_manager.message_type(self.debug, question_number, "question")
        question_response = asker.invoke_llm(system_message, human_message)


        # Evaluate answers
        for answerer_name in answerers:
            answerer = self.invokers[answerer_name]
            system_message, human_message = self.qa_manager.message_type(self.debug, question_number, "answer", question_response)
            answer_response = answerer.invoke_llm(system_message, human_message)
            self.total_questions += 1
            if answer_response:
                self.correct_questions += 1

    def run(self, debug, question_number):
        """Runs all models as askers and evaluates the rest as answerers."""
        self.unique_questions = question_number
        question_number +=1
        for i in range(1, question_number):
            if debug:
                print(i)
            # self.ask_and_score("mistral", ["anthropic", "openai"], i)
            self.ask_and_score("anthropic", ["openai"], i)
            self.ask_and_score("openai", ["anthropic"], i)
            # self.ask_and_score("google", ["mistral", "anthropic", "openai"], question_number)


        print(f"Unique Questions: {self.unique_questions}")
        print(f"Total Questions: {self.total_questions}")
        print(f"Correct Answers: {self.correct_questions}")