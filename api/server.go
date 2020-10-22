package main

import (
	"fmt"
	"log"
	"net/http"

	db "./db"

	scoreboard "./scoreboard"
	handler "./scoreboard/handler"
	repository "./scoreboard/repository"
)

func router(scoreboardHandler scoreboard.Handler, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
	fmt.Println(r, r.Method, r.Referer(), r.Host)
	switch r.Method {
	case "GET":
		scoreboardHandler.Get(w, r)
	case "POST":
		scoreboardHandler.Post(w, r)
	case "OPTIONS":
		if r.Referer()[7:len(r.Referer())-5] == r.Host[:len(r.Host)-4] {
			w.WriteHeader(http.StatusOK)
			return
		}
		fallthrough
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("method not allowed"))
	}
}

func main() {
	database, databaseErr := db.Init("./db/scoreboard.db")
	if databaseErr != nil {
		log.Println(databaseErr)
		return
	}

	scoreboardRepository := repository.NewScoreboardRepository(database)
	scoreboardHandler := handler.NewScoreboardHandler(scoreboardRepository)

	http.HandleFunc("/scoreboard", func(w http.ResponseWriter, r *http.Request) {
		router(scoreboardHandler, w, r)
	})

	fmt.Println("Server is listening... http://localhost:4000/")
	errListenAndServer := http.ListenAndServe(":4000", nil)

	if errListenAndServer != nil {
		log.Println(errListenAndServer)
		return
	}
}
