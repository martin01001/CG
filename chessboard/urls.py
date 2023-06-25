from django.urls import path
from chessboard import views
from django.conf.urls.static import static
from chessgame import settings

urlpatterns = [
    path("", views.home, name="home"),
    path("game/<int:game_id>/", views.game, name="game"),
    path("game_init/<int:game_id>/", views.game_init, name="game_init"),
] + static(settings.STATIC_URL, documnet_root=settings.STATICFILES_DIRS)
