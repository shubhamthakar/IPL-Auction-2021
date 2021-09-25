from django.shortcuts import render,redirect
import json
from django .http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from .models import *

# Create your views here.

def opening(request):
    return render(request, 'opening.html')

def index(request):
    return render(request, 'mainpage.html')

def signin(request):
	if request.method=="POST":
		room=request.POST.get('room')
		password=request.POST.get('password')
		team=request.POST.get('team')
		username = str(room)+str(team)
		rd = '/dashboard/'+str(room)+str(team)
		user=authenticate(username=username,password=password)
		if user is not None:
			login(request,user)
			return redirect(rd)
		else:
			messages.error(request,"Wrong credentials,Please try again !")
			return redirect('/login/')
	else:
		return render(request, 'login.html')

def dashboard(request):
	user = request.user.username
	rd = '/dashboard/'+str(user)
	return redirect(rd)

def calc(request):
	players = list(Player.objects.values())
	json_players = json.dumps(players)
	return render(request, 'teamSelect.html', {'json_players' : json_players})

def signout(request):
	logout(request)
	messages.success(request,'Successfully logged out')
	return redirect("/")

def team(request,code):
	cod = str(code)
	room_n = cod[:3]
	team = cod[3:]
	room = Room.objects.get(room_id=room_n)
	team_model = Team.objects.get(room=room,team_name=team) 
	all_players = SoldPlayer.objects.all()
	sold_players=[]
	bat = 0
	allr = 0
	bow = 0
	wk = 0
	for sp in all_players:
		if sp.room==room and sp.buying_team==team:
			sold_players.append(sp)
			player_type = sp.getType()
			if player_type == 'BAT':
				bat+=1
			elif player_type == 'BOW':
				bow+=1
			elif player_type == 'ALL':
				allr+=1
			
			if sp.isWk():
				wk+=1

			
	username = request.user.username
	print(username)
	sold_players.sort(key = lambda x: x.getType())
	flag = 0
	if username==code or username=='admin':
		flag = 1
	cheems_list = list(Team.objects.filter(room=room))
	cheems = dict()
	for cheem in cheems_list:
		cheems[str(cheem.user)]=cheem.cheem_player
	# print()
	# print(cheems)
	
	param = {'sold':sold_players,'room':room_n,'team':team_model, 'flag':flag, 'code':code, 'cheems':cheems,'bat':bat,'bow':bow,'all':allr,'wk':wk}
	return render(request, 'dashboard.html',param)

def waitingpg(request):
	print(request.user.is_authenticated)
	if request.user.is_authenticated:
		print("Authenicated")
		username = request.user.username
		cod = str(username)
		room_n = cod[:3]
		room = Room.objects.get(room_id=room_n)
		teams = list(Team.objects.filter(room=room).values())
		print(teams)
		count = 0
		for i in teams:
			print(i)
			
			if i['score'] == 0:
				count += 1
		print(count)
		if count == 0:
			print('cheemrboard')
			return redirect('cheemrboard')
	print("Waiting Page")
	return render(request, 'waitingpg.html')


def calcLogin(request,code):
	if request.method == 'POST':
		score = request.POST.get("score")
		username = request.user.username
		team_name = username[3:]
		room1 = username[:3]
		room = Room.objects.get(room_id = room1)
		team = Team.objects.get(team_name=team_name,room = room)
		if team.score != 0:
			#send msg
			messages.info(request, 'You can only submit once')
			return redirect('calcLogin', code=code)
		else:
			
			team.score = score
			team.save()
			return redirect('waitingpg')

	st = str(code)
	username = request.user.username
	if username != 'admin':
		if code!=username:
			#redirect to Access Denied Page
			return redirect(index)
	room_name = st[:3]
	team_name = st[3:]
	room = Room.objects.get(room_id=room_name)
	sold_players = SoldPlayer.objects.filter(room=room, buying_team=team_name)
	print(sold_players)
	
	players = [i.player for i in sold_players]
	players = [i.to_dict() for i in players]
	players.sort(key = lambda x: x['type'])
	print(players)
	json_players = json.dumps(players)
	

	return render(request, 'calcLogin.html', {'json_players' : json_players, 'code':code})

# def handler404(request, *args, **argv):
#     response = render_to_response('404.html', {},
#                                   context_instance=RequestContext(request))
#     response.status_code = 404
#     return response


def cheemrboard(request):
	user = request.user.username
	room_name = str(user)[:3]
	room = Room.objects.get(room_id=room_name) 
	team_list = list(Team.objects.filter(room=room))
	team = []
	color = {'MI':'#004ba0,#d1ab3e','RCB':'#ec1c24, #2b2a29','RR':'#e73895, #004ba0','SRH':'#FF822A, #000000','PK':'#ed1b24, #dcdddf','CSK':'#ffff3c,#0081e9','KKR':'#2e0854,#b3a123','DC':'#EF1B23,#00008B'}
	for t in team_list:
		team.append([t.score,t.team_name,color[t.team_name]])
	# if len(team) != 8:
	# 	return redirect('/waitingpg/')
	team.sort(reverse=True)
	print(team)
	return render(request, 'cheem.html',{'teams':team})	


