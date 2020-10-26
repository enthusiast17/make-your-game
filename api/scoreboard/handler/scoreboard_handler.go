package handler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	model "../../model"
)

// Get handles GAT-request of scoreboard
func Get(w http.ResponseWriter, r *http.Request) {

	resp, errReadFile := ioutil.ReadFile("scoreboard/records.json")
	if errReadFile != nil {
		fmt.Println("read file: ", errReadFile)
	}

	n, err := w.Write(resp)
	if err != nil {
		fmt.Println(n, err)
	}
}

// Post handles POST-request of scoreboard
func Post(w http.ResponseWriter, r *http.Request) {

	ct := r.Header.Get("content-type")
	fmt.Println(r.Method, ct)
	if ct != "application/json" {
		w.WriteHeader(http.StatusUnsupportedMediaType)
		w.Write([]byte(fmt.Sprintf("content-type: 'application/json' != '%s'", ct)))
		fmt.Println("Unsupport media")
		return
	}

	newRecord, errRead := ioutil.ReadAll(r.Body)
	newRecord = append(newRecord, ' ')
	fmt.Println(errRead, string(newRecord))

	var newPlayer model.Player
	var records []model.Player

	err := json.Unmarshal(newRecord, &newPlayer)
	if err != nil {
		fmt.Println("New: ", err)
		return
	}

	content, err := ioutil.ReadFile("scoreboard/records.json")
	if err == nil {
		err = json.Unmarshal(content, &records)
		if err != nil {
			fmt.Println("Existing: ", err)
			return
		}
	}

	records = append(records, newPlayer)

	mRecords, err := json.Marshal(records)
	if err != nil {
		fmt.Println("Marshal: ", err)
		return
	}
	ioutil.WriteFile("scoreboard/records.json", mRecords, 0777)
}
