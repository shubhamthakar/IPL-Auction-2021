from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model

class CustomUserAdmin(UserAdmin):
    """Define admin model for custom User model with no username field."""
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Team info'), {'fields': ('purse', 'rts','rtm','joker','discount')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2'),
        }),
    )
    list_display = ('username', 'first_name', 'last_name', 'is_staff')
    search_fields = ('username', 'first_name', 'last_name')
    ordering = ('username',)

class PlayerAdmin(admin.ModelAdmin):
    search_fields = ('name', 'team',  )

class SoldPlayerAdmin(admin.ModelAdmin):
    search_fields = ('name', 'team', 'room' )
    list_filter = ( 'buying_team', 'room' )


# Register your models here.

# admin.site.register(Player)
# admin.site.register(SldPlayer)
admin.site.register(Room)
admin.site.register(Team)
# admin.site.register(CustomUser, UserAdmin)
admin.site.register(get_user_model(), CustomUserAdmin)
admin.site.register(Player, PlayerAdmin)
admin.site.register(SoldPlayer, SoldPlayerAdmin)

