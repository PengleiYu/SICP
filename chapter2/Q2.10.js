import {make_interval, div_interval, display_interval} from "./interval.js";

// 处理场景：横跨0的区间做除数
(function () {
    // 练习2.10 Ben Bitdiddle是一个专业程序员，他看了Alyssa工作后评论说，除以一个横跨0的区间的意义不清楚。
    // 请修改Alyssa的代码，检查这种情况并在发现时报错。

    (function () {
        const p1 = make_interval(1, 2)
        const p2 = make_interval(4, 5);
        display_interval(div_interval(p2, p1));
        const p3 = make_interval(-5, 3);
        display_interval(div_interval(p3, p2));
        display_interval(div_interval(p2, p3));
    })();
})()
