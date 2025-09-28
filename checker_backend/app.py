import nltk
import PyPDF2
from nltk.corpus import stopwords
import re

nltk.download('stopwords')
stopwords = set(stopwords.words('english'))

jd = """Design, build, and deploy AI Agents (e.g., task automation, conversational, decision-making agents) using LLMs and reinforcement learning techniques.
Develop and integrate AI/ML models for NLP, computer vision, recommendation systems, and predictive analytics.
Architect multi-agent workflows that can interact with APIs, CRMs, and enterprise systems.
Fine-tune large language models (LLMs) and optimize prompts for specific business use cases.
Collaborate with product, engineering, and business teams to identify opportunities for AI-powered automation.
Implement pipelines for model training, evaluation, deployment, and monitoring in production.
Continuously research advancements in generative AI, multi-agent systems, and autonomous agents to keep solutions cutting-edge.
Ensure responsible AI practices, data security, and compliance with regulatory frameworks.


Qualifications
Education & Experience

Bachelor’s or Master’s degree in Computer Science, Artificial Intelligence, Data Science, or related field.
Hands-on experience in developing and deploying AI Agents or multi-agent systems.
Proven track record in AI/ML projects from concept to production.


Technical Skills

Strong programming skills in Python and familiarity with AI frameworks (LangChain, LlamaIndex, TensorFlow, PyTorch).
Experience in building LLM-powered agents (e.g., conversational, retrieval-augmented, autonomous workflow agents).
Knowledge of vector databases (Pinecone, Weaviate, FAISS) for context-aware AI systems.
Proficiency in APIs, microservices, and cloud platforms (AWS, Azure, GCP).
Familiarity with MLOps, CI/CD pipelines, and containerization (Docker, Kubernetes).


Soft Skills

Strong analytical thinking and problem-solving mindset.
Ability to translate business requirements into scalable AI solutions.
Excellent communication skills to present complex AI concepts clearly."""

path = "checker_backend\src\Dhananjay gupta AI_ML 1.pdf"
text = ""
with open(path, "rb") as file:
    reader = PyPDF2.PdfReader(file)
    for page in reader.pages:
        text += page.extract_text()

words = re.findall(r'\b\w+\b', text.lower())
filtered_words = [word for word in words if word not in stopwords]
#print(filtered_words)

jd_words = re.findall(r'\b\w+\b', jd.lower())
filtered_jd_words = [word for word in jd_words if word not in stopwords]

filtered_words = set(filtered_words)
filtered_jd_words = set(filtered_jd_words)
common_words = filtered_words.intersection(filtered_jd_words)
score  = (len(common_words)/len(filtered_jd_words))*100 if len(filtered_jd_words) > 0 else 0
print(f"Score: {score:.2f}%")
print(f"Common words: {common_words}")