

// 8850267112884
function getFetch(){
    let userInput = document.getElementById("barcode").value

    // if (userInput !==12){
    //     alert('Please ensure code is 12 digits')
    //     return;
    // }

    const url = `https://world.openfoodfacts.org/api/v0/product/${userInput}.json`

    fetch(url)
        .then(res => res.json()) //parse response as json
        .then(data => {
            console.log(data)

            if(data.status===1){
                const item = new ProductInfo(data.product)

                item.showInfo()
                item.listIngredients()

            } else {
                alert(`Product ${userInput} not found. Please try another`)
            }

        })
        .catch(err => {
            console.log(err)
        })
}

class ProductInfo {
    constructor(productData) {
        //passing in data.product
        this.name = productData.product_name
        this.ingredients = productData.ingredients
        this.image = productData.image_url
    }

    showInfo() {
        document.getElementById('productImage').src = this.image
        document.getElementById('productName').innerText = this.name
    }

    listIngredients() {
        let tableRef = document.getElementById("ingredientsTable")

        for(let i=1; i< tableRef.rows.length;){
            tableRef.deleteRow(i)
        }

        if (!(this.ingredients ==null)){
            for (const key in this.ingredients) {
                let newRow = tableRef.insertRow(-1)
                let newCell0 = newRow.insertCell(0)
                let newCell1 = newRow.insertCell(1)
                let newCell2 = newRow.insertCell(2)
    
                let newText0 = document.createTextNode(
                    this.ingredients[key].text
                    )
    
                let vegStatus = this.ingredients[key].vegetarian ? this.ingredients[key].vegetarian : "unknown" 
                
                let newText1 = document.createTextNode(vegStatus)
    
                let veganStatus = this.ingredients[key].vegan ? this.ingredients[key].vegan : "unknown" 
                let newText2 = document.createTextNode(veganStatus)
                
                newCell0.appendChild(newText0)
                newCell1.appendChild(newText1)
                newCell2.appendChild(newText2)

                if (vegStatus === 'no') {
                    newCell1.classList.add('non-veg-item')
                } else if (vegStatus === 'unknown' || vegStatus === 'maybe') {
                    newCell1.classList.add('unknown-item')
                }

                if(veganStatus === 'no') {
                    newCell2.classList.add('non-veg-item')
                } else if (veganStatus ==='unknown' || veganStatus === 'maybe') {
                    newCell2.classList.add('unknown-item')
                }
            }
        } 
    }

}