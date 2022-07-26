from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Useraccount)


class FriendListAdmin(admin.ModelAdmin):
    list_filter = ['user']
    list_display = ['user']
    search_fields = ['user']
    readonly_fields = ['user']

    class meta:
        model = FrienList


admin.site.register(FrienList, FriendListAdmin)

class FriendRequestAdmin(admin.ModelAdmin):
    list_filter = ['sender', 'receiver']
    list_display = ['sender', 'receiver']
    search_fields = ['sender__first_name', 'sender__email',
                    'receiver__first_name', 'receiver__email']


admin.site.register(FriendRequest)
admin.site.register(Photos)

admin.site.register(Posts)
admin.site.register(Story)
