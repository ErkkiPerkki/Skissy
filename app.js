document.addEventListener("DOMContentLoaded", function(){

    // Variables 
    const ColorButton = document.getElementsByClassName("ColorButton")
    const RedButton = document.getElementById("Red")
    const ColorableIcons = document.getElementsByClassName("ColorableIcon")
    const Colors = ["Red", "Green", "Blue"]

    let selectedButton = null;

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
        for (let j=0; j < 3; j++){
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

    function SelectButton(button) {
        DeselectColors()
        button.classList.add("Selected")
        selectedButton = button
        ChangeIconColors()
    }

    // Set Default Selected Color to Red
    SelectButton(RedButton)

    // Connect onclick Event to Function
    for (let i = 0; i < ColorButton.length; i++) {
        ColorButton[i].onclick = function(){
            SelectButton(ColorButton[i])
        }
    }

})