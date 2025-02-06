(function () {
    // 练习1.11 函数f由如下规则定义：
    // 如果n<3，那么f(n)=n；
    // 如果n≥3，那么f(n)=f(n-1)+2f(n-2)+3f(n-3)。
    // 请写一个JavaScript函数，它通过一个递归计算过程计算f。再写一个函数，通过迭代计算过程计算f。

    // 递归形式
    // 重复计算很多
    function f1(n) {
        // console.log(`f1(${n}) called`)
        return n < 3
            ? n
            : f1(n - 1) + 2 * f1(n - 2) + 3 * f1(n - 3);
    }

    // 迭代形式
    // 没有重复计算
    // 不变量：公式指定了一个序列S，设k=n-count，则a=S(k+2),b=S(k+1),c=S(k)
    function f2(n) {
        function iter(a, b, c, count) {
            // console.log(`iter(${a},${b},${c},${count}) called`)
            return count === 0
                ? c
                : iter(a + 2 * b + 3 * c, a, b, count - 1)
        }

        return iter(2, 1, 0, n)
    }

    let n = 34;
    console.log(`f2(${n})=${f2(n)}`)
    console.log(`f1(${n})=${f1(n)}`)
})()
