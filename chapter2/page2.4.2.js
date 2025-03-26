import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair} from "sicp";
import {angle, imag_part, magnitude, make_from_mag_ang, make_from_real_imag, real_part} from "./real.js";

(function () {
    // 2.4.2 带标签数据
    const z1 = make_from_real_imag(3, 4);
    const z2 = make_from_mag_ang(2, Math.PI / 3);

    // 更换底层表示不影响上层结果
    [z1, z2].forEach(value => {
        display_list(make_from_real_imag(real_part(value), imag_part(value)));
        display_list(make_from_mag_ang(magnitude(value), angle(value)));
        display_list(list("直角坐标", real_part(value), imag_part(value)));
        display_list(list("极坐标", magnitude(value), angle(value)));
    });
})();
