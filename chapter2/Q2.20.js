import {list, display, head, tail, is_null, append, pair} from "sicp";

// 科里化
(function () {
    // 练习2.20 由于存在高阶函数，允许函数有多个参数的功能已不再是严格必需的，只允许一个参数就足够了。
    // 如果我们有一个函数（例如plus）自然情况下它应该有两个参数。我们可以写出该函数的一个变体，一次只送给它一个参数。
    // 该变体对第一个参数的应用返回一个函数，该函数随后可以应用于第二个参数。对多个参数就这样做下去。
    // 这种技术称为curry化，该名字出自美国数学与逻辑学家Haskell Brooks Curry，在一些程序设计语言里被广泛使用，如Haskell和OCalm。
    // 下面是在JavaScript里plus的curry化版本：
    function plus_curried(x) {
        return y => x + y;
    }
    function minus_curried(x){
        return y=> x-y;
    }

    // 请写一个函数brooks，它的第一个参数是需要curry化的函数，第二个参数是一个实参的表，经过curry化的函数应该按给定顺序，一个个地应用于这些实际参数。
    // 例如，brooks的如下应用应该等价于plus_curried(3)(4)：
    display(brooks(plus_curried, list(3, 4)));
    display(brooks(minus_curried, list(3, 4)));
    // 做好了函数brooks，我们也可以carry化函数brooks自身！
    // 请写一个函数carried_brooks，它可以按下面的方式应用：
    display(brooks_carried(list(plus_curried, 3, 4)));
    // 有了这个carried_brooks，下面两个语句的求值结果是什么？
    // 其实都等价于对plus_curried执行后续列表元素，结果都是7
    display(
        brooks_carried(list(brooks_carried,
            list(plus_curried, 3, 4)))
    );
    display(
        brooks_carried(list(brooks_carried,
            list(brooks_carried,
                list(plus_curried, 3, 4))))
    );


    function brooks(f, args) {
        return is_null(args)
            ? f
            // 注意这里保证对f应用参数的顺序
            : brooks(f(head(args)), tail(args))
    }

    function brooks_carried(args) {
        return brooks(head(args), tail(args));
    }
})()
