

// 8850267112884
function getFetch(){
    let userInput = document.getElementById("barcode").value

    if (userInput !==12){
        alert('Please ensure code is 12 digits')
        return;
    }

    const url = `https://world.openfoodfacts.org/api/v0/product/${userInput}.json`

    fetch(url)
        .then(res => res.json()) //parse response as json
        .then(data => {
            console.log(data)

            if(data.status===1){

            } else {
                alert(`Product ${userInput} not found. Please try another`)
            }

        })
        .catch(err => {
            console.log(err)
        })
}