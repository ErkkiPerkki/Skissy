document.addEventListener("DOMContentLoaded", function(){
    // Initialization
    window.SharedSpace = {}

    // Variables 
    const ColorButtons = document.getElementsByClassName("ColorButton")
    const StrokeSizeButtons = document.getElementsByClassName("StrokeButton")
    const ColorableIcons = document.getElementsByClassName("ColorableIcon")
    const Tools = document.getElementsByClassName("Tool")
    const Colors = ["Red", "Green", "Blue"]
    var shared = window.SharedSpace
    
    // Functions
    function DeselectColors() {
        for (let i = 0; i < ColorButtons.length; i++){
            var isSelected = ColorButtons[i].classList.contains("ColorSelected")

            if (isSelected){
                ColorButtons[i].classList.remove("ColorSelected")
            }
        }
    }

    function ClearIconColors(icon) {
        for (let j=0; j < Colors.length; j++){
            icon.classList.remove(`${Colors[j]}Filter`)
        }
    }

    function ChangeIconColors() {
        for (let i=0; i < ColorableIcons.length; i++){
            ClearIconColors(ColorableIcons[i])
            ColorableIcons[i].classList.add(`${shared.currentColor}Filter`)
        }
    } 

    function SelectColor(colorButton) {
        DeselectColors()
        colorButton.classList.add("ColorSelected")
        shared.currentColor = colorButton.id
        ChangeIconColors()
    }

    function DeselectStrokeSizes(){
        for (let i = 0; i < StrokeSizeButtons.length; i++){
            var isSelected = StrokeSizeButtons[i].classList.contains("StrokeSelected")

            if (isSelected){
                StrokeSizeButtons[i].classList.remove("StrokeSelected")
            }
        }
    }

    function SelectStrokeSize(strokeSizeButton){
        DeselectStrokeSizes()
        strokeSizeButton.classList.add("StrokeSelected")
        shared.currentStrokeSize = strokeSizeButton.id
    }

    function DeselectTools(){
        for (let i=0; i < Tools.length; i++){
            Tools[i].classList.remove("ToolSelected")
        }
    }

    function SelectTool(tool){
        DeselectTools()
        tool.classList.add("ToolSelected")
        shared.toolSelected = tool
    }

    // Set Default Button States
    SelectColor(document.getElementById("Red"))
    SelectStrokeSize(document.getElementById("Medium"))
    SelectTool(document.getElementById("BrushTool"))

    // Connect onclick Event to Function
    for (let i = 0; i < ColorButtons.length; i++) {
        ColorButtons[i].onclick = function(){
            SelectColor(ColorButtons[i])
        }
    }

    for (let i = 0; i < StrokeSizeButtons.length; i++){
        StrokeSizeButtons[i].onclick = function(){
            SelectStrokeSize(StrokeSizeButtons[i])
        }
    }

    for (let i = 0; i < Tools.length; i++){
        Tools[i].onclick = function(){
            SelectTool(Tools[i])
        }
    }
})