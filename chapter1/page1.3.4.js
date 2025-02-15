// 1.3.4 函数作为返回值
// 函数作为返回值：一般形式的牛顿法以及更通用的不动点搜寻函数
(function () {
    function average(a, b) {
        return (a + b) / 2;
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

    // 优化使用均值阻尼的不动点搜寻函数

    // 均值阻尼；使用函数作为返回值
    function average_damp(f) {
        return x => average(x, f(x));
    }

    function sqrt(x) {
        // 不需要手动写原函数的均值阻尼形式了
        return fixed_point(average_damp(y => x / y), 1);
    }

    (function () {
        [2, 4, 9,].forEach(value => {
            console.log(`sqrt(${value})=${sqrt(value)}`)
        })
    })()

    // 可以迅速改写成求立方根
    function cub_root(x) {
        return fixed_point(average_damp(y => x / (y * y)), 1)
    }

    (function () {
        [2, 8, 27, 64,].forEach(v => {
            console.log(`cube_root(${v})=${cub_root(v)}`);
        })
    })()


    // 一般形式的牛顿法
    // 若x->g(x)是可微函数，则方程g(x)=0的一个解就是x->f(x)的一个不动点，其中f(x)=x-g(x)/g'(x)，g'是g的导数
    // 求导：导数与均值阻尼类似，都是一个函数到另一个函数的变换

    function newton_transform(g) {
        return x => x - g(x) / deriv(g)(x);
    }

    function deriv(g) {
        return x => (g(x + dx) - g(x)) / dx;
    }

    const dx = 0.00001;

    function newtons_method(g, guess) {
        return fixed_point(newton_transform(g), guess);
    }

    (function () {
        // 牛顿法是对不动点理论的高阶应用，更加简化了调用
        function sqrt(x) {
            return newtons_method(y => y * y - x, 1);
        }

        console.log(`牛顿法sqrt:`);
        [2, 4, 9,].forEach(value => {
            console.log(`sqrt(${value})=${sqrt(value)}`)
        })

        function cub_root(x) {
            return newtons_method(y => y * y * y - x, 1);
        }

        console.log(`牛顿法cub_root:`);
        [2, 8, 27, 64,].forEach(v => {
            console.log(`cube_root(${v})=${cub_root(v)}`);
        })
    })()

    // 搜寻不动点函数的更通用表示
    function fixed_point_of_transform(g, transform, guess) {
        return fixed_point(transform(g), guess);
    }

    (function () {
        function sqrt(x) {
            return fixed_point_of_transform(y => x / y, average_damp, 1);
        }

        function sqrt_newton(x) {
            return fixed_point_of_transform(y => y * y - x, newton_transform, 1);
        }

        console.log(`fixed_point_of_transform:`);
        [2, 4, 9,].forEach(value => {
            console.log(`sqrt(${value})=${sqrt(value)}`)
        });
        [2, 4, 9,].forEach(value => {
            console.log(`sqrt_newton(${value})=${sqrt_newton(value)}`)
        });
    })()
})()
