
function lines(line=0, lineType=""){
    for(let i = 0; i < line; i++ ){
        process.stdout.write(lineType);
    }
    console.log();
}

function space(){
    console.log("");
}

module.exports = { lines, space };