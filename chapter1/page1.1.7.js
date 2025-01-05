// 牛顿法求平方根：主要思想为迭代，每一步猜测值是否足够好，否则提高猜测值精度，继续下一步迭代
// 更标准的牛顿法公式是有泰勒展开得到，纯数学计算，见维基百科
// https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E6%B3%95
function main() {
    function sqrt(x) {
        return sqrt_iter(1, x)
    }

    function sqrt_iter(guess, x) {
        return is_good_enough(guess, x)
            ? guess
            : sqrt_iter(improve(guess, x), x)
    }

    function is_good_enough(guess, x) {
        return Math.abs(Math.pow(guess, 2) - x) < 0.001;
    }

    function improve(guess, x) {
        return average(guess, x / guess);
    }

    function average(x, y) {
        return (x + y) / 2;
    }

    console.log(sqrt(9))
    console.log(sqrt(100 + 37))
    console.log(sqrt(2) + sqrt(3))
    console.log(Math.pow(sqrt(1000), 2))
}

main()
