import {display, display_list, list, is_null, head, tail, pair, map,} from "sicp";

// 对比有无map抽象屏障
(function () {
    // 练习2.21 函数square_list以一个数值表为参数，返回每个数的平方构成的表：
    display_list(square_list(list(1, 2, 3, 4,)));

    // 下面是square_list的两个不同声明，请填充其中空缺的表达式以完成它们：
    function square(x) {
        return x * x;
    }

    // function square_list(items) {
    //     return is_null(items)
    //         ? null
    //         : pair(square(head(items)), square_list(tail(items)));
    // }

    // map更简单，隔离了上层逻辑和list的底层实现
    function square_list(items) {
        return map(square, items);
    }
})()
