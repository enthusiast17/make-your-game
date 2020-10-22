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
	// internalErrHandler := func(w http.ResponseWriter, err error) {
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	w.Write([]byte(fmt.Sprintf("Error: %s", err.Error())))
	// }

	resp, errReadFile := ioutil.ReadFile("records.txt")
	// if errReadFile != nil {
	fmt.Println("read file: ", errReadFile)
	// }

	respJSON := strings.Replace("["+strings.TrimSpace(string(resp))+"]", " ", ",", -1)

	resp = []byte(respJSON)

	n, err := w.Write(resp)
	// if err != nil {
	fmt.Println(n, err)
	// }
	// players, errGet := sh.scoreboardRepository.Get()
	// if errGet != nil {
	// 	internalErrHandler(w, errGet)
	// 	return
	// }
	// jsonPlayers, jsonPlayersErr := json.Marshal(players)
	// if jsonPlayersErr != nil {
	// 	internalErrHandler(w, jsonPlayersErr)
	// 	return
	// }
	// w.Write(jsonPlayers)
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

	// dec := json.NewDecoder(r.Body)
	// dec.DisallowUnknownFields()
	// var player model.Player
	// errDec := dec.Decode(&player)
	// // fmt.Println(player)
	// if errDec != nil && errDec != io.EOF {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	w.Write([]byte(fmt.Sprintf("Error: %s", errDec.Error())))
	// 	fmt.Println("decode: ", errDec)
	// 	return
	// }

	// reader := dec.Buffered()

	newRecord, errRead := ioutil.ReadAll(r.Body)
	// var newRecord []byte
	// n, errRead := reader.Read(newRecord)
	newRecord = append(newRecord, ' ')
	fmt.Println(errRead, string(newRecord))

	file, errOpenFile := os.OpenFile("records.txt", os.O_APPEND|os.O_WRONLY, 0777)
	if errOpenFile != nil {
		fmt.Println(errOpenFile)
	}
	file.Write(newRecord)
	defer file.Close()
}
