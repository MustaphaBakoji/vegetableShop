function descendingOrder(n){
  var num = n.toString();
  var numArray = num.split('');
  var sortedNumArray = numArray.sort()
  var reversedSortedNumArray =  sortedNumArray.reverse();
  var final = Number(reversedSortedNumArray.join(''))
  console.log(final)
}

  // [9 2 4 5 1 6 7 3 8]
  //  ^ 

  descendingOrder(4493456894365);