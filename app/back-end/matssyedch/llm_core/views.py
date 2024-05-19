# chatbot/views.py
from django.shortcuts import render
from django.http import JsonResponse
from langchain_huggingface import HuggingFaceEndpoint
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import PyPDFLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.chains import RetrievalQA
from langchain.document_loaders import UnstructuredURLLoader
import os

# Set up HuggingFace API token
token = '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'
os.environ["HUGGINGFACEHUB_API_TOKEN"] = token

# Set up the LLM
llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Meta-Llama-3-8B-Instruct",
    task="text-generation",
    max_new_tokens=100,
    do_sample=False,
)

# Set up embeddings
model_name = "mixedbread-ai/mxbai-embed-large-v1"
hf_embeddings = HuggingFaceEmbeddings(model_name=model_name)

# Load documents
loaders = []
# for pdf_file in ['./data/cip-morocco.pdf']:
#     loader = PyPDFLoader(pdf_file)
#     loaders.append(loader)

urls = [
    'https://www.booking.com/searchresults.html?ss=Marrakesh&ssne=Marrakesh&ssne_untouched=Marrakesh&efdco=1&label=gen173nr-1FCAEoggI46AdIM1gEaIwBiAEBmAExuAEHyAEM2AEB6AEB-AECiAIBqAIDuAKd2qSyBsACAdICJDI3MDI3OWFkLTVlNDgtNDgxOC1iMWE3LTdmMzc2OGZjOTY4NtgCBeACAQ&aid=304142&lang=en-us&sb=1&src_elem=sb&src=searchresults&dest_id=-38833&dest_type=city&checkin=2024-05-19&checkout=2024-05-20&group_adults=2&no_rooms=1&group_children=0',
    'https://en.wikipedia.org/wiki/Marrakesh',
    'https://www.moroccoworldnews.com/2023/10/358097/six-moroccan-stadiums-to-host-world-cup-2030-games']
# with open('./data/links.txt', 'r') as file:
#     for line in file:
#         line = line.rstrip('\n')
#         urls.append(line)

url_loader = UnstructuredURLLoader(urls)
loaders.append(url_loader)

data = [doc for loader in loaders for doc in loader.load()]

# Create the index
index = VectorstoreIndexCreator(embedding=hf_embeddings).from_loaders(loaders)
qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=index.vectorstore.as_retriever())

def chatbot_view(request):
    if request.method == 'POST':
        query = request.POST.get('query')
        if query:
            response = qa.run(query)
            return JsonResponse({'response': response})
        return JsonResponse({'error': 'No query provided'}, status=400)
    return render(request, 'llm_core/chatbot.html')
