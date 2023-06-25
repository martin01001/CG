from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
import json
from GameEngin import gameL
from .models import Game, Move
import chess


# Create your views here.
def home(request):
    if request.method == "POST":
        color = request.POST.get("color")
        bot = request.POST.get("bot")
        request.session["color"] = color
        request.session["bot"] = bot
        game = Game()
        board = chess.Board()
        game.board = board.fen()
        game.save()

        return redirect(f"game/{game.pk}")
    return render(request, "home.html")


def game(request, game_id):
    data = {"color": request.session.get("color"), "bot": request.session.get("bot")}
    game = get_object_or_404(Game, pk=game_id)
    if data["color"] == "black" and game.board.split(" ")[1] == "w":
        board = chess.Board(game.board)
        maximizing = True
        L = 2
        if data["bot"] == "minmaxL":
            move = gameL.get_computer_move_with_MinMaxL(board, L, maximizing)
        else:
            move = gameL.get_computer_move_with_MinMaxBest(board, L, maximizing)
        board.push(move)
        game.board = board.fen()
        game.save()
        Move.objects.create(game=game, move_text=move)
    return render(request, "game.html")


def game_init(request, game_id):
    if request.method == "GET":
        game = get_object_or_404(Game, pk=game_id)
        board = chess.Board(game.board)
        game_state = {
            "board": board.fen(),
            "legal_moves": [move.uci() for move in board.legal_moves],
            "user_color": request.session.get("color"),
        }
        return JsonResponse(game_state)
    else:
        game = get_object_or_404(Game, pk=game_id)
        board = chess.Board(game.board)
        user_move_str = json.loads(request.body)
        user_move_uci = gameL.get_human_move(
            board=board, move_str=user_move_str["user_move"]
        )
        if user_move_uci != None:
            board.push(user_move_uci)
            game.board = board.fen()
            game.save()
            Move.objects.create(game=game, move_text=user_move_uci)
            if board.is_game_over():
                game_state = {
                    "game_over": board.is_game_over(),
                    "result": board.result(),
                }
                return JsonResponse(game_state)
            L = 2  # The depth of the alpha-betaMinMaxL algorithm.
            # check the user color.
            if request.session["color"] == "white":
                maximizing = False
            else:
                maximizing = True
            # Get Computer move
            if request.session["bot"] == "minmaxL":
                computer_move = gameL.get_computer_move_with_MinMaxL(
                    board, L, maximizing
                )
            else:
                computer_move = gameL.get_computer_move_with_MinMaxBest(
                    board, L, maximizing
                )
            board.push(computer_move)
            game.board = board.fen()
            game.save()
            Move.objects.create(game=game, move_text=computer_move)
            if board.is_game_over():
                game_state = {
                    "game_over": board.is_game_over(),
                    "result": board.result(),
                }
                return JsonResponse(game_state)
            game_state = {
                "computer_move": computer_move.uci(),
                "legal_moves": [move.uci() for move in board.legal_moves],
            }
            return JsonResponse(game_state)
        return JsonResponse({})
