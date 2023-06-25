import chess
from GameEngin.evaluate_board import evaluate_board


# alpha_betaMinMaxL
def alpha_betaMinMaxL(board, l, alpha, beta, maximizing_player):
    """
    The alpha-beta min-max algorithm for determining the best move.
    """
    if l == 0 or board.is_game_over():
        return evaluate_board(board)

    if maximizing_player:
        max_val = float("-inf")
        for move in board.legal_moves:
            board.push(move)
            max_val = max(max_val, alpha_betaMinMaxL(board, l - 1, alpha, beta, False))
            board.pop()
            alpha = max(alpha, max_val)
            if beta <= alpha:
                break
        return max_val

    else:
        min_val = float("inf")
        for move in board.legal_moves:
            board.push(move)
            min_val = min(min_val, alpha_betaMinMaxL(board, l - 1, alpha, beta, True))
            board.pop()
            beta = min(beta, min_val)
            if beta <= alpha:
                break
        return min_val
