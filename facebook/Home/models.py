from distutils.command.build_scripts import first_line_re
from django.db import models
from django.conf import settings
from django.utils import timezone
# Create your models here.
GENDER_CHOICES = (
    ("m", "Male"),
    ("f", "Female"),
)


class Useraccount(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=11, blank=True)
    birthdate = models.DateField()
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)
    pic = models.ImageField(upload_to="img", blank=True, null=True)
    pic_cover = models.ImageField(upload_to="img", blank=True, null=True)
    address = models.CharField(max_length=100, null=True)
    location = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class Posts(models.Model):
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    postdate = models.DateField()
    postcontent = models.TextField()

class Photos(models.Model):
    post = models.OneToOneField(Posts, on_delete=models.CASCADE,related_name="photos")
    imagecontent = models.ImageField(upload_to="img", blank=True, null=True)


class Shares(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)


class Postlike(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)


class Comments(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    commentdate = models.DateField()
    commentcontent = models.TextField()


class Commentlikes(models.Model):
    comment = models.ForeignKey(Comments, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)


class Page(models.Model):
    pagename = models.CharField(max_length=20)
    pagecontent = models.TextField()


class Pageslike(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)


class Friends(models.Model):
    user = models.ForeignKey(
        Useraccount, on_delete=models.CASCADE, related_name="useraccount_user")
    friend = models.ForeignKey(
        Useraccount, on_delete=models.CASCADE, related_name="useraccount_friend")


class ChatMessage(models.Model):
    body = models.TextField()
    msg_sender = models.ForeignKey(
        Useraccount, on_delete=models.CASCADE, related_name="msg_sender")
    msg_receiver = models.ForeignKey(
        Useraccount, on_delete=models.CASCADE, related_name="msg_receiver")
    seen = models.BooleanField(default=False)


class FrienList(models.Model):
    user = models.OneToOneField(
        Useraccount, on_delete=models.CASCADE, related_name="user")
    friends = models.ManyToManyField(
        Useraccount, blank=True, related_name="friends")
        

    def __str__(self):
        return self.user.first_name

    def add_friend(self, account):
        if not account in self.friends.all():
            self.friends.add(account)
            self.save()

    def remove_friend(self, account):
        if account in self.friends.all():
            self.friends.remove(account)

    def unfriend(self, removee):
        remover_friends_list = self
        remover_friends_list.remove_friend(removee)
        friends_list = FrienList.objects.get(user=removee)
        friends_list.remove_friend(self.user)

    def is_mutual_friend(self, friend):
        if friend in self.friends.all():
            return True
        else:
            return False


class FriendRequest(models.Model):
    """
        Afriend request consits of two main parts :
            1- Sender
            2- Reciver
    """
    sender = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="sender")
    reciver = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="reciver")
    is_active = models.BooleanField(blank=True, null=False, default=True)
    timesstamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.sender.first_name

    def decline(self):
        self.is_active = False
        self.save()

    def cancel(self):
        self.is_active = False
        self.save()
