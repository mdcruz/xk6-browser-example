# xk6-browser

An example repo to experiment with [xk6-browser](https://github.com/grafana/xk6-browser) as part of my Week of Load Testing.

## Installation (pre-built)

The easiest way to run this project is to make sure you have downloaded a pre-built binary of xk6-browser from their [Github Releases](https://github.com/grafana/xk6-browser/releases) page. 

Once downloaded, just copy the xk6-browser binary to your `$PATH` environment variable in order to run xk6-browser anywhere on your system.

## Installation (build from source)

An alternative way to building xk6-browser is to build it manually. To do this, you need to have the following installed:
- [Go](https://go.dev/dl/)
- [k6 core](https://k6.io/docs/getting-started/installation/)

Once you have the pre-requisites above, perform the following steps:

1. Run the following command to install xk6-browser:

    `go install go.k6.io/xk6/cmd/xk6@latest`

2. Build the xk6-browser binary

    `xk6 build --output xk6-browser --with github.com/grafana/xk6-browser`

3. Run a test

    `npm test`

    This will run an example test from the `examples` folder.

    To run other tests, you can use the following command:

    `xk6-browser run <file-name>`

## Troubleshooting

- `xk6 command not found` - If you see this issue, make sure that the binary is placed in the correct environment variable. 

  I was able to fix this by doing the following:

  `export GOPATH=$HOME/go`

  Then adding $GOPATH/bin to my `$PATH`.

- `xk6-browser no such file or directory` - If you're trying to run xk6-browser on different folder locations, you might encounter this issue. To fix this, just copy the path location of xk6-browser and copy it to `usr/local/bin` which adds it to your `$PATH` environment variable.

