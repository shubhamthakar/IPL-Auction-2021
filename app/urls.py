from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path('', views.opening, name="opening"),
    path('index/', views.index, name="index"),
    path('login/', views.signin, name="signin"),
    path('logout/', views.signout, name="signout"),
    path('dashboard/', views.dashboard, name="dashboard"),
    path('dashboard/<code>/', views.team, name="team"),
    path('calc/',views.calc, name="calc"),
    path('dashboard/<code>/calc', views.calcLogin, name="calcLogin"),
    path('waitingpg/', views.waitingpg, name="waitingpg"),
    path('cheemrboard/', views.cheemrboard, name="cheemrboard")
]
