import os
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())

class APIKeys:
    """This class gets the API keys from the appropriate model - 4 will be used in initial testing. A distilled model could be here easily."""
    def __init__(self):
        self.keys = {
            "openai_api_key": os.getenv("OPENAI_API_KEY"),
            "anthropic_api_key": os.getenv("ANTHROPIC_API_KEY"),
            "google_api_key": os.getenv("GOOGLE_API_KEY"),
            "mistral_api_key": os.getenv("MISTRAL_API_KEY"),
            "todd_key": os.getenv("TODD_KEY"),
        }

    def add_key(self, key_name, env_var_name):
        """
        Adds a new key by fetching its value from an environment variable.

        """
        value = os.getenv(env_var_name)
        if value is None:
            raise KeyError(f"Environment variable '{env_var_name}' not found.")
        self.keys[key_name] = value

    def get_key(self, key_name):
        """
        Retrieves the value of a specific key.

        """
        return self.keys.get(key_name)

    def all_keys(self):
        """
        Returns all loaded keys.

        """
        return self.keys
