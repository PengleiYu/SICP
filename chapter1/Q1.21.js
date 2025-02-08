(function () {
    // 练习1.21 请用smallest_divisor函数找出下面各数的最小因子：199，1999，19999。
    function divides(a, b) {
        return b % a === 0;
    }

    function square(x) {
        return x * x;
    }

    // 最小整除数，从2开始向上寻找整除数，直到根号n
    function find_divisor(n, test_divisor) {
        return square(test_divisor) > n
            ? n
            : divides(test_divisor, n)
                ? test_divisor
                : find_divisor(n, test_divisor + 1);
    }

    function smallest_divisor(n) {
        return find_divisor(n, 2);
    }

    [199, 1999, 19999].forEach(value => {
        let smallestDivisor = smallest_divisor(value);
        console.log(`${value} 最小因子: ${smallestDivisor}`)
    })
})()
