import {pair, list, is_list, display_list, display, raw_display, head, tail, is_null,} from "sicp";

// 2.2.1 序列的表示
(function () {

    (function () {
        // 打印列表，用不同的展示方式
        const list1 = pair(1, pair(2, pair(3, pair(4, null))));
        console.log(`list1 is list? ${is_list(list1)}`);
        const list2 = list(1, 2, 3, 4, 5, 6);

        function print_list(list) {
            display_list(list);
            display(list);
            raw_display(list);
            console.log(list);
        }

        print_list(list1);
        print_list(list2);

        // null也是list，表示空表
        console.log(`null is list? ${is_list(null)}`)
    })();

    (function () {
        // 对列表做pair操作
        const one_through_four = list(1, 2, 3, 4);
        display(one_through_four);
        display(head(one_through_four));
        display(tail(one_through_four));
        display(pair(10, one_through_four));
        display(pair(5, one_through_four));

        // 复杂列表按pair展示会难以理解，按list展示则很简单
        const l = pair(1, pair([2, 3], pair(pair(4, pair(5, null)), pair(6, null))));
        display(l);
        display_list(l);
    })();

    (function () {
        // 列表按索引取值
        function list_ref(items, n) {
            return n === 0
                ? head(items)
                : list_ref(tail(items), n - 1);
        }

        const square = list(1, 4, 9, 16, 25);
        display(list_ref(square, 3));

        // function length(items) {
        //     return is_null(items)
        //         ? 0
        //         : length(tail(items)) + 1;
        // }
        function length(items) {
            function iter(a, count) {
                return is_null(a)
                    ? count
                    : iter(tail(a), count + 1);
            }

            return iter(items, 0);
        }

        const odds = list(1, 3, 5, 7);
        display(length(odds));

        function append(list1, list2) {
            return is_null(list1)
                ? list2
                : pair(head(list1), append(tail(list1), list2));
        }

        display_list(append(square, odds));
        display_list(append(odds, square));
    })();
})()
