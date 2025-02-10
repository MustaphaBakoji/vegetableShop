function likes(names) {
    var comment;
    var modVenerators = names.filter(venerator => {
        if (venerator!==''){
            return venerator
        }
    });
    if (modVenerators.length==0) {
        comment = 'no one likes this';
        return comment;
    }
    if (modVenerators.length <= 3){
        if (modVenerators.length == 1) {
            comment = `${modVenerators[0]} likes this`;
            return comment;
        }
        if (modVenerators.length <= 2 ) {
            comment = `${modVenerators[0]} and ${modVenerators[1]} like this`;
            return comment;
        }
        comment = `${modVenerators[0]}, ${modVenerators[1]} and ${modVenerators[2]} like this`;
        return comment;
    }
    comment = `${modVenerators[0]}, ${modVenerators[1]} and ${modVenerators.length - 2} others like this`
    return comment;
}

console.log(likes(['muhammad','ahmad', 'dalha', 'waziri']));