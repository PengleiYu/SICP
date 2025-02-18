import {error} from "sicp";
// 2.1.3 数据是什么意思？
// 数据的函数式表示，消息传递的程序设计风格
(function () {
    // 一般而言，我们可以认为数据是由一组选择函数和构造函数，以及使这些函数能成为一套合法表示必须满足的一组特定条件定义的

    // 请考虑序对的概念，前面我们用它定义有理数，但从来都没有说过序对究竟是什么，只说所用的语言为操作序对提供了三个函数pair、head和tail。
    // 有关这三个操作，我们需要知道的全部东西就是：如果用pair把两个对象粘在一起，那么就可以借助head和tail提取出这两个对象。
    // 也就是说，这些操作满足条件是：对任何对象x和y，如果z是pair(x, y)，那么head(z)就是x，而tail(z)就是y。
    // 我们确实说过这三个函数是我们的语言提供的基本函数。然而，任何能满足上述条件的三个函数都可以用作实现序对的基础。
    // 下面这个令人吃惊的事实能最好地说明这一点：我们完全可以不用任何数据结构，只用函数就实现序对。

    // 使用函数来实现数据
    function pair(x, y) {
        function dispatch(m) {
            return m === 0
                ? x
                : m === 1
                    ? y
                    : error('参数不是0或1 -- pair')
        }

        return dispatch;
    }

    function head(z) {
        return z(0);
    }

    function tail(z) {
        return z(1);
    }

    // 这些现在看起来好像只是好玩，但实际上，数据的函数式表示也在我们的程序设计宝库里扮演着核心的角色。这种风格的程序设计通常称为消息传递
    (function () {
        const p = pair(1, 2);
        console.log(head(p), tail(p));
        const p2 = pair(p, 3);
        console.log(head(head(p2)), tail(head(p2)), tail(p2));
    })()
})()
