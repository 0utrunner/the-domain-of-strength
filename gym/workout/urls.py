from django.urls import path
from . import views

app_name = 'webpage'

urlpatterns = [
    path('', views.intro, name='register'),
    path('signup', views.sign_up, name='signup'),
    path('login', views.log_in, name='login'),
    path('logout', views.log_out, name='logout'),
    path('arms', views.arms, name='arms'),
    path('back', views.back, name='back'),
    path('chest', views.chest, name='chest'),
    path('core', views.core, name='core'),
    path('legs', views.legs, name='legs'),
    path('warrior', views.warrior, name='warrior'),
    path('workout', views.workout, name='workout'),
    path('record', views.record, name='record'),
    path('workout/<int:workout_id>', views.get_workout, name='get_workout'),
    path('greatest', views.greatest, name='greatest'),
]
