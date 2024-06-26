from django.shortcuts import render
from django.http import HttpResponse,Http404
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
import os
import pandas as pd
# Create your views here.

def home_page(request):
    return render(request,'index.html')

def upload_file(request):
    if request.method == 'POST' and request.FILES.get('file'):
        uploaded_file = request.FILES['file']
        file_name = uploaded_file.name
        file_path = os.path.join(settings.MEDIA_ROOT, 'uploads', file_name)
        # Save the uploaded file
        with open(file_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

        # Process the file based on its extension
        try:
            if file_name.endswith('.csv'):
                df = pd.read_csv(file_path)
            elif file_name.endswith('.xls') or file_name.endswith('.xlsx') or file_name.endswith('.xlsm'):
                df = pd.read_excel(file_path)
            else:
                return HttpResponse('Unsupported file format', status=400)

            # Generate the summary
            summary = df.groupby(['Cust State', 'DPD']).size().reset_index(name='Count')
            summary_html = organize_html(summary)
            display_html = summary.to_html()
            # Send the email
            request.session['summary_html'] = display_html
            subject='Summary of Your Excel Sheet'
            from_email= 'panjwanichirag123@gmail.com'
            recipient_list=['tech@themedius.ai','hr@themedius.ai']
            text_content = 'This is summary of the uploaded file'
            html_content = summary_html
            message= EmailMultiAlternatives(subject,text_content,from_email,recipient_list)
            message.attach_alternative(html_content,'text/html')
            message.send()
            # Render the summary
            return render(request, 'summary.html', {'summary': summary_html})
        except Exception as e:
            print(e)
            return HttpResponse(f'Error processing file: {e}', status=500)
    elif request.method == 'GET' and 'summary_html' in request.session :
        summary_html = request.session['summary_html']
        return render(request,'summary.html',{'summary':summary_html})
    else:
        return render(request,'summary.html')

def organize_html(summary):
    summary_html = '''
    <html>
            <head>
                <style>
                    table {{
                        border-collapse: collapse;
                        width: 100%;
                    }}
                    th, td {{
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }}
                    th {{
                        background-color: #f2f2f2;
                    }}
                    p {{
                        font-family: Arial, sans-serif;
                    }}
                </style>
            </head>
            <body>
                <p>Dear User,</p>
                <p>Here is the summary of the uploaded file:</p>
    <table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; width: 100%;'>
    <thead>
    <tr>
    <th>State</th>
    <th>DPD</th>
    <th>Count</th>
    <tr>
    </thead>
    <tbody>
    '''
    for _, row in summary.iterrows():
        summary_html += f'''
        <tr>
        <td>{row['Cust State']}</td>
        <td>{row['DPD']}</td>
        <td>{row['Count']}</td>
        </tr>
        '''
    summary_html += '''
            </tbody></table>
                <p>Best regards,</p>
                <p>EXCEL XTRACTOR</p>
            </body>
            </html>
            '''
    return summary_html