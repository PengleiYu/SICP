import {accumulate, append, display_list, filter, head, length, list, list_ref, map, math_abs, pair, tail} from "sicp";

// 八皇后问题：复杂列表操作
(function () {
    function flatmap(f, seq) {
        return accumulate(append, null, map(f, seq));
    }

    function enumerate_interval(low, high) {
        return low > high
            ? null
            : pair(low, enumerate_interval(low + 1, high));
    }

    // 练习2.42 “八皇后谜题”问怎样把八个皇后摆在国际象棋盘上，使得没有一个皇后能攻击另一个（也就是说，任意两个皇后都不在同一行、同一列，或者同一斜线上）​。
    // 该谜题的一个解如图2.8所示。解决这个谜题的一种方法是按一个方向考虑棋盘，每次在一列中放入一个皇后。
    // 如果现在已经放好了k-1个皇后，第k个皇后就必须放在不会攻击任何已在棋盘上的皇后的位置。
    // 我们可以递归地描述这一处理过程：假定我们已经生成了在棋盘前k-1列放k-1个皇后的所有可能方法，现在对其中的每种方法，生成把下一皇后放在第k列中每一行的扩充集合。
    // 然后过滤它们，只留下使第k列的皇后与其他皇后相安无事的扩充。这样就生成了k个皇后放在前k列的所有安全序列。继续这一过程就能得到该谜题的所有解，而不是一个解。
    // 我们把这个解法实现为一个函数queens，令它返回在n×n的棋盘上放好n个皇后的所有解的序列。
    // 函数queens有一个内部函数queen_cols，它返回在棋盘的前k列中放好皇后的所有位置的序列。
    // 在这个函数里，参数rest_of_queens是在前k-1列放置k-1个皇后的一种方式，new_row是在第k列放置皇后时考虑的行编号。
    // 要完成这个程序，我们需要设计一种棋盘位置集合的表示方法；还要实现函数adjoin_position，其功能是把一个新的行列位置加入一个位置集合；
    // 还有empty_board表示空的位置集合。你还需要写一个函数is_safe，它确定在一个位置集合中，位于第k列的皇后相对于其他列的皇后是安全的。
    // （请注意，我们只需检查新皇后是否安全——其他皇后都已经保证相安无事了。）

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
                return append(rest_of_queens, list(new_row));
            }

            return k === 0
                ? list(empty_board)
                : filter(positions => {
                        return is_safe(k, positions);
                    },
                    flatmap(rest_of_queens => {
                            return map(new_row =>
                                    adjoin_position(new_row, k, rest_of_queens),
                                enumerate_interval(1, board_size));
                        },
                        queen_cols(k - 1)))
        }

        return queen_cols(board_size);
    }

    (function () {
        display_list(queens(4));
        display_list(queens(6));

        const expects = [1, 0, 0, 2, 10, 4, 40, 92,];
        for (let i = 0; i < expects.length; i++) {
            display_list(`queens(${i + 1}) expect_len=${expects[i]} result_len=`)
            display_list(length(queens(i + 1)));
        }
    })();
})()
