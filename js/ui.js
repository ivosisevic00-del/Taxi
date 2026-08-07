function toast(message){

    console.log(message);

}

function openModal(id){

    document.getElementById(id).style.display="flex";

}

function closeModal(id){

    document.getElementById(id).style.display="none";

}


window.onclick=function(e){

    document.querySelectorAll(".modal").forEach(modal=>{

        if(e.target===modal){

            modal.style.display="none";

        }

    });

}