from django.db import models
import chess


# Create your models here.
class Game(models.Model):
    board = models.CharField(max_length=200, default=chess.Board().fen())


class Move(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    move_text = models.CharField(max_length=10)
