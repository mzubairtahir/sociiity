export default function otherThanEvent({onElement, onClickFunction}){

    window.addEventListener("click", (e)=>{
        if(e.target===onElement){
            onClickFunction()

        }
    })


}