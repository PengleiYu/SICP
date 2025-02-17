// 高阶函数之通用的迭代改进函数
(function () {

    function average(x, y) {
        return (x + y) / 2;
    }

    function average_damp(f) {
        return x => average(x, f(x));
    }

    // function sqrt(x) {
    //     function sqrt_iter(guess, x) {
    //         return is_good_enough(guess, x)
    //             ? guess
    //             : sqrt_iter(improve(guess, x), x)
    //     }
    //
    //     function is_good_enough(guess, x) {
    //         return Math.abs(Math.pow(guess, 2) - x) < 0.001;
    //     }
    //
    //     function improve(guess, x) {
    //         return average(guess, x / guess);
    //     }
    //
    //     return sqrt_iter(1, x)
    // }
    // function fixed_point(f, first_guess) {
    //     const tolerance = 0.00001;
    //
    //     function close_enough(x, y) {
    //         return Math.abs(x - y) < tolerance;
    //     }
    //
    //     function try_with(guess) {
    //         const next = f(guess);
    //         return close_enough(guess, next)
    //             ? next
    //             : try_with(next);
    //     }
    //
    //     return try_with(first_guess);
    // }

    // 练习1.46 本章描述的一些数值算法都是迭代式改进的实例。迭代式改进是一种非常通用的计算策略，它说：为了计算某些东西，
    // 我们可以从对答案的某个初始猜测开始，检查这一猜测是否足够好，如果不行就改进这一猜测，将改进后的猜测作为新猜测继续这一计算过程。
    // 请写一个函数iterative_improve，它以两个函数为参数：其中一个表示评判猜测是否足够好的方法，另一个表示改进猜测的方法。
    // iterative_improve的返回值应该是函数，它以某个猜测为参数，通过不断改进，直至得到的猜测足够好为止。
    // 利用iterative_improve重写1.1.7节的sqrt函数和1.3.3节的fixed_point函数。

    // 重要：迭代改进函数，一种通用模式
    function iterative_improve(is_good_enough, improve) {
        function iter(guess) {
            const next = improve(guess);
            return is_good_enough(guess, next)
                ? next
                : iter(next);
        }

        return iter;
    }

    // 使用通用迭代改进形式求平方根
    function new_sqrt(x) {
        // 这里不再是求平方和x的差值足够小了，是要求两次猜测足够接近，即收敛
        function is_good_enough(guess, next) {
            return Math.abs(guess - next) < 0.00001;
        }

        function improve(guess) {
            return average(guess, x / guess);
        }

        return iterative_improve(is_good_enough, improve)(1);
    }

    (function () {
        Array.from({length: 10}, (v, k) => k + 2)
            .forEach(value => {
                let x = value * value;
                let result = new_sqrt(x);
                console.log(`${x}平方根=${result}`);
            })
    })()

    // 使用通用迭代改进形式求不动点
    function new_fixed_pointer(f, first_guess) {
        const tolerance = 0.00001;

        function close_enough(x, y) {
            return Math.abs(x - y) < tolerance;
        }

        return iterative_improve(close_enough, f)(first_guess);
    }

    // 使用平方根和立方根验证新的不动点函数
    (function () {
        function sqrt_new_fixed_pointer(x) {
            return new_fixed_pointer(average_damp(y => x / y), 1);
        }

        (function () {
            [2, 4, 9,].forEach(value => {
                console.log(`sqrt(${value})=${sqrt_new_fixed_pointer(value)}`)
            })
        })()

        function cub_root_new_fixed_pointer(x) {
            return new_fixed_pointer(average_damp(y => x / (y * y)), 1)
        }

        (function () {
            [2, 8, 27, 64,].forEach(v => {
                console.log(`cube_root(${v})=${cub_root_new_fixed_pointer(v)}`);
            })
        })()
    })()
})()
