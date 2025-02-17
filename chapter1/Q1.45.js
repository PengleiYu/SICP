// 高阶函数之求n次方根的多次均值阻尼技术
(function () {
    function average_damp(f) {
        return x => average(x, f(x));
    }

    function average(a, b) {
        return (a + b) / 2;
    }

    function repeated(f, n) {
        function iter(f, i, result) {
            return i === 0
                ? result
                : iter(f, i - 1, f(result));
        }

        return x => iter(f, n, x);
    }

    function fixed_point(f, first_guess) {
        const tolerance = 0.00001;

        function close_enough(x, y) {
            return Math.abs(x - y) < tolerance;
        }

        function try_with(guess) {
            const next = f(guess);
            return close_enough(guess, next)
                ? next
                : try_with(next);
        }

        return try_with(first_guess);
    }

    // 我们在1.3.3节看到，用朴素方法通过找y↦x/y的不动点来计算平方根的方法不收敛，但可以通过均值阻尼的技术弥补。
    // 同样的技术也可以用于计算立方根，将其看作均值阻尼后的y↦x/y2的不动点。不幸的是，这个方法对四次方根行不通，一次均值阻尼不足以使对y↦x/y3的不动点搜寻收敛。
    // 然而，如果我们求两次均值阻尼（即用y↦x/y3均值阻尼的均值阻尼）​，这一不动点搜寻就收敛了。
    // 请做些试验，考虑把计算n次方根作为基于y↦x/yn-1的反复做均值阻尼的不动点搜寻过程，请设法确定各种情况下需要做多少次均值阻尼，
    // 并基于这一认识实现一个函数，它能利用fixed_point、average_damp和练习1.43的repeated函数计算n次方根。
    // 假定你需要的所有算术运算都是基本函数。


    function root4(x) {
        return fixed_point(repeated(average_damp, 2)(y => x / (y * y * y)), 1)
    }

    (function () {
        [1, 16, 81, 100].forEach(value => {
            let root = root4(value);
            console.log(`${value}四次方根=${root}`);
        })
    })()

    // 猜测n次方根需要做[n/2]次均值阻尼，经实验确实可行
    function root_n(x, n) {
        return fixed_point(
            repeated(average_damp, Math.floor(n / 2))(y => x / Math.pow(y, n - 1)),
            1);
    }

    (function () {
        console.log('=======================')
        Array.from({length: 3}, (v, k) => k + 3)
            .forEach(base => {
                console.log('=======================')
                Array.from({length: 10}, (v, k) => k + 2)
                    .forEach(value => {
                        let x = Math.pow(base, value);
                        let result = root_n(x, value);
                        console.log(`${x}的${value}次方根=${result}`);
                    })
            })
    })()
})()
