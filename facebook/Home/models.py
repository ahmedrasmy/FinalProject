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
    pic = models.ImageField(upload_to="img", blank=True, null=True)
    pic_cover = models.ImageField(upload_to="img", blank=True, null=True)
    address = models.CharField(max_length=100, null=True)
    location = models.CharField(max_length=100, null=True)


class Posts(models.Model):
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)
    postdate = models.DateField()
    postcontent = models.TextField()


class Photos(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
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
    pagename=models.CharField(max_length=20)
    pagecontent = models.TextField()


class Pageslike(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE)


class Friends(models.Model):
    user = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="useraccount_user")
    friend = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="useraccount_friend")


class ChatMessage(models.Model):
    body = models.TextField()
    msg_sender = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="msg_sender")
    msg_receiver = models.ForeignKey(Useraccount, on_delete=models.CASCADE, related_name="msg_receiver")
    seen = models.BooleanField(default=False)
