function exist(board: string[][], word: string): boolean {
  let directions: number[][] = [
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // left
    [-1, 0], // Up
  ];

  function traverse(
    board: string[][],
    word: string,
    wordIdx: number,
    row: number,
    col: number
  ): boolean {
    // Base Case
    if (wordIdx == word.length) return true;
    // Validation Case
    if (
      row < 0 ||
      row == board.length ||
      col < 0 ||
      col == board[0].length ||
      board[row][col] == "#"
    ) {
      return false;
    }

    // Logic
    if (board[row][col] == word.charAt(wordIdx)) {
      for (let dirIndex = 0; dirIndex < directions.length; dirIndex++) {
        let nextRow: number = row + directions[dirIndex][0];
        let nextCol: number = col + directions[dirIndex][1];
        board[row][col] = "#";
        let result = traverse(board, word, wordIdx + 1, nextRow, nextCol);
        board[row][col] = word.charAt(wordIdx);
        if (result == true) return true;
      }
    }
    return false;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let result = traverse(board, word, 0, i, j);
      if (result == true) return true;
    }
  }

  return false;
}

describe("Word Search", () => {
  it("Happy Path - 01", () => {
    let board = [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"],
      ],
      word = "ABCCED";
    expect(exist(board, word)).toEqual(true);
  });

  it("Happy Path - 01", () => {
    let board = [["A"]],
      word = "A";
    expect(exist(board, word)).toEqual(true);
  });
});
