document.addEventListener("DOMContentLoaded", function(){

    // Variables 
    const ColorButton = document.getElementsByClassName("ColorButton")
    const RedButton = document.getElementById("Red")
    const ColorableIcons = document.getElementsByClassName("ColorableIcon")
    const Tools = document.getElementsByClassName("Tool")
    const Colors = ["Red", "Green", "Blue"]
    let selectedButton = null;
    let selectedTool = null;

    // Functions
    function DeselectColors() {
        for (let i = 0; i < ColorButton.length; i++){
            var isSelected = ColorButton[i].classList.contains("Selected")

            if (isSelected){
                ColorButton[i].classList.remove("Selected")
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
            console.log(ColorableIcons[i])
            ClearIconColors(ColorableIcons[i])
            ColorableIcons[i].classList.add(`${selectedButton.id}Filter`)
        }
    } 

    function SelectColor(colorButton) {
        DeselectColors()
        colorButton.classList.add("Selected")
        selectedButton = colorButton
        ChangeIconColors()
    }

    function DeselectTools(){
        for (let i=0; i < Tools.length; i++){
            Tools[i].classList.remove("ToolSelected")
        }
    }

    function SelectTool(tool){
        DeselectTools()
        tool.classList.add("ToolSelected")
        selectedTool = tool
    }

    // Set Default Selected Color to Red
    SelectColor(RedButton)

    // Connect onclick Event to Function
    for (let i = 0; i < ColorButton.length; i++) {
        ColorButton[i].onclick = function(){
            SelectColor(ColorButton[i])
        }
    }

    for (let i=0; i < Tools.length; i++){
        Tools[i].onclick = function(){
            SelectTool(Tools[i])
            console.log(selectedTool)
        }
    }

})