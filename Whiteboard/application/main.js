'use strict';
(function(){
    var socket = io();
    var canvas = document.getElementsByClassName('whiteboard')[0];
    console.log(canvas);
    var context = canvas.getContext('2d');
    var drawing = false;
    canvas.addEventListener('mousedown',mouseDown,false);
    canvas.addEventListener('mouseup',mouseUp,false);
    canvas.addEventListener('mouseout',mouseUp,false);
    canvas.addEventListener('mousemove',mouseMove,false);
    var original = {};
    canvas.addEventListener('touchstart', mouseDown,false);
    canvas.addEventListener('touchend',mouseUp,false);
    canvas.addEventListener('touchcancel',mouseUp,false);
    canvas.addEventListener('touchmove',mouseMove,false);

    window.addEventListener('resize',resize,false);
    resize();

    socket.on('drawing',drawEvent);
    function mouseMove(e){
        if(drawing){
        var currentX = e.clientX||e.touches[0].clientX;
        var currentY = e.clientY||e.touches[0].clientY;
        draw(original.x,original.y,currentX,currentY,true);
        original.x = currentX;
        original.y = currentY;
        }
        return;
    }
    function mouseDown(e){
        console.log("Drawing");
        drawing = true;
        original.x = e.clientX||e.touches[0].clientX;
        original.y = e.clientY||e.touches[0].clientY;
      }
    function drawEvent(data){
        var width = canvas.width;
        var height = canvas.height;
        draw(data.x0*width, data.y0 * height,
                data.x1 * width, data.y1 * height, false);
    }
    function mouseUp(e){
        if(!drawing)
            return;
        drawing = false;
        draw(original.x,original.y,e.clientX||e.touches[0].clientX,e.clientY||e.touches[0].clientY,
            true);
    };
    function draw(x0,y0,x1,y1,emit){
        context.beginPath();
        context.moveTo(x0,y0);
        context.lineTo(x1,y1);
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
        if(emit)
        {
            var width = canvas.width;
            var height = canvas.height;
            socket.emit('drawing',{
                x0: x0/width,
                y0: y0/height,
                x1: x1/width,  
                y1: y1/height
            });
        }
    };
    function resize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
}) ();