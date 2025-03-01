import {map, list, display_list, accumulate, pair, head, tail, is_null, is_pair} from "sicp";

// fold_left和fold_right
(function () {
    function divide(a, b) {
        return a / b;
    }

    // 练习2.38 函数accumulate也被称为fold_right，因为它把序列里的第一个元素组合到右边所有元素的组合结果上。与之对应的也有一个fold_left，
    // 它与fold_right类似，但却是按相反的方向组合元素：
    function fold_left(op, init, sequence) {
        function iter(result, rest) {
            return is_null(rest)
                ? result
                : iter(op(result, head(rest)), tail(rest));
        }

        return iter(init, sequence);
    }

    const fold_right = accumulate;

    // 下面各个表达式的值是什么？
    display_list(fold_right(divide, 1, list(1, 2, 3)));
    display_list(fold_left(divide, 1, list(1, 2, 3)));
    display_list(fold_right(list, null, list(1, 2, 3)));
    display_list(fold_left(list, null, list(1, 2, 3)));
    display_list(fold_right(pair, null, list(1, 2, 3)));
    display_list(fold_left(pair, null, list(1, 2, 3)));

    // 为保证fold_right和fold_left对任何序列都产生同样结果，函数op应该满足什么性质？
    // op应当计算计算结果与入参顺序无关
})()
