var ctx, canvas, h, w;
 
var LastX, LastY;

function Drawing(dx, dy)//функция отрисовки линии
{
    ctx.beginPath();
    ctx.moveTo(LastX, LastY);
    ctx.lineTo(LastX + dx, LastY + dy);
    ctx.closePath();
    ctx.stroke();
    LastX += dx;
    LastY += dy;
}

function Hilbert(dep, dx, dy)//функция , которая  вызывает рисование линий в нужном порядке 
{
    if (dep > 1) Hilbert(dep - 1, dy, dx);
    Drawing(dx, dy);
    if (dep > 1) Hilbert(dep - 1, dx, dy);
    Drawing(dy, dx);
    if (dep > 1) Hilbert(dep - 1, dx, dy);
    Drawing(-dx, -dy);
    if (dep > 1) Hilbert(dep - 1, -dy, -dx);

}

function Click()// функция нажатия на кнопку 
{
    //объявление переменных и начальных параметров 
    var str = document.getElementById("text").value;

    ctx.fillRect(0, 0, w, h);

    var start_x, start_y, start_length, total_length;
    var dep = parseInt(str);


    if (h < w)
    {
        total_length = 0.9 * h;
    }
    else
    {
        total_length = 0.9 * w;
    }


    start_x = (w - total_length) / 2;
    start_y = (h - total_length) / 2;

    start_length = total_length / (Math.pow(2, dep) - 1);


    LastX = start_x;
    LastY = start_y;
    Hilbert(dep, start_length, 0);	//вызов рекурсивной функции Hilbert 

}

window.onload = function(){

    canvas = document.getElementById("paint");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";

};