
function readImg(image) {
    
    var img = image;

    img.onload = function() {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        canvas.height = img.height;
        canvas.width = img.width;

        context.drawImage(img, 0, 0);

        //getImageData(x, y, width, height)
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);

        console.log(imgData);
    }

}

readImg(document.getElementById("staticImg"));
