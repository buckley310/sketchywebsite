// globals
var canvas;
var canvas_ctx;
var win_height;
var win_width;

// resize the canvas to match the window
function setsize() {
    win_width = window.innerWidth;
    win_height = window.innerHeight;
    canvas.width = win_width;
    canvas.height = win_height;
}

// grab a 100-pixel-tall horizontal strip and move it left or right by 50px
function effect_tearing() {
    var pos_y = parseInt(Math.random() * (win_height - 100));

    canvas_ctx.drawImage(
        canvas,
        0,
        pos_y,
        win_width,
        100,
        (parseInt(Math.random() * 2) * 100) - 50, // (+/-)50
        pos_y,
        win_width,
        100);
}

// add a random image to the canvas
function add_image() {
    var rnd_pic = document.getElementById('pic' + parseInt(Math.random() * 18));

    canvas_ctx.drawImage(
        rnd_pic,
        parseInt(Math.random() * (win_width - rnd_pic.width)),
        parseInt(Math.random() * (win_height - rnd_pic.height)));
}

// rewind and play one of the audio elements
function do_sound() {
    var rnd_snd = document.getElementById('snd' + parseInt(Math.random() * 7));
    rnd_snd.currentTime = 0;
    rnd_snd.play();
}

// temporarily bump the whole screen to one side
function screen_shake() {
    canvas.style.left = Math.random() < 0.5 ? "-50px" : "50px";
    setTimeout(function () {
        canvas.style.left = '0px';
    }, 50);
}

// draw vertical lines of "dead pixels" (currently unused)
function vertline() {

    var base_x = parseInt(Math.random() * (win_width - 10));

    for (let i = 0; i < 10; i++) {
        canvas_ctx.strokeStyle = 'rgb(' +
            parseInt(Math.random() * 255) + ',' +
            parseInt(Math.random() * 255) + ',' +
            parseInt(Math.random() * 255) + ')';

        let line_x = base_x + i + Math.random() * 50 - 25;

        canvas_ctx.beginPath();
        canvas_ctx.moveTo(line_x + 0.5, 0.5);
        canvas_ctx.lineTo(line_x + 0.5, 0.5 + win_height);
        canvas_ctx.stroke();
    }
}

// main loop (on interval)
function mainloop() {
    if (document.hidden === true)
        return;  // Be courteous

    if (Math.random() < 0.1)
        effect_tearing();

    if (Math.random() < 0.05)
        screen_shake();

    add_image();

    // Chrome is mean and usually doesn't let us autoplay sound anymore :(
    do_sound();
    // Fun fact, trying to use HTML5 audio causes the do_sound function
    // to crash when run in IE in "N" editions of windows.
}

// initialize all the things
function sw_init() {
    document.getElementById('loading').style = 'display:none;';
    canvas = document.getElementById('canvas');
    canvas_ctx = canvas.getContext("2d");
    window.addEventListener('resize', setsize);
    setsize();
    window.setInterval(mainloop, 100);
}

window.addEventListener('load', sw_init);