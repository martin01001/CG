import chess


# Evaluation function
def evaluate_board(board):
    """
    A simple evaluation function that just counts the number of pieces
    on the board and returns the difference between the two players.
    """

    # Count the material balance
    piece_values = {
        chess.PAWN: 1,
        chess.KNIGHT: 3,
        chess.BISHOP: 3,
        chess.ROOK: 5,
        chess.QUEEN: 9,
        chess.KING: 0,
    }
    score = 0
    for square, piece in board.piece_map().items():
        value = piece_values[piece.piece_type]
        if piece.color == chess.WHITE:
            score += value
        else:
            score -= value

    # Add bonuses/penalties based on piece positions
    for square, piece in board.piece_map().items():
        if piece.color == chess.WHITE:
            if piece.piece_type == chess.PAWN:
                score += 10 + (7 - chess.square_distance(square, chess.E2))
            elif piece.piece_type == chess.KNIGHT:
                score += 30 + len(board.attacks(square))
            elif piece.piece_type == chess.BISHOP:
                score += 30 + len(board.attacks(square))
            elif piece.piece_type == chess.ROOK:
                score += 50 + len(board.attacks(square))
            elif piece.piece_type == chess.QUEEN:
                score += 90 + len(board.attacks(square))
            elif piece.piece_type == chess.KING:
                score += 900 + len(board.attacks(square))
        else:
            if piece.piece_type == chess.PAWN:
                score -= 10 + (chess.square_distance(square, chess.E7))
            elif piece.piece_type == chess.KNIGHT:
                score -= 30 + len(board.attacks(square))
            elif piece.piece_type == chess.BISHOP:
                score -= 30 + len(board.attacks(square))
            elif piece.piece_type == chess.ROOK:
                score -= 50 + len(board.attacks(square))
            elif piece.piece_type == chess.QUEEN:
                score -= 90 + len(board.attacks(square))
            elif piece.piece_type == chess.KING:
                score -= 900 + len(board.attacks(square))
    return score
