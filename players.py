import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ipl.settings')
import csv
from app.models import Player

with open('IPL.csv', newline='') as file:
    reader = csv.reader(file)
    res = list(map(tuple, reader))
    for row in res:
        if (row[0]!="name"):
            player = Player(name=row[0], team=row[1], type=row[2], is_wk=int(row[3]),is_uncapped=int(row[4]), is_starred=int(row[5]),foreign=int(row[6]), overall=int(row[7]), bat_ppl=int(row[8]), bow_ppl=int(row[9]), bat_mid=int(row[10]), bow_mid=int(row[11]), bat_death=int(row[12]), bow_death=int(row[13]), color1=row[14] ,color2=row[15],image=row[16])
            try:
                player.save()
            except:
                print("There was a problem with ", row[0])