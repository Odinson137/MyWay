# mas = [3, 7, 4, 6, 1, 4, 2, 4, 6, 5, 3, 2, 9, 0, 5, 6, 7, 7, 3, 1, 5, 5, 4, 2, 6, 2, 1, 5, 3, 3, 1, 5, 6, 4, 4, 3, 4, 1, 5, 5, 3, 4, 3, 7, 4, 5, 6, 7, 5, 2, 4, 6 ,6, 7, 7, 3, 5, 4, 4, 3]

mas1 = """1
4
3
3
1
0
4
0
4
3
2
0
2
2
3
3
1
0
3
3
3
2
3
3
3
2
5
6
3
2
5
2
3
4
2
3
2
2
6
2
0
1
2
3
6
2
1
4
3
3
1
5
4
3
2
1
1
1
6
3
2
0
2
2
2
3"""

mas = []
for i in mas1.split("\n"):
    mas.append(int(i))
print(mas)
sl = {}
for i in mas:
    if i in sl:
        sl[i].append(i)
    else:
        sl.update({i: [0]})
        

for i, v in sl.items():
    nums = 0
    for a in v:
        nums += 1
    print(str(i) + ": " + str(nums))