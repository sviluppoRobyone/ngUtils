export function randomStringV1(length:number){
    return randomSeedOfLength(length);
}

function randomSeed(){
    return Math.random().toString(36).substring(2, 15);
}

function randomSeedOfLength(length:number){
    var s=randomSeed();

    while(s.length<length)
    s+=randomSeed();

   return s.length>length?s.substring(0,length):s;

}