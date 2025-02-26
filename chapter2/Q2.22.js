import {display, display_list, pair, list, head, tail, is_null} from "sicp";

// 实现迭代版本的map
(function () {
    function square(x) {
        return x * x;
    }

    function reverse(things) {
        function iter(items, result) {
            return is_null(items)
                ? result
                : iter(tail(items), pair(head(items), result));
        }

        return iter(things, null);
    }

    // 练习2.22 Louis Reasoner试图重写练习2.21中的第一个square_list函数，希望使它能生成一个迭代计算过程：
    // 不幸的是，在这样声明的square_list生成的结果表里，元素的顺序正好与我们需要的顺序相反。为什么？
    // 因为把每次的元素平方放入pair的head，在向后遍历时后来结果会依次加到头部，导致顺序反向
    (function () {
        function square_list(items) {
            function iter(things, answer) {
                return is_null(things)
                    ? answer
                    : iter(tail(things), pair(square(head(things)), answer));
            }

            return iter(items, null);
        }

        display_list(square_list(list(1, 2, 3, 4,)));
    })();
    // Louis又试着修正其程序，交换了pair的参数：
    // 但还是不行。请解释为什么。
    // 顺序虽然正确，但形成的结构不再是合法表结构
    (function () {
        function square_list(items) {
            function iter(things, answer) {
                return is_null(things)
                    ? answer
                    : iter(tail(things), pair(answer, square(head(things))));
            }

            return iter(items, null);
        }

        display_list(square_list(list(1, 2, 3, 4,)));
    })();


    // 迭代版本：结果反转一下，整体复杂度还是O(n)，空间复杂度O(1)
    (function () {


        display('测试reverse');
        display_list(reverse(list(1, 2, 3, 4)));

        function square_list(items) {

            function iter(things, answer) {
                return is_null(things)
                    ? reverse(answer)
                    : iter(tail(things), pair(square(head(things)), answer));
            }

            return iter(items, null);
        }

        display('迭代版本');
        display_list(square_list(list(1, 2, 3, 4,)));
    })();
    // 使用迭代版本的map，map内部已经做了反转
    (function () {
        function map(f, items) {
            function iter(things, answer) {
                return is_null(things)
                    ? reverse(answer)
                    : iter(tail(things), pair(f(head(things)), answer));
            }

            return iter(items, null);
        }

        function square_list(items) {
            return map(square, items);
        }

        display('迭代版map实现')
        display_list(square_list(list(1, 2, 3, 4,)));
    })();

    // 递归版本：复杂度O(n)，空间复杂度也是o(n)
    (function () {
        function square_list(items) {
            return is_null(items)
                ? null
                : pair(square(head(items)), square_list(tail(items)));
        }

        display('递归实现')
        display_list(square_list(list(1, 2, 3, 4,)));
    })();
})()
