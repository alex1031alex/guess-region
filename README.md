# Guess-region

Игра-угадайка в которой нужно правильно указать на карте районы Смоленской 
области. Представляет собой одностраничное приложение, написанное при помощи 
библиотеки React.

## Правила игры

Объекты найденные с первого раза окрашиваются в зеленый цвет, со второго 
раза - в желтый, с третьего раза - в оранжевый. Если район не был угадан с 
трех попыток, он выделяется мигающим малиновым цветом. Для продолжения нужно 
кликнуть по нему, после чего мигающий малиновый цвет сменится красным и 
появится следующий вопрос. За каждый правильно угаданный район начисляются 
очки в виде процентов. За угадывание с первого раза начисляется 4%, со 
второго - 3%, с третьего - 1%. В Смоленской области 25 районов, поэтому если 
все угадать с первого раза итоговый результат будет максимальным: 100%.

## Практический и философский смысл данной игры

Его нет. Игра создана в учебных целях.

## История создания

В 2018 году я увидел тесты по географии братьев Мотовских и захотел 
сделать что-то подобное. В тестах угадывали страны мира и регионы России, 
поэтому чтобы не повторяться я решил делать аналогичный тест по районам 
Смоленской области. Первоначальный вариант игры был закончен в начале 2019 
года и был написан на HTML, CSS и ванильном JS. Карту я сделал с помощью SVG в 
графическом редакторе. Через несколько лет я решил перевести игру на React. 
В процессе выявилось немало интересных проблем, например, для высплывающих 
подсказок никак не хотели применяться стили, пока я не поместил их в тэг 
style прямо в index.html, что, возможно, также не является идеальным 
решением. Поиск решения для этих проблем помог мне улучшить понимание работы 
библиотеки React и языка в целом.  