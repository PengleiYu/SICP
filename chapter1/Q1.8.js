// 练习1.8 求立方根的牛顿法基于如下事实，如果y是x的立方根的一个近似值，那么下式能给出一个更好的近似值：
// (x/y^2+2y)/3
// 请利用这个公式，实现一个类似平方根函数的求立方根的函数

function main() {
    function is_good_enough(guess, x) {
        return Math.abs(Math.pow(guess, 3) - x) < 0.001;
    }

    function average(a, b) {
        return (a + b) / 2;
    }

    function improve(guess, x) {
        return (x / Math.pow(guess, 2) + 2 * guess) / 3;
        // return average(guess, x / Math.pow(guess, 2))
    }

    function cbrt_iter(guess, x) {
        return is_good_enough(guess, x)
            ? guess
            : cbrt_iter(improve(guess, x), x);
    }

    function cbrt(x) {
        // return cbrt_iter(1, x)
        return cbrt2(x);
    }

    // 利用词法作用域简化
    function cbrt2(x) {
        function is_good_enough2(guess) {
            return Math.abs(Math.pow(guess, 3) - x) < 0.0001;
        }

        function improve2(guess) {
            console.log(`improve2 called: guess=${guess}`)
            return (x / Math.pow(guess, 2) + 2 * guess) / 3;
        }

        function cbrt_iter2(guess) {
            return is_good_enough2(guess)
                ? guess
                : cbrt_iter2(improve2(guess));
        }

        return cbrt_iter2(1);
    }

    console.log(cbrt(8))
    console.log(cbrt(27))
    console.log(cbrt(1))
    console.log(cbrt(0))
    console.log(cbrt(-27))
}

main()
