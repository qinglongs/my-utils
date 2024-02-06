import fs from 'fs';

for (const name of fs.readdirSync('packages')) {
   console.log(`packages/${name}/lib/index.js`)
}