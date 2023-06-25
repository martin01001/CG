import chess
from GameEngin.evaluate_board import evaluate_board


def alpha_beta_MinMaxBest(board, l, k, alpha, beta, maximizing_player):
    if l == 0 or board.is_game_over():
        return evaluate_board(board=board)

    moves_rank = []

    for move in board.legal_moves:
        board.push(move)
        rank = evaluate_board(board)
        board.pop()
        moves_rank.append((move, rank))

    if maximizing_player:
        moves_rank.sort(key=lambda x: x[1], reverse=True)
        max_val = float("-inf")
        for move, rank in moves_rank[:k]:
            board.push(move)
            max_val = max(
                max_val, alpha_beta_MinMaxBest(board, l - 1, k, alpha, beta, False)
            )
            board.pop()
            alpha = max(alpha, max_val)
            if alpha >= beta:
                break
        return max_val

    else:
        moves_rank.sort(key=lambda x: x[1], reverse=False)
        min_val = float("inf")
        for move, rank in moves_rank[:k]:
            board.push(move)
            min_val = min(
                min_val, alpha_beta_MinMaxBest(board, l - 1, k, alpha, beta, True)
            )
            board.pop()
            beta = min(beta, min_val)
            if beta <= alpha:
                break
        return min_val
