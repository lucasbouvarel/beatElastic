package beater

import (
	"fmt"
	"time"
	"os"
	// "encoding/json"

	"github.com/elastic/beats/libbeat/beat"
	"github.com/elastic/beats/libbeat/common"
	"github.com/elastic/beats/libbeat/logp"

	"github.com/lucasbouvarel/tinybeat/config"
)

type Statuses struct {
	Users []Status `json:"users"`
}

type Status struct {
	Created_at string `json:"name"`
}

// tinybeat configuration.
type tinybeat struct {
	done   chan struct{}
	config config.Config
	client beat.Client
}

// New creates an instance of tinybeat.
func New(b *beat.Beat, cfg *common.Config) (beat.Beater, error) {
	c := config.DefaultConfig
	if err := cfg.Unpack(&c); err != nil {
		return nil, fmt.Errorf("Error reading config file: %v", err)
	}

	bt := &tinybeat{
		done:   make(chan struct{}),
		config: c,
	}
	return bt, nil
}

// Run starts tinybeat.
func (bt *tinybeat) Run(b *beat.Beat) error {
	logp.Info("tinybeat is running! Hit CTRL-C to stop it.")

	var err error
	bt.client, err = b.Publisher.Connect()
	if err != nil {
		return err
	}

	ticker := time.NewTicker(bt.config.Period)
	counter := 1
	for {
		select {
		case <-bt.done:
			return nil
		case <-ticker.C:
		}
		// APPELER SCRIPT JS
		// Open our jsonFile
		jsonFile, err := os.Open("response.json")
		// if we os.Open returns an error then handle it
		if err != nil {
		    fmt.Println(err)
		}
		fmt.Println("Successfully Opened users.json")
		fmt.Println(jsonFile)
		// defer the closing of our jsonFile so that we can parse it later on
		defer jsonFile.Close()
		event := beat.Event{
			Timestamp: time.Now(),
			Fields: common.MapStr{
				"type":    b.Info.Name,
				"users": [5]string{"lucasbouvarel","donaldtrump","twitterprogrammer","pierreleripoll","flesueurlol"},
				"counter": counter,
			},
		}
		bt.client.Publish(event)
		logp.Info("Event sent")
		counter++
	}
}

// Stop stops tinybeat.
func (bt *tinybeat) Stop() {
	bt.client.Close()
	close(bt.done)
}
