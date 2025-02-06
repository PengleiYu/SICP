// T变换求斐波那契数只需对数步
(function () {
    // 练习1.19 存在只需要对数步就能求出斐波那契数的巧妙算法。
    // 请回忆1.2.2节fib_iter产生的计算过程中状态变量a和b的变换规则a←a+b和b←a，我们把这种变换称为T变换。
    // 可以看到，从1和0开始把T反复应用n次，将产生一对数Fib(n+1)和Fib(n)。
    // 换句话说，斐波那契数可以通过将T n（变换T的n次方）应用于对偶(1,0)而得到。
    // 现在把T看作变换族Tpq中p=0且q=1的特殊情况，其中Tpq是对偶(a, b)按a←bq+aq+ap和b←bp+aq规则的变换。
    // 请证明，如果应用变换Tpq两次，其效果等同于应用同样形式的变换Tp′q′一次，其中的p′和q′可以由p和q算出来。
    // 这就指明了一种计算这种变换的平方的路径，使我们可以通过连续求平方的方法计算T n，就像fast_expt函数里所做的那样。
    // 把所有这些放到一起，就得到了下面的函数，其运行只需要对数的步数


    function fib(n) {
        return fib_iter(1, 0, 0, 1, n);
    }

    // 应用两次Tpq得到，a<-a(p^2+2pq+2q^2)+b(2pq+q^2)  b<-a(2pq+q^2)+b(p^2+q^2)
    // 等于应用一次Tp`q`，a<-a(p`+q`)+bq`  b<-aq`+bp`
    // 用瞪眼法可知：
    // p`+q`=p^2+2pq+2q^2
    // p`=p^2+q^2
    // q`=2pq+q^2
    function fib_iter(a, b, p, q, count) {
        // console.log(`fib_iter(${a},${b},${p},${q},${count})`)
        return count === 0
            ? b
            : is_even(count)
                ? fib_iter(
                    a,
                    b,
                    // 这两个值的计算过程在上面
                    p * p + q * q,
                    2 * p * q + q * q,
                    count / 2,
                )
                : fib_iter(
                    b * q + a * q + a * p,
                    b * p + a * q,
                    p,
                    q,
                    count - 1,
                )
    }

    function is_even(x) {
        return x % 2 === 0;
    }

    for (let i = 0; i < 10; i++) {
        console.log(`fib(${i})=${fib(i)}`)
    }
})()