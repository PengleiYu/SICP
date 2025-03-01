import {map, list, display_list, accumulate, pair, head, tail, is_null, is_pair} from "sicp";

// 使用accumulate_n实现矩阵和矢量的运算
(function () {
    function accumulate_n(op, init, seqs) {
        return is_null(head(seqs))
            ? null
            : pair(accumulate(op, init, map(head, seqs)),
                accumulate_n(op, init, map(tail, seqs)));
    }

    // 练习2.37 假设我们把向量v=(vi)表示为数的序列，把矩阵m=(mij)表示为向量（矩阵行）的序列。例如，矩阵：
    // 可以用下面的序列表示：
    const m = list(
        list(1, 2, 3, 4),
        list(4, 5, 6, 6),
        list(6, 7, 8, 9),
    );
    const n = list(
        list(1, 2, 3),
        list(4, 5, 6),
        list(7, 8, 9),
        list(10, 11, 12),
    );
    const v = list(1, 0, 0, 0);
    const w = list(2, 3, 4, 5);
    // 有了这种表示，我们就可以利用序列操作，简洁地描述各种基本的矩阵与向量运算了。例如如下的这些运算（任何有关矩阵代数的书里都有说明）​：
    // [插图]
    // 其中的点积(dot product)函数可以如下声明
    function dot_product(v, w) {
        return accumulate((x, y) => x + y,
            0,
            accumulate_n((x, y) => x * y, 1, list(v, w)));
    }

    // 请填充下面函数声明里空缺的表达式，使所定义的函数能完成另外那些矩阵运算的计算（函数accumulate_n在练习2.36中定义）​。
    function matrix_times_vector(m, v) {
        return map(line => dot_product(line, v), m);
    }

    function transpose(mat) {
        return accumulate_n(pair, null, mat);
    }

    function matrix_times_matrix(m, n) {
        const cols = transpose(n);
        return map(row => map(col => dot_product(col, row), cols), m);
    }

    (function () {
        const vw = 2;
        const mv = list(1, 4, 6);
        const mn = list(
            list(70, 80, 90),
            list(126, 147, 168),
            list(180, 210, 240)
        );
        const m_trans = list(
            list(1, 4, 6),
            list(2, 5, 7),
            list(3, 6, 8),
            list(4, 6, 9)
        );

        display_list("vw")
        display_list(dot_product(v, w))
        display_list("预期")
        display_list(vw);

        display_list("mv")
        display_list(matrix_times_vector(m, v))
        display_list("预期")
        display_list(mv);

        display_list("mn")
        display_list(matrix_times_matrix(m, n))
        display_list("预期")
        display_list(mn);

        display_list("m_trans")
        display_list(transpose(m))
        display_list("预期")
        display_list(m_trans);

    })();
})()
