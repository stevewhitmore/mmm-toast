const ncp = require('ncp').ncp;

ncp.limit = 1;

ncp('projects/mmm-toast/src/lib/styles', 'dist/mmm-toast/lib/styles', (err) => {
  if (err) return console.log(err);
  console.log('******************* styles successfully copied to dist folder *******************');
})
