package main

import (
	"log"

	db "./db"
)

func main() {
	_, databaseErr := db.Init("./db/scoreboard.db")
	if databaseErr != nil {
		log.Println(databaseErr)
	}
}
