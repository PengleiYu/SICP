import {pair, display, display_list, head, is_null, list, tail,} from "sicp";

// 实现序列的reverse函数
(function () {
    // 练习2.18 请声明一个函数reverse，它以一个表为参数，返回的表包含的元素与参数表一样，但它们排列的顺序与参数表相反：

    // 这个递归版本结果不对，不符合要求，怎么正确实现递归版本?
    // function reverse(items) {
    //     return is_null(items)
    //         ? null
    //         : pair(reverse(tail(items)), head(items));
    // }

    // 迭代版本
    function reverse(items) {
        function iter(items, result) {
            return is_null(items)
                ? result
                : iter(tail(items), pair(head(items), result))
        }

        return iter(items, null);
    }

    const l = list(1, 4, 9, 16, 25);
    display_list(reverse(l));
})()
