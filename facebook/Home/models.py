from email.policy import default
from tokenize import group
from django.db.models.functions import Now
from datetime import timedelta
from django.db import models

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
    pic = models.ImageField(upload_to="img", default='img/defaultpic.png' , blank=True, null=True)
    pic_cover = models.ImageField(upload_to="img", default='img/defaultpic.png' , blank=True, null=True)
    address = models.CharField(max_length=100, null=True)
    location = models.CharField(max_length=100, null=True)
    Bio = models.CharField(max_length=300, null=True)
    isactive=models.BooleanField(default=False)


class Posts(models.Model):
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    postdate = models.DateTimeField(auto_now_add=True)
    postcontent = models.TextField()
    islike=models.BooleanField(default=False)
    

class Photos(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='post_photos')
    imagecontent = models.ImageField(upload_to="img", blank=True, null=True)

    def __str__(self):
        return (str(self.imagecontent.url))


class Postlike(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    iconId = models.IntegerField()


class Comments(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='post_comments')
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    commentdate = models.DateTimeField(auto_now_add=True)
    commentcontent = models.TextField()


    def __str__(self):
        return (
            str(self.user.first_name + " " + self.user.last_name + " , " + self.user.pic.url + " , " + self.commentcontent))



class Commentlikes(models.Model):
    comment = models.ForeignKey(Comments, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)


class Shares(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    sharedate = models.DateTimeField(auto_now_add=True)


class PostlikeShares(models.Model):
    post = models.ForeignKey(Shares, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    iconId = models.IntegerField()


class CommentsShares(models.Model):
    post = models.ForeignKey(
        Shares, on_delete=models.CASCADE, related_name='post_comments_shares')
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    commentdate = models.DateTimeField(auto_now_add=True)
    commentcontent = models.TextField()

    def __str__(self):
        return (
            str(self.user.first_name + " " + self.user.last_name + " , " + self.user.pic.url + " , " + self.commentcontent))



class Page(models.Model):
    pagename = models.CharField(max_length=20)
    pagecontent = models.TextField()


class Pageslike(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)



class ChatMessage(models.Model):
    body = models.TextField()
    msg_sender = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="msg_sender")
    msg_receiver = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="msg_receiver")
    seen = models.BooleanField(default=False)


class FrienList(models.Model):
    user = models.OneToOneField(Useraccount, on_delete=models.CASCADE, related_name="user")
    friends = models.ManyToManyField(Useraccount, blank=True, related_name="friends")

    def _str_(self):
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
    sender = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="sender")
    reciver = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="reciver")
    is_active = models.BooleanField(blank=True, null=False, default=True)
    timesstamp = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.sender.first_name

    def decline(self):
        self.is_active = False
        self.save()

    def cancel(self):
        self.is_active = False
        self.save()


class Story(models.Model):
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    pic = models.ImageField(upload_to="img", blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    timesstamp = models.DateTimeField(auto_now_add=True)


class Notification(models.Model):
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE , related_name="user_sender")
    body = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)
    user_receiver = models.ForeignKey(Useraccount, on_delete=models.CASCADE , related_name="user_receiver")
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='post_notifications')

###################################### groups #############################
class Groups(models.Model):
    owner=models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    group_name=models.TextField()
    group_pic= models.ImageField(upload_to="img", blank=True, null=True)
    About_group=models.TextField()
    members = models.ManyToManyField(Useraccount, blank=True, related_name="members")


    def _str_(self):
        return self.group_name


    def add_member(self, account):
        if not account in self.members.all():
            self.members.add(account)
            self.save()


    def remove_member(self, account):
        if account in self.members.all():
            self.members.remove(account)


    def is_mutual_member(self, member):
        if member in self.members.all():
            return True
        else:
            return False


class MemberRequest(models.Model):
    sender = models.ForeignKey(
        Useraccount, on_delete=models.CASCADE, related_name="group_sender_req")
    reciver = models.ForeignKey(
        Groups, on_delete=models.CASCADE, related_name="group_sender_req")
    timesstamp = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.sender.first_name

    def decline(self):
        self.is_active = False
        self.save()

    def cancel(self):
        self.is_active = False
        self.save()


class PostsGroups(models.Model):
    group = models.ForeignKey(Groups, on_delete=models.CASCADE,related_name="groupPosts")
    postdate = models.DateTimeField(auto_now_add=True)
    postcontent = models.TextField(blank=True, null=True)
    images = models.ImageField(upload_to="img",blank=True,null=True)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)


class Commentsgroup(models.Model):
    post = models.ForeignKey(
        PostsGroups, on_delete=models.CASCADE, related_name='post_comments_group')
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    commentdate = models.DateTimeField(auto_now_add=True)
    commentcontent = models.TextField()

    def __str__(self):
        return (
            str(self.user.first_name + " " + self.user.last_name + " , " + self.user.pic.url + " , " + self.commentcontent))


class Postlikegroup(models.Model):
    post = models.ForeignKey(PostsGroups, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    iconId = models.IntegerField()


class NotificationInvite(models.Model):
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE,related_name="Invit_user")
    body = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)
    Invit_receiver = models.ForeignKey(Useraccount, on_delete=models.CASCADE,related_name="Invit_reciver")
    group = models.ForeignKey(Groups, on_delete=models.CASCADE)
