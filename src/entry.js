import "./keybinds";
import "./whiteboard";
import "./main";
import "../assets/css/main.css"

//Set correct width height on mobile browsers
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (isChrome) {
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=0.52, maximum-scale=1" />');
} else {
    $('head').append('<meta name="viewport" content="width=1400" />');
}

if (module.hot) {
    module.hot.accept();
}
