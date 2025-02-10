//OBJECTIVE: CHECK IF A STRING IS ALL CAPS
//EXAMPLE:
// "c" -> False
// "C" -> True
// "hello I AM DONALD" -> False
// "HELLO I AM DONALD" -> True
// "ACSKLDFJSgSKLDFJSKLDFJ" -> False
// "ACSKLDFJSGSKLDFJSKLDFJ" -> TruE


String.prototype.isUpperCase = function (){
        return this == this.toUpperCase();
}
console.log('A AAAAGGGG'=='A AAAAGGGG'.toUpperCase())
console.log('D D'.isUpperCase());