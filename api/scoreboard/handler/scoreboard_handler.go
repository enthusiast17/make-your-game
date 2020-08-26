package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	scoreboard ".."
	model "../../model"
)

type scoreboardHandler struct {
	scoreboardRepository scoreboard.Repository
}

func NewScoreboardHandler(sr scoreboard.Repository) scoreboard.Handler {
	return &scoreboardHandler{scoreboardRepository: sr}
}

func (sh *scoreboardHandler) Get(w http.ResponseWriter, r *http.Request) {

}

func (sh *scoreboardHandler) Post(w http.ResponseWriter, r *http.Request) {
	ct := r.Header.Get("content-type")
	if ct != "application/json" {
		w.WriteHeader(http.StatusUnsupportedMediaType)
		w.Write([]byte(fmt.Sprintf("content-type: 'application/json' != '%s'", ct)))
		return
	}

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	var player model.Player
	if errDec := dec.Decode(&player); errDec != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Sprintf("Error: %s", errDec.Error())))
		return
	}

	if errPost := sh.scoreboardRepository.Post(&player); errPost != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprintf("Error: %s", errPost.Error())))
		return
	}
}
