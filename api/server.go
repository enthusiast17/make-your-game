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

	fmt.Println("Server is listening... http://localhost:5000/")
	errListenAndServer := http.ListenAndServe(":5000", nil)

	if errListenAndServer != nil {
		log.Println(errListenAndServer)
		return
	}
}
