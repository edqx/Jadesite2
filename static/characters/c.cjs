const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const [ ,, original, crop, idle_sheet ] = process.argv;

const files = fs.readdirSync(process.cwd());
const sheets = [ original ];// files.filter(f => f.endsWith("_sheet.png"));

for (const file of sheets) {
    execSync(`convert -dispose previous ${file} -crop ${crop} +adjoin +repage -adjoin -loop 0 -delay 50 ${path.basename(file)}.gif`);
    if (idle_sheet)
        execSync(`convert -dispose previous ${idle_sheet} -crop ${crop} -dispose previous ${file} -crop ${crop} -dispose previous ${idle_sheet} -crop ${crop} +adjoin +repage -adjoin -loop 0 -delay 50 ${path.basename(file)}.gif`);
}