from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import os
# Create your views here.

def home_page(request):
    return render(request,'index.html')

def upload_file(request):
    if(request.method == 'POST' and request.FILES['file']):
        uploaded_file = request.FILES['file']
        file_path = os.path.join(settings.MEDIA_ROOT,'uploads', uploaded_file.name)
        with open(file_path,'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)
    return HttpResponse('upload_files')            