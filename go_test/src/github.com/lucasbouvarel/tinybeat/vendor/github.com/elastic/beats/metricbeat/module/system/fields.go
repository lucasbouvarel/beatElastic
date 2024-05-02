// Licensed to Elasticsearch B.V. under one or more contributor
// license agreements. See the NOTICE file distributed with
// this work for additional information regarding copyright
// ownership. Elasticsearch B.V. licenses this file to you under
// the Apache License, Version 2.0 (the "License"); you may
// not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

// Code generated by beats/dev-tools/cmd/asset/asset.go - DO NOT EDIT.

package system

import (
	"github.com/elastic/beats/libbeat/asset"
)

func init() {
	if err := asset.SetFields("metricbeat", "system", asset.ModuleFieldsPri, AssetSystem); err != nil {
		panic(err)
	}
}

// AssetSystem returns asset data.
// This is the base64 encoded gzipped contents of ../metricbeat/module/system.
func AssetSystem() string {
	return "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"
}
