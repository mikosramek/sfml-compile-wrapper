# SFML Compile Wrapper

This is a node util project to help compile + run c++ projects on my mac.

I found it a pain to have to type out the whole long command of:
> g++ main.cpp -I /usr/local/Cellar/sfml/2.5.1_1/include -o game -L/usr/local/Cellar/sfml/2.5.1_1/lib -lsfml-graphics -lsfml-window -lsfml-system

everytime I wanted to compile something. So I put this together as an easy way to handle + add to what I'm doing. I suppose it might be easier to configure a build task in vscode, but this gets away from that reliance. Plus I like node : )

## Usage

- Rename `example.config.json` to just `config.json`
- Configure what you want to:
  -  `-I` include
  -  `-L` link
  -  The project name, it's path, which `cpp` files to compile, and what the output file should be named
-  Run `npm run example-project` and that'll give you an output file, that you can run via `./output/game`

I personally have an alias for `yarn start` meaning I can just type `ys project-name` and that means less typing for me

This will also clear the `./output` folder before a build, so if you want to keep files, either disable that line, or take them out of there

## config.json

Here's the config that I'm running, minus my specific project details
```
{
  "include": "/usr/local/Cellar/sfml/2.5.1_1/include",
  "links": [
    "-L/usr/local/Cellar/sfml/2.5.1_1/lib",
    "-lsfml-graphics",
    "-lsfml-window",
    "-lsfml-system"
  ],
  "project": {
    "example": {
      "path": "./",
      "filesToCompile": ["sfml.cpp"],
      "output": "sfml-example"
    }
  }
}
```

### Drawbacks to this approach
- You need to compile like 50 files, so the config file gets bloated
- Relative assets need to be copied over into this folder (or to wherever you run the output), ie, I have a `/assets/fonts/font.ttf` in this project folder