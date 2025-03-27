import foundational_models_run_questions as runner

debug = True
qa_runner = runner.MultiModelQA(debug)
#question number = number of questions
qa_runner.run(debug, question_number=20)
