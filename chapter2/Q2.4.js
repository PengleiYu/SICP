// pair数据的另一种函数实现
(function () {
    // 练习2.4 下面是序对的另一种函数式表示。请针对这种表示方式，验证对任意的x和y，head(pair(x,y))都将产生x。
    function pair(x, y) {
        return m => m(x, y);
    }

    function head(z) {
        return z((p, q) => p);
    }

    // 对应的tail应该如何定义？（提示：在验证这一表示确实能行时，可以利用1.1.5节介绍的代换模型。​）

    function tail(z) {
        return z((p, q) => q);
    }

    (function () {
        const p = pair(1, 2);
        console.log(head(p), tail(p));
        const p2 = pair(p, 3);
        console.log(head(head(p2)), tail(head(p2)), tail(p2));
    })()
})()
