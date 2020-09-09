//Dance Party Code

	var character_name = "hef_1.png"

	var json = $.parseJSON('{ "hef": { "doublejam": { "spritesheet": "hef_1.png", "frames": [{ "frame": { "x": 193, "y": 812, "w": 98, "h": 208 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 101, "y": 65, "w": 98, "h": 208 } }, { "frame": { "x": 190, "y": 1022, "w": 118, "h": 210 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 91, "y": 63, "w": 118, "h": 210 } }, { "frame": { "x": 204, "y": 206, "w": 105, "h": 212 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 107, "y": 61, "w": 105, "h": 212 } }, { "frame": { "x": 463, "y": 408, "w": 103, "h": 210 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 109, "y": 62, "w": 103, "h": 210 } }, { "frame": { "x": 202, "y": 420, "w": 106, "h": 199 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 112, "y": 70, "w": 106, "h": 199 } }, { "frame": { "x": 672, "y": 202, "w": 128, "h": 180 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 107, "y": 89, "w": 128, "h": 180 } }, { "frame": { "x": 1097, "y": 523, "w": 136, "h": 174 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 101, "y": 98, "w": 136, "h": 174 } }, { "frame": { "x": 1137, "y": 1276, "w": 136, "h": 173 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 100, "y": 100, "w": 136, "h": 173 } }, { "frame": { "x": 1275, "y": 1275, "w": 130, "h": 180 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 102, "y": 92, "w": 130, "h": 180 } }, { "frame": { "x": 1442, "y": 163, "w": 104, "h": 190 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 107, "y": 80, "w": 104, "h": 190 } }, { "frame": { "x": 480, "y": 620, "w": 97, "h": 201 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 99, "y": 70, "w": 97, "h": 201 } }, { "frame": { "x": 577, "y": 203, "w": 93, "h": 210 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 95, "y": 63, "w": 93, "h": 210 } }, { "frame": { "x": 613, "y": 1214, "w": 101, "h": 212 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 86, "y": 61, "w": 101, "h": 212 } }, { "frame": { "x": 1106, "y": 309, "w": 100, "h": 212 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 87, "y": 61, "w": 100, "h": 212 } }, { "frame": { "x": 1095, "y": 889, "w": 102, "h": 205 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 86, "y": 66, "w": 102, "h": 205 } }, { "frame": { "x": 587, "y": 823, "w": 117, "h": 190 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 75, "y": 79, "w": 117, "h": 190 } }, { "frame": { "x": 1234, "y": 1096, "w": 124, "h": 177 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 70, "y": 94, "w": 124, "h": 177 } }, { "frame": { "x": 1235, "y": 521, "w": 122, "h": 174 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 75, "y": 99, "w": 122, "h": 174 } }, { "frame": { "x": 1359, "y": 521, "w": 124, "h": 173 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 76, "y": 100, "w": 124, "h": 173 } }, { "frame": { "x": 1109, "y": 1096, "w": 123, "h": 178 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 75, "y": 95, "w": 123, "h": 178 } }, { "frame": { "x": 977, "y": 700, "w": 121, "h": 187 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 73, "y": 86, "w": 121, "h": 187 } }, { "frame": { "x": 1545, "y": 1251, "w": 115, "h": 195 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 76, "y": 78, "w": 115, "h": 195 } }, { "frame": { "x": 706, "y": 811, "w": 106, "h": 202 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 94, "y": 71, "w": 106, "h": 202 } }, { "frame": { "x": 845, "y": 1213, "w": 97, "h": 206 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 103, "y": 67, "w": 97, "h": 206 } }] }, "drop": { "spritesheet": "hef_1.png", "frames": [{ "frame": { "x": 193, "y": 812, "w": 98, "h": 208 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 101, "y": 65, "w": 98, "h": 208 } }, { "frame": { "x": 1518, "y": 881, "w": 98, "h": 210 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 101, "y": 63, "w": 98, "h": 210 } }, { "frame": { "x": 311, "y": 205, "w": 100, "h": 214 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 100, "y": 59, "w": 100, "h": 214 } }, { "frame": { "x": 705, "y": 594, "w": 104, "h": 215 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 98, "y": 58, "w": 104, "h": 215 } }, { "frame": { "x": 1410, "y": 881, "w": 106, "h": 215 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 97, "y": 58, "w": 106, "h": 215 } }, { "frame": { "x": 1299, "y": 883, "w": 109, "h": 211 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 96, "y": 62, "w": 109, "h": 211 } }, { "frame": { "x": 568, "y": 415, "w": 115, "h": 203 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 95, "y": 70, "w": 115, "h": 203 } }, { "frame": { "x": 1667, "y": 1092, "w": 107, "h": 183 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 91, "y": 90, "w": 107, "h": 183 } }, { "frame": { "x": 1536, "y": 369, "w": 118, "h": 152 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 86, "y": 121, "w": 118, "h": 152 } }, { "frame": { "x": 1656, "y": 474, "w": 154, "h": 143 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 70, "y": 137, "w": 154, "h": 143 } }, { "frame": { "x": 944, "y": 1276, "w": 191, "h": 151 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 51, "y": 137, "w": 191, "h": 151 } }, { "frame": { "x": 1235, "y": 1, "w": 211, "h": 160 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 40, "y": 133, "w": 211, "h": 160 } }, { "frame": { "x": 802, "y": 1, "w": 215, "h": 163 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 38, "y": 132, "w": 215, "h": 163 } }, { "frame": { "x": 1019, "y": 1, "w": 214, "h": 162 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 38, "y": 133, "w": 214, "h": 162 } }, { "frame": { "x": 1448, "y": 1, "w": 211, "h": 157 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 40, "y": 136, "w": 211, "h": 157 } }, { "frame": { "x": 1661, "y": 1, "w": 204, "h": 148 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 44, "y": 142, "w": 204, "h": 148 } }, { "frame": { "x": 802, "y": 166, "w": 193, "h": 141 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 49, "y": 144, "w": 193, "h": 141 } }, { "frame": { "x": 997, "y": 166, "w": 177, "h": 141 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 58, "y": 139, "w": 177, "h": 141 } }, { "frame": { "x": 1812, "y": 504, "w": 153, "h": 143 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 71, "y": 130, "w": 153, "h": 143 } }, { "frame": { "x": 1412, "y": 355, "w": 122, "h": 154 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 87, "y": 119, "w": 122, "h": 154 } }, { "frame": { "x": 1303, "y": 348, "w": 107, "h": 171 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 88, "y": 102, "w": 107, "h": 171 } }, { "frame": { "x": 1874, "y": 858, "w": 101, "h": 190 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 94, "y": 83, "w": 101, "h": 190 } }, { "frame": { "x": 1606, "y": 677, "w": 98, "h": 202 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 99, "y": 71, "w": 98, "h": 202 } }, { "frame": { "x": 1706, "y": 619, "w": 97, "h": 207 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 100, "y": 66, "w": 97, "h": 207 } }] }, "kick": { "spritesheet": "hef_1.png", "frames": [{ "frame": { "x": 193, "y": 812, "w": 98, "h": 208 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 101, "y": 65, "w": 98, "h": 208 } }, { "frame": { "x": 1872, "y": 1249, "w": 96, "h": 207 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 104, "y": 66, "w": 96, "h": 207 } }, { "frame": { "x": 1208, "y": 315, "w": 93, "h": 204 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 109, "y": 69, "w": 93, "h": 204 } }, { "frame": { "x": 610, "y": 1015, "w": 91, "h": 197 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 113, "y": 76, "w": 91, "h": 197 } }, { "frame": { "x": 1874, "y": 1050, "w": 94, "h": 190 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 116, "y": 83, "w": 94, "h": 190 } }, { "frame": { "x": 1264, "y": 697, "w": 99, "h": 184 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 117, "y": 89, "w": 99, "h": 184 } }, { "frame": { "x": 1768, "y": 1277, "w": 102, "h": 182 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 117, "y": 91, "w": 102, "h": 182 } }, { "frame": { "x": 1662, "y": 1277, "w": 104, "h": 183 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 108, "y": 90, "w": 104, "h": 183 } }, { "frame": { "x": 183, "y": 1234, "w": 126, "h": 187 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 92, "y": 86, "w": 126, "h": 187 } }, { "frame": { "x": 319, "y": 620, "w": 159, "h": 191 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 70, "y": 82, "w": 159, "h": 191 } }, { "frame": { "x": 1, "y": 1219, "w": 180, "h": 197 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 43, "y": 76, "w": 180, "h": 197 } }, { "frame": { "x": 1, "y": 1015, "w": 187, "h": 202 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 28, "y": 71, "w": 187, "h": 202 } }, { "frame": { "x": 1, "y": 1, "w": 202, "h": 203 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 24, "y": 70, "w": 202, "h": 203 } }, { "frame": { "x": 1, "y": 206, "w": 201, "h": 203 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 24, "y": 70, "w": 201, "h": 203 } }, { "frame": { "x": 205, "y": 1, "w": 200, "h": 202 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 24, "y": 71, "w": 200, "h": 202 } }, { "frame": { "x": 407, "y": 1, "w": 197, "h": 200 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 24, "y": 73, "w": 197, "h": 200 } }, { "frame": { "x": 606, "y": 1, "w": 194, "h": 199 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 25, "y": 74, "w": 194, "h": 199 } }, { "frame": { "x": 1, "y": 612, "w": 197, "h": 198 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 27, "y": 75, "w": 197, "h": 198 } }, { "frame": { "x": 1, "y": 411, "w": 199, "h": 199 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 31, "y": 74, "w": 199, "h": 199 } }, { "frame": { "x": 1, "y": 812, "w": 190, "h": 201 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 43, "y": 72, "w": 190, "h": 201 } }, { "frame": { "x": 413, "y": 203, "w": 162, "h": 203 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 64, "y": 70, "w": 162, "h": 203 } }, { "frame": { "x": 716, "y": 1213, "w": 127, "h": 206 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 85, "y": 67, "w": 127, "h": 206 } }, { "frame": { "x": 1548, "y": 160, "w": 105, "h": 207 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 97, "y": 66, "w": 105, "h": 207 } }, { "frame": { "x": 1199, "y": 886, "w": 98, "h": 208 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 101, "y": 65, "w": 98, "h": 208 } }] }, "xfever": { "spritesheet": "hef_1.png", "frames": [{ "frame": { "x": 310, "y": 421, "w": 151, "h": 197 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 130, "y": 76, "w": 151, "h": 197 } }, { "frame": { "x": 311, "y": 1217, "w": 151, "h": 197 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 130, "y": 76, "w": 151, "h": 197 } }, { "frame": { "x": 458, "y": 1015, "w": 150, "h": 197 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 130, "y": 76, "w": 150, "h": 197 } }, { "frame": { "x": 464, "y": 1214, "w": 147, "h": 197 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 130, "y": 76, "w": 147, "h": 197 } }, { "frame": { "x": 703, "y": 1015, "w": 143, "h": 196 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 130, "y": 77, "w": 143, "h": 196 } }, { "frame": { "x": 966, "y": 309, "w": 138, "h": 194 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 130, "y": 79, "w": 138, "h": 194 } }, { "frame": { "x": 455, "y": 823, "w": 130, "h": 190 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 130, "y": 83, "w": 130, "h": 190 } }, { "frame": { "x": 971, "y": 505, "w": 124, "h": 193 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 128, "y": 80, "w": 124, "h": 193 } }, { "frame": { "x": 579, "y": 620, "w": 124, "h": 201 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 118, "y": 72, "w": 124, "h": 201 } }, { "frame": { "x": 848, "y": 888, "w": 121, "h": 206 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 109, "y": 67, "w": 121, "h": 206 } }, { "frame": { "x": 685, "y": 384, "w": 115, "h": 208 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 103, "y": 65, "w": 115, "h": 208 } }, { "frame": { "x": 1810, "y": 649, "w": 97, "h": 207 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 101, "y": 66, "w": 97, "h": 207 } }] }, "xhighkick": { "spritesheet": "hef_1.png", "frames": [{ "frame": { "x": 293, "y": 813, "w": 160, "h": 200 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 30, "y": 73, "w": 160, "h": 200 } }, { "frame": { "x": 802, "y": 309, "w": 162, "h": 194 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 31, "y": 79, "w": 162, "h": 194 } }, { "frame": { "x": 1100, "y": 699, "w": 162, "h": 185 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 34, "y": 88, "w": 162, "h": 185 } }, { "frame": { "x": 1360, "y": 1098, "w": 163, "h": 173 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 38, "y": 100, "w": 163, "h": 173 } }, { "frame": { "x": 944, "y": 1096, "w": 163, "h": 178 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 43, "y": 95, "w": 163, "h": 178 } }, { "frame": { "x": 814, "y": 700, "w": 161, "h": 186 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 51, "y": 87, "w": 161, "h": 186 } }, { "frame": { "x": 811, "y": 505, "w": 158, "h": 193 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 59, "y": 80, "w": 158, "h": 193 } }, { "frame": { "x": 310, "y": 1015, "w": 146, "h": 200 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 69, "y": 73, "w": 146, "h": 200 } }, { "frame": { "x": 971, "y": 889, "w": 122, "h": 205 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 80, "y": 68, "w": 122, "h": 205 } }, { "frame": { "x": 1776, "y": 1039, "w": 96, "h": 208 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 91, "y": 65, "w": 96, "h": 208 } }, { "frame": { "x": 1618, "y": 881, "w": 93, "h": 209 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 96, "y": 64, "w": 93, "h": 209 } }, { "frame": { "x": 1713, "y": 828, "w": 95, "h": 209 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 100, "y": 64, "w": 95, "h": 209 } }] }, "xslide": { "spritesheet": "hef_1.png", "frames": [{ "frame": { "x": 1303, "y": 163, "w": 137, "h": 183 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 132, "y": 117, "w": 137, "h": 183 } }, { "frame": { "x": 1365, "y": 696, "w": 137, "h": 183 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 132, "y": 117, "w": 137, "h": 183 } }, { "frame": { "x": 1407, "y": 1273, "w": 136, "h": 180 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 132, "y": 118, "w": 136, "h": 180 } }, { "frame": { "x": 1867, "y": 1, "w": 134, "h": 171 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 132, "y": 120, "w": 134, "h": 171 } }, { "frame": { "x": 1525, "y": 1093, "w": 140, "h": 156 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 122, "y": 124, "w": 140, "h": 156 } }, { "frame": { "x": 1485, "y": 523, "w": 149, "h": 152 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 108, "y": 121, "w": 149, "h": 152 } }, { "frame": { "x": 1838, "y": 348, "w": 163, "h": 154 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 92, "y": 119, "w": 163, "h": 154 } }, { "frame": { "x": 1656, "y": 315, "w": 180, "h": 157 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 78, "y": 116, "w": 180, "h": 157 } }, { "frame": { "x": 1661, "y": 151, "w": 182, "h": 162 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 75, "y": 111, "w": 182, "h": 162 } }, { "frame": { "x": 1845, "y": 174, "w": 155, "h": 172 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 88, "y": 101, "w": 155, "h": 172 } }, { "frame": { "x": 200, "y": 621, "w": 117, "h": 189 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 96, "y": 84, "w": 117, "h": 189 } }, { "frame": { "x": 1504, "y": 677, "w": 100, "h": 202 }, "sourceSize": { "w": 300, "h": 300 }, "spriteSourceSize": { "x": 100, "y": 71, "w": 100, "h": 202 } }]  } } }');

	var hef = json.hef;
	var timer_1 = null;

	// Old Character Animation
		function startAnimationOne(animationName){
			var timer = null;
			var counter = 0;
			var fps = 50;
			var timeout_timer = 0;
			var timeout_timer_end = 265; // 20 counts = 1s
			var anim = hef[animationName];
			$("#characterImage").attr("src","/blockly/image/"+character_name+".png");
			var frames = anim.frames;
			var totalFrame = frames.length;
			try{
				clearInterval(timer_1);
			}
			catch(e){
				console.log(e);
			}
			timer_1  = setInterval(function(){
				console.log(animationName);
				var frame = frames[counter];
				$("#characterContainer").css({"height":frame.frame.h,"width":frame.frame.w});
				$("#characterImage").css({"top":-frame.frame.y,"left":-frame.frame.x});
				//$("#img").css({"height":frame.spriteSourceSize.h,"width":frame.spriteSourceSize.w,"top":frame.spriteSourceSize.y,"left":frame.spriteSourceSize.x});
				counter++;
				timeout_timer++;
				if(counter >= totalFrame){
					counter=0;
				}
				else if (timeout_timer == timeout_timer_end) {
					clearInterval(timer_1);
				}

			},50);
		}

		// New Character Animation
		var characterAdded = 0;
		var timer_2 = null;
		function startAnimationTwo(animationName){
			characterAdded = 1;
			var timer = null;
			var counter = 0;
			var fps = 50;
			var timeout_timer = 0;
			var timeout_timer_end = 265; // 20 counts = 1s
			var anim = hef[animationName];
			$("#characterImageNew").attr("src","/blockly/image/"+character_name_new+".png");
			var frames = anim.frames;
			var totalFrame = frames.length;
			try{
				clearInterval(timer_2);
			}
			catch(e){
				console.log(e);
			}
			timer_2  = setInterval(function(){
				console.log(animationName);
				var frame = frames[counter];
				$("#characterContainerNew").css({"height":frame.frame.h,"width":frame.frame.w});
				$("#characterImageNew").css({"top":-frame.frame.y,"left":-frame.frame.x});
				//$("#img").css({"height":frame.spriteSourceSize.h,"width":frame.spriteSourceSize.w,"top":frame.spriteSourceSize.y,"left":frame.spriteSourceSize.x});
				counter++;
				timeout_timer++;
				if(counter >= totalFrame){
					counter=0;
				}
				else if (timeout_timer == timeout_timer_end) {
					clearInterval(timer_2);
				}

			},50);
		}


function updateStep(step){
		$(function(){
			startAnimationOne(step);
		});
	}


	function updateCharacter(character){
	    character_name = character;
			$(function(){
				startAnimationOne("doublejam");
			});
	}

// New Character Start
	function updateStepNew(newStep){
			$(function(){
				startAnimationTwo(newStep);
			});
		}

	function updateNewCharacter(newCharacter){
			character_name_new = newCharacter;
			$(function(){
				startAnimationTwo("doublejam");
			});
	}
	// New Character End


	function updateSound(sound){
	  var audioElement = document.getElementById("gameSound");
	  $("#gameSound source").attr("src","/blockly/sounds/"+sound+".mp3");
	  //audioElement.play();
	  $("#gameSound")[0].load();
	  //$("#gameSound")[0].play();
	  $("#gameSound")[0].oncanplaythrough = $("#gameSound")[0].play();
	}

	function updateBackground(background){
	  $('#characterBoard').css("background-image", "url(/blockly/image/"+background+".png)");
	}


	function updatePosition(position){
		if(position == "top"){
			$('#characterContainer').css({"top":"2%", "left":"25%", "right":"0%", "bottom":"0%"});
			console.log(position);
		}
		else if (position == "bottom") {
			$('#characterContainer').css({"top":"60%", "left":"25%", "right":"0%", "bottom":"0%"});
			console.log(position);
		}
		else if (position == "left") {
			$('#characterContainer').css({"top":"35%", "left":"-15%", "right":"0%", "bottom":"0%"});
			console.log(position);
		}
		else if (position == "right") {
			$('#characterContainer').css({"top":"35%", "left":"60%", "right":"0%", "bottom":"0%"});
			console.log(position);
		}
		else if (position == "centre") {
			$('#characterContainer').css({"top":"30%", "left":"25%", "right":"0%", "bottom":"0%"});
			console.log(position);
		}
		else if (position == "top_left") {
			$('#characterContainer').css({"top":"2%", "left":"-15%", "right":"0%", "bottom":"0%"});
			console.log(position);
		}
		else if (position == "top_right") {
			$('#characterContainer').css({"top":"2%", "left":"60%", "right":"0%", "bottom":"0%"});
			console.log(position);
		}
		else if (position == "bottom_left") {
			$('#characterContainer').css({"top":"60%", "left":"-16%", "right":"0%", "bottom":"0%"});
			console.log(position);
		}
		else if (position == "bottom_right") {
			$('#characterContainer').css({"top":"60%", "left":"60%", "right":"0%", "bottom":"0%"});
			console.log(position);
		}
	}

	function updatePositionNew(newPosition){
		if(newPosition == "top"){
			$('#characterContainerNew').css({"top":"2%", "left":"25%", "right":"0%", "bottom":"0%"});
			console.log(newPosition);
		}
		else if (newPosition == "bottom") {
			$('#characterContainerNew').css({"top":"60%", "left":"25%", "right":"0%", "bottom":"0%"});
			console.log(newPosition);
		}
		else if (newPosition == "left") {
			$('#characterContainerNew').css({"top":"35%", "left":"-15%", "right":"0%", "bottom":"0%"});
			console.log(newPosition);
		}
		else if (newPosition == "right") {
			$('#characterContainerNew').css({"top":"35%", "left":"60%", "right":"0%", "bottom":"0%"});
			console.log(newPosition);
		}
		else if (newPosition == "centre") {
			$('#characterContainerNew').css({"top":"30%", "left":"25%", "right":"0%", "bottom":"0%"});
			console.log(newPosition);
		}
		else if (newPosition == "top_left") {
			$('#characterContainerNew').css({"top":"2%", "left":"-15%", "right":"0%", "bottom":"0%"});
			console.log(newPosition);
		}
		else if (newPosition == "top_right") {
			$('#characterContainerNew').css({"top":"2%", "left":"60%", "right":"0%", "bottom":"0%"});
			console.log(newPosition);
		}
		else if (newPosition == "bottom_left") {
			$('#characterContainerNew').css({"top":"60%", "left":"-15%", "right":"0%", "bottom":"0%"});
			console.log(newPosition);
		}
		else if (newPosition == "bottom_right") {
			$('#characterContainerNew').css({"top":"60%", "left":"60%", "right":"0%", "bottom":"0%"});
			console.log(newPosition);
		}
	}

	function resetDanceParty(){
		// Reset Background
		$('#characterBoard').css("background-image", "");
		// Reset Character
		$('#characterContainer').css({"width":"300px","height":"300px","display":"inline-block","overflow":"hidden","vertical-align":"middle","position":"relative","top":"35%","left":"30%"});
		$('#characterImage').css({"position":"absolute","background-repeat": "no-repeat"});
		$("#characterImage").attr("src","");

		$('#characterContainerNew').css({"width":"300px","height":"300px","display":"inline-block","overflow":"hidden","vertical-align":"middle","position":"relative","top":"35%","left":"-25%"});
		$('#characterImageNew').css({"position":"absolute","background-repeat": "no-repeat"});
		$("#characterImageNew").attr("src","");
		// Stop Audio
		$('audio').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
		});

	}

	// fucntion moveToInitial(){
	//
	// }
