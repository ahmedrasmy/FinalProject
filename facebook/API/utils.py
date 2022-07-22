from Home.models import FriendRequest


def get_friend_request_or_false(sender, receiver):
	try:
		return FriendRequest.objects.get(sender=sender, reciver=receiver, is_active=True)
	except FriendRequest.DoesNotExist:
		return False