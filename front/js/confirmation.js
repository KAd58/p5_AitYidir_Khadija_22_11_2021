function main(){
    const order = document.createElementById("orderId");
    order.innerText = localStorage.getItem("orderId");

    localStorage.clear();
}
main();