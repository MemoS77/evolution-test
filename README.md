# Описание

Насыщение - превышение энергии в клетке. Каждый ход энергия всех клеток кроме одиночных семечек уменьшается на константу.

- зеленая (аналог листьев) - бесконечно получает энергию от освещения. При насыщении делится и становится белой. Отдает энергию вообще всем кроме синих своег оклана и чужим красным.

- белая (аналог семечка, или стволовой) - делится, при наборе энергии деления. и может превратится новой клеткой в другую. С чужими белыми - мгновенно скрещивается. Отдает энергию чужим красным. Отдает энергию всем своим, у кого меньше, кроме синих.

- красная (атакующая) - взаимное уничтожение с чужими красными и синими. При насыщении делится и становится синей

- синяя (броня) - без днк, не потребляет энергию и не влияет на остальные клетки.

У каждой клетки 3+1 генов, работающие с нейросетью (одинаковое число входов и 1 выход).

При скрещивании у новой клетки - набор генов берется от предков случайным образом.
В днк гена возможны мутации.
С очень низкой вероятностью гены могут перепутаться местами.

## Нейросеть гена

В генах 1-3 указывает что делать для каждого из 4 типов клеток.

- 0 - Отталкивать
- 1 - Притягивать

5 - ген - друга нейросеть, указывает в какую из 4 клеток превратится при делении

## Входы нейросети содержат значение от 0 до 1:

### Свои параметры

- 0 - энергия
- 1 - остаток индикаторного вещества

### Параметры анализируемой клетки

- 2 - энергия
- 3 - остаток индикаторного вещества
- 4 - 0-враг 1-свой
- 5-8 тип бота (1 для одного из нейронов, 0 для остальных)

### Другие параметры

- 9 - расстояние между клетками
- 10 - освещенность
- 11 - случайное число от 0 до 1

## Нейрон превращения. 4 выхода. (в какую клетку превратится). Входы:

- 0 - энергия
- 1 - остаток индикаторного вещества
- 2 - освещенность
- 3 - случайное число
- 4-7 - касается ли враг
