function rakeGarden(garden) {
    // TODO: Program Me
    var gardenItems = garden.split(' ');
    for (let i = 0; i < gardenItems.length; i++) {
        if (gardenItems[i]!== 'gravel' && gardenItems[i]!== 'rock') {
            gardenItems[i]= 'gravel';
        }
        continue;
        
    }
    var rakedGarden = gardenItems.join(' ');
    return rakedGarden;
  }

console.log(rakeGarden('gravel gravel gravel gravel gravel gravel gravel gravel gravel rock slug ant gravel gravel snail rock gravel gravel gravel gravel gravel gravel gravel slug gravel ant gravel gravel gravel gravel rock slug gravel gravel gravel gravel gravel snail gravel gravel rock gravel snail slug gravel gravel spider gravel gravel gravel gravel gravel gravel gravel gravel moss gravel gravel gravel snail gravel gravel gravel ant gravel gravel moss gravel gravel gravel gravel snail gravel gravel gravel gravel slug gravel rock gravel gravel rock gravel gravel gravel gravel snail gravel gravel rock gravel gravel gravel gravel gravel spider gravel rock gravel gravel'))