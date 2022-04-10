const CMD = require('child_process');
const config = require('./config.json')

const args = process.argv.slice(2);
const target = args[0];


const removeBuildCommand = `rm -rf ./output/*`

const execute = (command) => {
  return new Promise((resolve, reject) => {
    CMD.exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      else if (stderr) reject(stderr);
      else resolve(stdout);
    })
  })
}

const run = () => {
  if (!target) return console.error('no target file supplied');

  const targetConfig = config.project[target];
  if (!targetConfig) return console.error('project config missing');

  const files = `${targetConfig.path}/${targetConfig.filesToCompile.join(` ${targetConfig.path}/`)}`;
  const buildCommand = `g++ ${files} -I ${config.include} -o ./output/${targetConfig.output} ${config.links.join(' ')} -std=c++11`;

  execute(removeBuildCommand)
    .then(execute(buildCommand))
    .then(() => console.log('Build Complete'));
}

run();

// Template command
// "g++ sfml.cpp -I /usr/local/Cellar/sfml/2.5.1_1/include -o prog -L/usr/local/Cellar/sfml/2.5.1_1/lib -lsfml-graphics -lsfml-window -lsfml-system"