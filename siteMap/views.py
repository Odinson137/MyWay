from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.clickjacking import xframe_options_deny
from django.views.decorators.clickjacking import xframe_options_sameorigin
from django.views.generic import ListView, DetailView, CreateView
from django.contrib.auth.views import LoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.contrib.auth import logout, login
from .models import Place, Routes, UsersRoutes, Comments

from .forms import *

import json
from django.core.serializers.json import DjangoJSONEncoder

import requests
from bs4 import BeautifulSoup

from django.db.models.functions import Lower

from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage

filters = {"0": "Достопримечательности Беларуси","1": "Красивые места белорусской природы", "2": "Санатории и парки семейного отдыха", "3": "Места для кемпинга"}


def get_oil():
    url = 'https://azs.belorusneft.by/sitebeloil/ru/center/azs/center/fuelandService/price/?ysclid=lddf4a7zl9574972577'

    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'lxml')
        a = soup.find_all('tr')[3].td.get_text()
        oil = a.get_text()
    except:
        oil = 2.36
    return oil
        
# вызов функции для каждой страницы:
def index(request):
    mas = []
    for i in range(1000000):
        mas.append(i)
    data = {'data': mas}
    return render(request, 'index.html', context=data)

# all_images = []

def main(request):
    places = Place.objects.filter().order_by(Lower('region'))
    
    # for i in places:
        
    #     all_images.append(str(i.image))
    #     all_images.append(str(i.image1))
    #     all_images.append(str(i.image2))
    #     all_images.append(str(i.image3))
    #     all_images.append(str(i.image4))
        
    
    
    # routes = Routes.objects.filter()
    
    # for i in routes:
    #     all_images.append(str(i.image))

    
    regions = ['Брестcкая обл.' , 'Витебскская обл.', 'Гомельская обл.', 'Гродненская обл.', 'Могилевская обл.', 'Минская обл.']
    data = {'places': places, 'regions': regions}
    return render(request, 'main.html', data)

def get_user_info(request):
    title = request.POST.get('title')
    region = request.POST.get('region')
    filter = request.POST.get('filter')
    locale = request.POST.get('locale').split(',')
    description = request.POST.get('description')
    file = request.FILES

    files = [0, 0, 0, 0, 0]
    
    # fs = FileSystemStorage()
    index = 0
    for i in file:
        # fs.save('static/images/'+file[i].name, file[i])
        files[index] = file[i]
        index += 1
    
    opacity = False
    if str(request.user) == 'Luba_Yura':
        opacity = True

    baza = Place(name=title, opacity=opacity, filter=filter, user=request.user, description=description, region=region, coordinates_x=locale[0], coordinates_y=locale[1],
        image=files[0], image1=files[1], image2=files[2], image3=files[3], image4=files[4]
    )
    baza.save()
        
    user_place = [title, filters[filter], description, files[0]]
    baza_context = {'place': [title, locale, description], 'user_place': user_place}
    return baza_context

city = True

def map(request):
    oil = get_oil()
    places = Place.objects.filter(opacity=True).order_by(Lower('id'))
    
    
    data = {'places_map': places, 'oil': oil}

    if request.method == 'POST' and request.FILES:
        if Place.objects.filter(name = (request.POST.get('title'))).exists():
            data.update({'exist': 'exist'})
            return render(request, 'map.html', data)
        else:
            baza_context = get_user_info(request)
            return render(request, 'map.html', context=baza_context)

    elif request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        data_user_itinarery = request.POST.get('data')

        data_user = data_user_itinarery.split(';')
    
        if data_user[1]:
            text = ', '.join(data_user[1:-3])
        else: text = data_user[2]
        
        UsersRoutes.objects.create(
            user=request.user, 
            first_point=data_user[0], 
            routes_points=text, 
            distance=data_user[-3], 
            time=data_user[-2], 
            currency=data_user[-1],
            description='')

    elif request.method == 'POST':
        city = request.POST.get('city')
        route = request.POST.get('route')
        if city:
            data.update({'city': city})
        elif route:
            data.update({'ready_route': route})
    return render(request, 'map.html', data)


@xframe_options_sameorigin
def frame_images(request):
    return render(request, 'frame_images.html')


def get_pod_events(url):
    response = requests.get(url)
    
    soup = BeautifulSoup(response.text, 'lxml')

    ready_text = []
    text = soup.find('div', class_='b-afisha_cinema_description_text').find_all('p')
    for i in text:
        ready_text.append(i.get_text())
    return ready_text


def places(request):
    values = []
    print('gsdfgs')
    new_value = ''
    
    if request.method == 'POST':
        value = request.POST.get('need_value')
        print(value)
        values = value.split(', ')
        new_value = ', '.join(values)
        
    places = Place.objects.filter(opacity=True, filter__in=values)

    regions = {'Брестcкая обл.':2 , 'Витебскская обл.':6, 'Гомельская обл.':5, 'Гродненская обл.':4, 'Могилевская обл.':3, 'Минская обл.':1}
    data = {'places': places, 'regions': regions, 'filters': filters, 'values': new_value}

    return render(request, 'places.html', data)
 
def about(request):
    return render(request, 'about.html')

class RegisterUser(CreateView):
    form_class = RegisterUserForm
    template_name = 'registration.html'
    success_url = reverse_lazy('Account')

    def get_context_data1(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        return dict(list(context.items()))
    
    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('Main')

class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'login.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        return dict(list(context.items()))

    def get_success_url(self):
        return reverse_lazy('Account')

def logout_user(request):
    logout(request)
    return redirect('login')

def delete_images(place, index):
    del_image = 0
    if index == 0:
        del_image = place.image
    elif index == 1:
        del_image = place.image1
    elif index == 2:
        del_image = place.image2
    elif index == 3:
        del_image = place.image3
    elif index == 4:
        del_image = place.image4
    return del_image

def changes_place(request):
    all_file = request.FILES
    
    place = Place.objects.get(id=int(request.POST.get('id')))

    place.name = request.POST.get('input_title')
    place.filter = request.POST.get('filter')
    place.region = request.POST.get('region')
    place.description = request.POST.get('description_user_place')
    delete_photos = request.POST.get('delete_photos')

    list_image = [place.image, place.image1, place.image2, place.image3, place.image4]
    if (delete_photos):
        for i in delete_photos.split(', '):
            list_image[int(i)] = 0
            delete_images(place, int(i)).delete(save=True)

    # fs = FileSystemStorage()
    for i in all_file:
        # fs.save('static/images/'+all_file[i].name, all_file[i])
        index = int(i[-1])
        list_image[index] = all_file[i]
            
    place.image, place.image1, place.image2, place.image3, place.image4 = list_image
    place.save()



def account(request):
    itinerary = {}

    if request.method == 'POST' and request.headers.get('X-Requested-With') != 'XMLHttpRequest':

        if 'delete_routes' in request.POST:
            # place = UsersRoutes.objects.get(id=int(request.POST.get('id_routes')), user=request.user)
            x = UsersRoutes.objects.filter(id=int(request.POST.get('id')), user=request.user)
            if x.exists():
                # place = UsersRoutes.objects.get(id=int(request.POST.get('id')), user=request.user)
                x.delete()

        elif 'delete' in request.POST:
            x = Place.objects.filter(id=int(request.POST.get('id')), user=request.user)
            if x.exists():
                # x = Place.objects.get(id=int(request.POST.get('id')))
                x.delete()
        else:
            changes_place(request)

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            print('aaaaaaaaaaaaaaaaa')
            value = request.POST.get('data')
            if '15&' in value:
                value_name = value.split('&')[1]
                # place = Place.objects.get(name=value_name)
                Place.objects.filter(name=value_name).update(user=str(request.user))
                # place.save(update_fields=["user"])
                # place.save()
                # return JsonResponse({'desc': 'hello'}, safe=False)
                
                # return render(request, 'accaunt.html')
            else:
                val = value.split("%%%")
                desc = UsersRoutes.objects.get(id=int(val[0]))
                desc.description = val[1]
                desc.save()
                return JsonResponse({'desc': 'hello'}, safe=False)
    
    users_routes = UsersRoutes.objects.filter(user=request.user)
    users_places = Place.objects.filter(user=request.user)
    num = 1
    for i in users_routes:
        len_points = i.routes_points.split(', ')
        place = Place.objects.values_list('name', 'image').filter(id__in=len_points)
        itinerary.update({num: {
            'first_point': i.first_point, 
            'routes_points': list(place), 
            'distance': i.distance, 
            'time': i.time,
            'currency': i.currency,
            'description': i.description,
            'len': len(len_points)+1,
            'last_index': list(place)[-1][0],
            'id': i.id
            }})
        num += 1

    return render(request, 'accaunt.html', {'itinerary': itinerary, 'user_places': users_places})

def routes(request):
    routes_ = Routes.objects.filter().order_by(Lower('id'))
    routes = []
    num = 1
    for i in routes_:
        p = []
        for a in i.points.split(' '):
            p.append(int(a))
        places = Place.objects.filter(id__in=p)
        routes.append({'id': num, 'name': i.name, 'points': i.points, 'image': i.image, 'title': i.title, 'description': i.description, 'places': places})
        num += 1
    return render(request, 'routes.html', {'routes': routes})

def place(request, id):
    print(id)
    if request.method == 'POST':
        # x = Comments.objects.filter(id=int(request.POST.get('id')))
        # if x.exists():
        #     pass
        # else:
        comment = request.POST.get('input_text')
        index_places = int(request.POST.get('id_place'))
        if comment and index_places:
            Comments.objects.create(
                user=request.user, 
                comments=comment,
                place_id=index_places)
    place = Place.objects.get(id=id)
    comments = Comments.objects.filter(place_id=id)
    print(request.user)
    
    return render(request, 'place.html', {'data': place, "comments": comments, "user": request.user})