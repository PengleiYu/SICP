import {accumulate, append, display_list, filter, head, length, list, list_ref, map, math_abs, pair, tail} from "sicp";

// 不正确的flatmap顺序导致八皇后性能问题
(function () {
    function flatmap(f, seq) {
        return accumulate(append, null, map(f, seq));
    }

    function enumerate_interval(low, high) {
        return low > high
            ? null
            : pair(low, enumerate_interval(low + 1, high));
    }

    // 练习2.43 Louis Reasoner做练习2.42时遇到了麻烦，他的queens函数看起来能行，但却运行得极慢（Louis居然无法忍耐到它解出6×6棋盘的问题）。
    // Louis请Eva Lu Ator帮忙时，她指出他在flatmap里交换了嵌套映射的顺序，把它写成了：
    function queens(board_size) {
        // 这里的k表示棋盘尺寸，从1开始
        function queen_cols(k) {
            const empty_board = null;

            function is_safe(k, positions) {
                let col_k_row_no = list_ref(positions, k - 1/*角标从0开始*/);

                function safe(items, col) {
                    if (col === k) return true;
                    const col_diff = k - col;
                    const row_diff = math_abs(col_k_row_no - head(items));
                    return row_diff !== 0 // 不在同一行
                        && col_diff !== row_diff // 不在同一斜线
                        && safe(tail(items), col + 1);
                }

                // 从第一列开始遍历
                return safe(positions, 1);
            }

            function adjoin_position(new_row, k, rest_of_queens) {
                // display_list(list('adjoin_position', new_row, k, rest_of_queens));
                return append(rest_of_queens, list(new_row));
            }

            return k === 0
                ? list(empty_board)
                : filter(positions => is_safe(k, positions),
                    flatmap(
                        new_row =>
                            map(
                                rest_of_queens =>
                                    adjoin_position(new_row, k, rest_of_queens),
                                queen_cols(k - 1),
                            ),
                        enumerate_interval(1, board_size),
                    ),
                );
        }

        return queen_cols(board_size);
    }

    // 请解释，为什么这样交换顺序会使程序运行得非常慢。请估算，用Louis的程序去解决八皇后问题大约需要多少时间，假定练习2.42中的程序需用时间T求解这一谜题。
    // 原版中每一步只调用了一次queen_cols(k-1)，但新版中每一层调用了board_size次queen_cols(k-1)
    // 原版时间复杂度为O(n!)，新版复杂度应为O(n!^2)，所以应为耗时应为T*n!，实际上因为剪枝的存在，耗时要比这个低

    (function () {
        display_list(queens(4));
        display_list(queens(6));

        const expects = [1, 0, 0, 2, 10, 4, 40, 92,];
        for (let i = 0; i < expects.length; i++) {
            display_list(`queens(${i + 1}) expect_len=${expects[i]} result_len=`)
            let start = Date.now();
            display_list(length(queens(i + 1)));
            console.log(`cost ${Date.now() - start}`);
        }
    })();

})()
