from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import csv

TEAMS = (
    ('RET', 'RET'),
    ('MI', 'MI'),
    ('CSK', 'CSK'),
    ('RCB', 'RCB'),
    ('PK', 'PK'),
    ('RR', 'RR'),
    ('DC', 'DC'),
    ('KKR', 'KKR'),
    ('SRH', 'SRH'),
)

AUC_TEAMS = (
    ('MI', 'MI'),
    ('CSK', 'CSK'),
    ('RCB', 'RCB'),
    ('PK', 'PK'),
    ('RR', 'RR'),
    ('DC', 'DC'),
    ('KKR', 'KKR'),
    ('SRH', 'SRH'),
)


PLAYER_TYPE = (
    ('ALL', 'ALL'),
    ('BAT', 'BAT'),
    ('BOW', 'BOW'),
)
# Create your models here.


class Room(models.Model):
    room_id = models.CharField(max_length=10)
    def __str__(self):
        return self.room_id

class Player(models.Model):
    name = models.CharField(max_length=50)
    team = models.CharField(max_length=5, choices=TEAMS)
    type = models.CharField(max_length=5, choices=PLAYER_TYPE)
    is_wk = models.BooleanField(default=False)
    is_uncapped = models.BooleanField(default=False)
    is_starred = models.BooleanField(default=False)
    foreign = models.BooleanField(default=False)
    overall = models.IntegerField()
    bat_ppl = models.IntegerField()
    bow_ppl = models.IntegerField()
    bat_mid = models.IntegerField()
    bow_mid = models.IntegerField()
    bat_death = models.IntegerField()
    bow_death = models.IntegerField()
    color1 = models.CharField(max_length=50)
    color2 = models.CharField(max_length=50)
    image = models.URLField(max_length=256)

    def __str__(self):
        return self.name
    
    

    def to_dict(self):
        return {'name':self.name, 'team':self.team, 'type':self.type, 'is_wk':self.is_wk, 'is_uncapped':self.is_uncapped, 'is_starred':self.is_starred, 'foreign':self.foreign,'overall':self.overall, 'bat_ppl':self.bat_ppl, 'bow_ppl':self.bow_ppl, 'bat_mid':self.bat_mid, 'bow_mid':self.bow_mid, 'bat_death':self.bat_death, 'bow_death':self.bow_death, 'color1':self.color1, 'color2':self.color2, 'image':self.image}


class SoldPlayer(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    price = models.FloatField(default=0.0)
    buying_team = models.CharField(max_length=5, choices=AUC_TEAMS)
    def __str__(self):
        return self.player.name + ' ' + self.room.room_id
    def save(self, *args, **kwargs):
        room_model = Room.objects.get(room_id=self.room)
        team_model = Team.objects.get(room=room_model,team_name=self.buying_team) 
        team_model.user.purse -= self.price
        team_model.user.save()
        print(team_model.user.purse, self.price)
        super().save(*args, **kwargs)  # Call the "real" save() method. 
    
    def isWk(self):
        return self.player.is_wk

    def getType(self):
        return self.player.type      

class Team(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    team_name = models.CharField(max_length=5, choices=AUC_TEAMS)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None)
    score = models.IntegerField(default=0, null=True)
    cheem_player = models.CharField(default="Cheems", max_length=400) 
    def __str__(self):
        return self.team_name + ' ' + self.room.room_id

class CustomUser(AbstractUser):    
    purse = models.FloatField(default=90.0)
    rts = models.BooleanField(default=False)
    rtm = models.BooleanField(default=True)
    joker = models.BooleanField(default=False)
    discount = models.BooleanField(default=False)






# import csv
# from app.models import Player
# with open('IPL.csv', newline='') as file:
#     reader = csv.reader(file)
#     res = list(map(tuple, reader))
#     for row in res:
#         if (row[0]!="name"):
#             player = Player(name=row[0], team=row[1], type=row[2], is_wk=int(row[3]),is_uncapped=int(row[4]), is_starred=int(row[5]),foreign=int(row[6]), overall=int(row[7]), bat_ppl=int(row[8]), bow_ppl=int(row[9]), bat_mid=int(row[10]), bow_mid=int(row[11]), bat_death=int(row[12]), bow_death=int(row[13]), color1=row[14] ,color2=row[15],image=row[16])
#             try:
#                 player.save()
#             except:
#                 print("There was a problem with ", row[0])

# with open('IPLPasswords.csv', newline='') as file:
#     reader = csv.reader(file)
#     res = list(map(tuple, reader))
#     for row in res:
#         if (row[0]!="Username"):
#             user = CustomUser.objects.create_user(username=row[0], password=row[1])
#             try:
#                 user.save()
#             except:
#                 print("There was a problem with ", row[0])

# with open('IPLTeam.csv', newline='') as file:
#     reader = csv.reader(file)
#     res = list(map(tuple, reader))
#     for row in res:
#         if (row[0]!="room"):
#             room = Room.objects.get(room_id=row[0])
#             user = CustomUser.objects.get(username=row[2])
#             team = Team.objects.create(room=room, team_name=row[1], user = user)
#             try:
#                 team.save()
#             except:
#                 print("There was a problem with ", row[0])
    




