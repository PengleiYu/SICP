import {is_null, list, pair, head, tail, display, display_list} from "sicp";

// 实现序列的for_each
(function () {
    // 练习2.23 函数for_each与map类似，它也以一个函数和一个元素表为参数，但是它并不返回结果的表，只是把这个函数从左到右逐个应用于表中元素，
    // 并且把函数应用返回的值都丢掉。for_each通常用于那些执行某些动作的函数，如打印等。请看下面的例子：
    display(for_each(x => display(x), list(57, 321, 88)));

    // 调用函数for_each的返回值（上面没有显示）可以是任何东西，例如逻辑值真。请给出一个for_each的实现。
    function for_each(f, items) {
        // 该实现没有返回值
        // if (is_null(items)) return
        // f(head(items));
        // for_each(f, tail(items));

        // 迭代版本
        // function iter(things, result) {
        //     return is_null(things)
        //         ? result
        //         : iter(tail(things), pair(f(head(things)), result));
        // }
        //
        // return iter(items, null);

        // 递归版本
        // return is_null(items)
        //     ? null
        //     : pair(f(head(items)), for_each(f, tail(items)));

        // 该实现会以最后一个元素应用f后的值为结果
        function iter(things, result) {
            return is_null(things)
                ? result
                : iter(tail(things), f(head(things)));
        }

        return iter(items, null);

    }
})()
