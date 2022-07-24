from django.shortcuts import render, redirect
from Home.models import *
# Create your views here.
def register_user(request):
    if request.method == 'POST':
        # name_regex = r"^[a-zA-Z ,.'-]+$"
        # email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        # phone_regex = r'^01[0125][0-9]{8}$'
        # if (re.search(name_regex, request.POST['firstname']) == None):
        #     context = {}
        #     context['errorfname'] = 'This First Name Is Not Valid Enter Valid Name'
        #     return render(request, 'index.html', context)
        # if (re.search(name_regex, request.POST['lastname']) == None):
        #     context = {}
        #     context['errorlname'] = 'This Last Name Is Not Valid Enter Valid Name'
        #     return render(request, 'index.html', context)
        # if (re.search(email_regex, request.POST['Email']) == None):
        #     context = {}
        #     context['erroremail'] = 'This Email Is Not Valid Enter Valid Email'
        #     return render(request, 'index.html', context)
        # if (re.search(phone_regex, request.POST['phone']) == None):
        #     context = {}
        #     context[ 'errorphone'] = 'Phone number must be entered in the format: "01[0125][0-9]{8}". Exactly 11 digits allowed.'
        #
        #     return render(request, 'index.html', context)
        if (request.POST['password'] == request.POST['confirm']):
            newuser = Useraccount.objects.create(
                first_name=request.POST['firstname'], last_name=request.POST['lastname'],
                email=request.POST['Email'], password=request.POST['password'],
                phone_number=request.POST['phone'],
                birthdate=request.POST['birthdate'],
                gender=request.POST['inlineRadioOptions']
            )
            newuser.save()
            return redirect('index')
        else:
            context = {}
            context['notequal'] = 'Password And Repeat Password Not Equal'
            return render(request, 'index.html', context)
    else:
        return render(request, 'index.html')

def login(request):
    if request.method == 'POST':
        loguser = Useraccount.objects.filter(
            email=request.POST['Email'], password=request.POST['password'])
        if len(loguser) > 0:
            request.session['user_name'] = loguser[0].first_name + \
                " " + loguser[0].last_name
            request.session['user_id'] = loguser[0].id
            return redirect('/home/Home/')
        else:
            return render(request, 'index.html', {'error': 'Invalid Credientials'})
    else:
        return render(request, 'index.html')

def logout(request):
    if request.session.has_key('user_name'):
        del request.session['user_name']
        del request.session['user_id']
        return redirect('/auth/login/')
    return redirect('/auth/login/')



