import chess
from GameEngin.alpha_betaMinMaxL import alpha_betaMinMaxL
from GameEngin.alpha_beta_MinMaxBest import alpha_beta_MinMaxBest


# Get user move
def get_human_move(board, move_str):
    """
    Returns the move if it is legal, otherwise returns None.
    """
    try:
        move = chess.Move.from_uci(move_str)
        if move in board.legal_moves:
            return move
    except:
        pass
    return None


def get_computer_move_with_MinMaxL(board, L, maximizing_player):
    """
    Uses the alpha-beta min-max algorithm to determine the best move for the computer player.
    """
    alpha = float("-inf")  # initial alpha value
    beta = float("inf")  # initial beta value
    best_score = float("-inf")
    best_move = None
    for move in board.legal_moves:
        board.push(move)
        score = alpha_betaMinMaxL(board, L, alpha, beta, maximizing_player)
        board.pop()
        if score > best_score:
            best_move = move
            best_score = score

    return best_move


def get_computer_move_with_MinMaxBest(board, L, maximizing_player):
    """
    Uses the alpha-beta min-max with top k rank moves algorithm to determine the best move for the computer player.
    """
    alpha = float("-inf")  # initial alpha value
    beta = float("inf")  # initial beta value
    best_score = float("-inf")
    best_move = None
    k = 5
    for move in board.legal_moves:
        board.push(move)
        score = alpha_beta_MinMaxBest(
            board=board,
            l=L,
            alpha=alpha,
            beta=beta,
            k=k,
            maximizing_player=maximizing_player,
        )
        board.pop()
        if score > best_score:
            best_move = move
            best_score = score

    return best_move
