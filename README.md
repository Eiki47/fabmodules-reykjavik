# Fab Modules Project

Fab Modules is a browser-based CAM system, which allows to generate toolpaths for and control
lasercutters, CNC-mills and waterjets commonly found in [fablabs](https://www.fablabs.io/).

Fab Modules Reykjavik is a more user-friendly interface based on the original fabmodules website, only for the MDX-20.

![Milling circuit boards](./screenshot-pcbmilling.png)

## Supported machines

* Roland MDX-20.


## Installing

Download Fabmodules using git

    git clone https://github.com/Eiki47/fabmodules-reykjavik

Install the node.js dependencies

    npm install

## Using

Start the server which lets webinterface communicate with hardware

    npm start

You can now open Fabmodules web interface at http://localhost:12345/index.html

See [the wiki](https://github.com/FabModules/fabmodules-html5/wiki) for further instructions.

## License

Open source, [custom MIT-like license](./LICENSE.md)
