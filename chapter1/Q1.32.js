// 高阶函数之累积函数
(function () {
    // a.请说明，sum和product（练习1.31）都是另一个称为accumulate的更一般概念的特殊情况，accumulate使用某些普适的累积函数组合起一系列项：
    // accumulate取与sum和product一样的项和范围描述参数，再加一个（两个参数的）combiner函数，它说明如何组合当前项与前面各项的积累结果，
    // 还有一个null_value参数，它说明在所有的项都用完时的基本值。
    // 请声明accumulate，并说明我们能怎样通过简单调用accumulate的方式写出sum和product的声明。

    function accumulate(combiner, null_value, term, a, next, b) {
        // 这个迭代实现里，把null_value当成result了，也可以声明一个内部函数，专门使用result参数
        return a > b
            ? null_value
            : accumulate(combiner, combiner(null_value, term(a)), term, next(a), next, b);
    }

    function sum(a, b) {
        function combiner(a, b) {
            return a + b;
        }

        function term(a) {
            return a;
        }

        function next(a) {
            return a + 1;
        }

        return accumulate(combiner, 0, term, a, next, b);
    }

    console.log(sum(1, 100))

    function product(a, b) {
        function combiner(a, b) {
            return a * b;
        }

        function term(a) {
            return a;
        }

        function next(a) {
            return a + 1;
        }

        return accumulate(combiner, 1, term, a, next, b);
    }

    for (let i = 0; i < 10; i++) {
        console.log(product(1, i));
    }

    // b.如果你的accumulate函数生成的是递归计算过程，那么请写一个生成迭代计算过程的函数。如果它生成迭代计算过程，请写一个生成递归计算过程的函数。
    function accumulate2(combiner, null_value, term, a, next, b) {
        return a > b
            ? null_value
            : combiner(term(a), accumulate2(combiner, null_value, term, next(a), next, b))
    }

    function sum2(a, b) {
        function combiner(a, b) {
            return a + b;
        }

        function term(a) {
            return a;
        }

        function next(a) {
            return a + 1;
        }

        return accumulate2(combiner, 0, term, a, next, b);
    }

    console.log(sum2(1, 100))

    function product2(a, b) {
        function combiner(a, b) {
            return a * b;
        }

        function term(a) {
            return a;
        }

        function next(a) {
            return a + 1;
        }

        return accumulate2(combiner, 1, term, a, next, b);
    }

    for (let i = 0; i < 10; i++) {
        console.log(product2(1, i));
    }
})()
