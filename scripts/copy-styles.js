const ncp = require('ncp').ncp;

ncp.limit = 1;

let destinationPath = 'dist/mmm-toast/lib/styles';

if (process.argv[2] === 'demo') {
  destinationPath = 'src/assets'
}

ncp('projects/mmm-toast/src/lib/styles', destinationPath, (err) => {
  if (err) return console.log(err);
  console.log(`******************* styles successfully copied to ${destinationPath} folder *******************`);
})
