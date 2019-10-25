package main

import (
	"os"

	"github.com/lucasbouvarel/tinybeat/cmd"

	_ "github.com/lucasbouvarel/tinybeat/include"
)

func main() {
	if err := cmd.RootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}
