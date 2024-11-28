import { boolean, number } from "yargs";

function solveNQueens(n: number): string[][] {
  let result: string[][] = [];
  let board: boolean[][] = Array.from({ length: n }, () =>
    Array(n).fill(false)
  );

  function isSafePlacement(
    board: boolean[][],
    row: number,
    col: number
  ): boolean {
    let currentRow = row;
    let currentCol = col;
    while (currentRow >= 0) {
      if (board[currentRow][currentCol] == true) return false;
      currentRow--;
    }

    currentRow = row;
    currentCol = col;
    // Left Diagonal
    while (currentRow >= 0 && currentCol >= 0) {
      if (board[currentRow][currentCol] == true) return false;
      currentRow--;
      currentCol--;
    }

    currentRow = row;
    currentCol = col;
    // Right Diagonal
    while (currentRow >=0 && currentCol < board[0].length) {
      if (board[currentRow][currentCol] == true) return false;
      currentRow--;
      currentCol++;
    }

    return true;
  }

  function backtrack(n: number, row: number) {
    if (row == board.length) {
      // Build the result string
      let intermediateResult: string[] = [];
      for (let i = 0; i < board.length; i++) {
        let path: string = "";
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] == true) {
            path = path + "Q";
          } else {
            path = path + ".";
          }
        }
        intermediateResult.push(path);
      }
      result.push(intermediateResult);
      return;
    }

    for (let j = 0; j < board[row].length; j++) {
      if (isSafePlacement(board, row, j)) {
        board[row][j] = true;
        backtrack(n, row + 1);
        board[row][j] = false;
      }
    }
  }

  backtrack(n, 0);

  return result;
}

describe("N Queens Placement", () => {
  it("Happy Path - 01", () => {
    let candidates = [1, 2, 3];
    expect(solveNQueens(4)).toEqual([
      [".Q..", "...Q", "Q...", "..Q."],
      ["..Q.", "Q...", "...Q", ".Q.."],
    ]);
  });
});
