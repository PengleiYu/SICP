import {map, list, display_list, accumulate, pair, head, tail, is_null, is_pair} from "sicp";

// 使用accumulate处理复杂层级的序列
(function () {
    // 练习2.36 函数accumulate_n与accumulate类似，但是其第三个参数是一个序列的序列，我们还假定其中每个小序列的元素个数相同。
    // 这个函数应该用指定的累积过程组合起每个序列里的第一个元素，而后再组合每个序列的第二个元素，并如此做下去。它返回以得到的所有结果为元素的序列。
    // 例如，如果s是包含4个序列的序列
    const s = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12));

    // 那么accumulate_n(plus, 0, s)的值就应该是序列list(22, 26, 30)。请填充下面accumulate_n声明中缺失的表达式：
    function accumulate_n(op, init, seqs) {
        return is_null(head(seqs))
            ? null
            : pair(accumulate(op, init,
                    // 从每个子序列中取出第一个元素组成序列
                    // accumulate((sub_seq, result) => pair(head(sub_seq), result), null, seqs)
                    map(head, seqs),
                ),
                accumulate_n(op, init,
                    // 从每个子序列中取出剩余部分再组成序列
                    // accumulate((sub_seq, result) => pair(tail(sub_seq), result), null, seqs)
                    map(tail, seqs)
                )
            );
    }

    display_list(accumulate_n((x, y) => x + y, 0, s));
})()
