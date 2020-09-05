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
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
	switch r.Method {
	case "GET":
		scoreboardHandler.Get(w, r)
		return
	case "POST":
		scoreboardHandler.Post(w, r)
		return
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("method not allowed"))
		return
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
