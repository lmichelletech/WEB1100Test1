const boxes = document.querySelectorAll('.headers')
const rates = document.querySelectorAll('.rates .col')
const refreshTest = document.querySelector('.refreshTest')
const codePrice = document.querySelector('.codePrice')

class Bitcoin {
    constructor() {
        // this.rates = rates
        // this.boxes = boxes
        this.getPrices()
    }

    setPrices(usrStr) {
        //take the data from this.prices and apply them to their appropriate place
        console.log(this.prices)
        console.log(usrStr)
        rates[1].textContent = this.prices[0].rate
        for (var j = 2; j < rates.length; j++) {
            console.log(rates.length)
            rates[j].textContent = this.prices[j].rate
        }


        for (var i = 0; i < this.prices.length; i++) {
            if (usrStr === this.prices[i].code) {
                console.log("this is it:" + usrStr)
                $('.headers:last').append('<div class="col">BTC/' + this.prices[i].code + '</div>')
                $('.rates:last').append('<div class="col">' + this.prices[i].rate + '</div>')
                return
            }
        }
        console.log('The code you entered can\'t be found')
    }

    searchPrices(str) {
        this.setPrices(str)
    }

    getPrices(str) {
        $.ajax({
            url: 'https://bitpay.com/api/rates',
            dataType: 'json',
            success: (data) => {
                this.prices = data
                this.setPrices(this.prices, str)
            },
            error: (error) => {
                console.log("There was an eror getting from the API")
            }
        })
    }

    refresh() {
        this.getPrices()
    }
}

const bitcoin = new Bitcoin()

refreshTest.addEventListener('click', function (e) {
    bitcoin.refresh()
    console.log("refreshed")
})

codePrice.addEventListener('click', function (e) {
    var usr = window.prompt('Enter a code.', '')

    if (usr != null) {
        bitcoin.searchPrices(usr)
    }
    else {
        usr = window.prompt('You did not enter a code. Please enter a code.', '')
    }
})



