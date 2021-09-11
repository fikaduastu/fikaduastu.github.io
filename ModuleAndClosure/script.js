var rudyTimer = (() => {
    return () => {
        timer = null;
        if (timer === null) {
            timer = setInterval(rudy, 1000);
        } else {
            clearInterval(timer);
            timer = null;
        }
    }
})();

function rudy() {
    document.getElementById("output").innerHTML += "Rudy!";
}
window.onload = function(){
    document.getElementById("create").onclick = createNewAccount;
    "use strict";
    var accountCreator = (function () {
        var accountName;
        var amount;
        return {
            createAccount: function (name, amt) {
                accountName = name;
                amount = amt;
                return{
                    name: accountName,
                    balance: amount
                };
            }
        };
    })();

    var accountInfoList = [];
    function createNewAccount() {
        var newAccount = accountCreator.createAccount(document.getElementById("acctname").value, 
                document.getElementById("deposit").value);
        accountInfoList.push(newAccount);
        document.getElementById("text-area").value = "";
        let output = "";
        for (let account of accountInfoList) {
            output += "Account name: "+ account.name + ", Balance: "+account.balance+";\n";
        }
        document.getElementById("text-area").value = output;
    }
    ;
};


