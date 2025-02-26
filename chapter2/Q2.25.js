import {pair, head, tail, display, display_list, list, is_null, is_pair, length, for_each} from "sicp";

// 使用head和tail从复杂列表中取数
(function () {
    // 练习2.25 请给出能从下面各个表里取出7的head和tail组合：
    const list1 = list(1, 3, list(5, 7), 9);
    const list2 = list(list(7));
    const list3 = list(1, list(2, list(3, list(4, list(5, list(6, 7))))));

    for_each(display_list, list(list1, list2, list3));

    // 每个list都取出7
    for_each(display, list(
        head(tail(
            head(tail(tail(
                list1
            )))
        )),
        head(
            head(
                list2
            )
        ),
        head(tail(
            head(tail(
                head(tail(
                    head(tail(
                        head(tail(
                            head(tail(
                                list3
                            ))
                        ))
                    ))
                ))
            ))
        )),
    ));
})()
