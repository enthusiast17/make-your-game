package handler

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	scoreboard ".."
)

type scoreboardHandler struct {
	scoreboardRepository scoreboard.Repository
}

// NewScoreboardHandler returns an interface with Get and Post functions
func NewScoreboardHandler(sr scoreboard.Repository) scoreboard.Handler {
	return &scoreboardHandler{scoreboardRepository: sr}
}

func (sh *scoreboardHandler) Get(w http.ResponseWriter, r *http.Request) {

	resp, errReadFile := ioutil.ReadFile("records.txt")
	if errReadFile != nil {
		fmt.Println("read file: ", errReadFile)
	}

	respJSON := strings.Replace("["+strings.TrimSpace(string(resp))+"]", " ", ",", -1)

	resp = []byte(respJSON)

	n, err := w.Write(resp)
	if err != nil {
		fmt.Println(n, err)
	}
}

func (sh *scoreboardHandler) Post(w http.ResponseWriter, r *http.Request) {

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

	file, errOpenFile := os.OpenFile("records.txt", os.O_APPEND|os.O_WRONLY, 0777)
	if errOpenFile != nil {
		fmt.Println(errOpenFile)
	}
	file.Write(newRecord)
	defer file.Close()
}
