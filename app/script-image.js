
function readImg(image) {
    
    // lokal variabel för img
    var img = image;

    // onload så att vi inte börjar bearbeta bilden innan den är inläst
    img.onload = function() {
        
        // variabelreferens till vår <canvas>-tag
        var canvas = document.getElementById("canvas");
        // context, alltså vilken typ av grafik vår canvas ska vara
        var context = canvas.getContext("2d");

        // i det här fallet tar vi helt enkelt bredd och höjd från vår bild
        canvas.height = img.height;
        canvas.width = img.width;

        // ritar upp bilden i canvas
        context.drawImage(img, 0, 0);

        // läser in imgData från canvas med getImageData(x, y, width, height)
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);

        // dumpa ut imgData i konsolen
        console.log(imgData.data[0]);
    }

}

// Vi exekverar funktionen, skickar helt enkelt in vår statiska img-tag
readImg(document.getElementById("staticImg"));
