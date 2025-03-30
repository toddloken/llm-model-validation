from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI
from langchain_mistralai import ChatMistralAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.chat_models import ChatOllama  # For Llama locally
from langchain_core.messages import SystemMessage, HumanMessage
import google.generativeai as genai


class LLMMessageInvoker:
    """A generic class to invoke different LLM providers."""

    # Map provider names to their respective LangChain classes
    PROVIDER_MAP = {
        "anthropic": ChatAnthropic,
        "openai": ChatOpenAI,
        "mistral": ChatMistralAI,
        "ollama": ChatOllama,  # For Llama models via Ollama
        "google": ChatGoogleGenerativeAI,  # Added Google's Gemini
    }

    # Default models for each provider
    DEFAULT_MODELS = {
        "anthropic": "claude-3-opus-20240229",
        "openai": "gpt-4",
        "mistral": "mistral-large-latest",
        "ollama": "llama3",  # Assuming Llama3 is available via Ollama
        "google": "gemini-1.5-pro",  # Default to Gemini 1.5 Pro
    }

    def __init__(self, provider="openai", model_name=None, **kwargs):
        """
        Initialize the LLM invoker.

        Args:
            provider (str): The LLM provider to use ("anthropic", "openai", "mistral", "ollama", "google")
            model_name (str, optional): The specific model to use. If None, uses the default for the provider.
            **kwargs: Additional arguments to pass to the LLM constructor.
        """
        if provider not in self.PROVIDER_MAP:
            raise ValueError(f"Unsupported provider: {provider}. Supported providers: {list(self.PROVIDER_MAP.keys())}")

        # Use default model if none specified
        if model_name is None:
            model_name = self.DEFAULT_MODELS[provider]

        # Initialize the appropriate LLM class
        llm_class = self.PROVIDER_MAP[provider]
        if provider == "openai":
            self.llm = llm_class(model=model_name, **kwargs)
        elif provider == "anthropic":
            self.llm = llm_class(model=model_name, **kwargs)
        elif provider == "mistral":
            self.llm = llm_class(model=model_name, **kwargs)
        elif provider == "ollama":
            self.llm = llm_class(model=model_name, **kwargs)
        elif provider == "google":
            self.llm = llm_class(model=model_name, **kwargs)

    def invoke_llm(self, a_system_message, a_human_message, keys=None):
        """
        Sends system and human messages to the LLM and returns its response.

        Args:
            a_system_message (str): The content of the system message.
            a_human_message (str): The content of the human message.
            keys (dict, optional): API keys or other credentials if needed.

        Returns:
            The response from the LLM.
        """
        # Apply API keys if provided
        if keys is not None:
            # You might need to update API keys dynamically
            # Implementation depends on the specific LLM's API
            pass

        messages_to_the_llm = [
            SystemMessage(content=a_system_message),
            HumanMessage(content=a_human_message),
        ]

        invoke_response =self.llm.invoke(messages_to_the_llm)
        return invoke_response.content