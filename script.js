const mycanvas =  document.getElementById("mycanvas")
const main  = document.querySelector("main")

const context = mycanvas.getContext("2d")

var img = new Image()


const filereader = new FileReader()

function uploadImage(e){
    filereader.readAsDataURL(e.target.files[0])
    // console.log(e.target.files[0])
    filereader.onload = () =>{
        img.src = filereader.result;
        img.onload = () => {
            mycanvas.width = img.width;
            mycanvas.height = img.height;
            context.drawImage(img,0,0)
        }
    }
}

function grayscaleEffect () {
    const imagedata = context.getImageData(0,0, mycanvas.width, mycanvas.height)
    const data  = imagedata.data
// loop through the data to extract the different pixels

    for( let i= 0; i < data.length; i += 4){
        const grey = (data[i] + data[i+1] + data[i+2]) / 3
       data[i] = grey
       data[i+1] = grey
       data[i+2] = grey

    }
    context.putImageData(imagedata, 0,0)
}

function sepiaEffect () {
    const imagedata = context.getImageData(0,0, mycanvas.width, mycanvas.height)
    const data  = imagedata.data
// loop through the data to extract the different pixels

    for( let i= 0; i < data.length; i += 4){
        
       data[i] = 0.393*data[i] + 0.769 *data[i+1]  + 0.189 *data[i+2] 
       data[i+1] =  0.349 *data[i]  + 0.686 *data[i+1]  + 0.168*data[i+2] 
       data[i+1] =  0.349 *data[i]  + 0.686 *data[i+1]  + 0.168*data[i+2] 
       data[i+2] = 0.272 *data[i] + 0.534 *data[i+1]  + 0.131*data[i+2] 

    }
    context.putImageData(imagedata, 0,0)
}

function invertedEffect () {
    const imagedata = context.getImageData(0,0, mycanvas.width, mycanvas.height)
    const data  = imagedata.data
// loop through the data to extract the different pixels

    for( let i= 0; i < data.length; i += 4){
       
       data[i] = 255 - data[i]
       data[i+1] = 255 - data[i+1]
       data[i+2] = 255 - data[i+2]

    }
    context.putImageData(imagedata, 0,0)
}

function rbgEffect () {
    const imagedata = context.getImageData(0,0, mycanvas.width, mycanvas.height)
    const data  = imagedata.data
// loop through the data to extract the different pixels

    for( let i= 0; i < data.length; i += 4){
       const green = data[i+1]
       data[i] 
       data[i+1] = data[i+2]
       data[i+2] = green

    }
    context.putImageData(imagedata, 0,0)
}

function bgrEffect () {
    const imagedata = context.getImageData(0,0, mycanvas.width, mycanvas.height)
    const data  = imagedata.data
// loop through the data to extract the different pixels

    for( let i= 0; i < data.length; i += 4){
       const red = data[i]
       data[i] = data[i+2]
       data[i+1]
       data[i+2] = red

    }
    context.putImageData(imagedata, 0,0)
}

function grbEffect () {
    const imagedata = context.getImageData(0,0, mycanvas.width, mycanvas.height)
    const data  = imagedata.data
// loop through the data to extract the different pixels

    for( let i= 0; i < data.length; i += 4){
       const red = data[i]
       data[i] = data[i+1]
       data[i+1]= red
       data[i+2]

    }
    context.putImageData(imagedata, 0,0)
}

function clear (){
    context.drawImage(img, 0,0)

}

function download() {
    var imageURI = mycanvas.toDataURL()
    var tempLink = document.createElement("a")
    tempLink.href = imageURI
    //  initiate download
    tempLink.download = "image.png"
    tempLink.click()
    // document.body.removeChild(tempLink)

}
function deleteImage(){
    var img = context.createImageData(mycanvas.width, mycanvas.height);
    for (var i = img.data.length; --i >= 0; )
        img.data[i] = 0;
        context.putImageData(img, 0, 0);
        mycanvas.height=150;
}

document.querySelectorAll("button")[0].addEventListener("click", grayscaleEffect)
document.querySelectorAll("button")[1].addEventListener("click", sepiaEffect)
document.querySelectorAll("button")[2].addEventListener("click", invertedEffect)
document.querySelectorAll("button")[3].addEventListener("click", rbgEffect)
document.querySelectorAll("button")[4].addEventListener("click", bgrEffect)
document.querySelectorAll("button")[5].addEventListener("click", grbEffect)

document.querySelector("#clear").addEventListener("click", clear)
document.querySelector("#download").addEventListener("click", download)

document.getElementById("uploader").addEventListener("change", uploadImage)
document.getElementById("remove").addEventListener("click", deleteImage)
