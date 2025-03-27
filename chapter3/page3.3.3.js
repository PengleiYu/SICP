import {display_list} from "sicp";

import {insert, lookup, make_table} from "./table.js";
import {insert2, lookup2, make_table as make_msg_table} from "./table2.js";

// 3.3.3 表格的表示
(function () {
    (function () {
        display_list('一维表');
        let table = make_table();
        display_list(table);
        insert('name', 'tom', table);
        insert('age', 18, table);
        insert('name', 'jerry', table);
        insert('a', 'b', table);
        display_list(table);
        display_list(lookup('a', table));
        display_list(lookup('name', table));
        display_list(lookup('hello', table));
    })();

    (function () {
        display_list('二维表');
        let table = make_table();
        display_list(table);
        insert2('teacher', 'name', 'tom', table);
        insert2('teacher', 'age', 18, table);
        insert2('student', 'name', 'jerry', table);
        insert2('student', 'age', 16, table);

        display_list(table);
        display_list(lookup2('teacher', 'name', table));
        display_list(lookup2('student', 'name', table));
        display_list(lookup2('student', 'hello', table));
    })();

    (function () {
        display_list('消息实现的二维表');
        const table = make_msg_table();
        const lookup = table('lookup');
        const insert = table('insert');

        insert('teacher', 'name', 'tom');
        insert('teacher', 'age', 18);
        insert('student', 'name', 'jerry');
        insert('student', 'age', 16);

        display_list(lookup('teacher', 'name'));
        display_list(lookup('teacher', 'age'));
        display_list(lookup('student', 'name'));
        display_list(lookup('student', 'age'));
        display_list(lookup('student', 'hello'));
        display_list(lookup('teacher', 'hello'));
    })();
})();
