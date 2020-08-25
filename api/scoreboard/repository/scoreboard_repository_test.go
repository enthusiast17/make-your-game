package repository

import (
	"testing"

	db "../../db"
	model "../../model"
	testit "github.com/enthusiast17/testit"
)

func TestRepository(t *testing.T) {
	database, databaseErr := db.Open("../../db/scoreboard.db")
	testit.Equal(t, databaseErr, nil)

	defer database.Close()
	scoreboardRepository := NewScoreboardRepository(database)
	player1 := &model.Player{Name: "enthusiast17", Score: 100, Time: "2:20"}
	player2 := &model.Player{Name: "enthusiast", Score: 1500, Time: "5:20"}
	player3 := &model.Player{Name: "enthusiast123", Score: 500, Time: "18:20"}

	postPlayer1Err := scoreboardRepository.Post(player1)
	testit.Equal(t, postPlayer1Err, nil)

	postPlayer2Err := scoreboardRepository.Post(player2)
	testit.Equal(t, postPlayer2Err, nil)

	allPlayer, getErr := scoreboardRepository.Get()
	testit.Equal(t, getErr, nil)
	testit.Equal(t, len(allPlayer), 2)
	testit.Equal(t, *allPlayer[0], *player1)
	testit.Equal(t, *allPlayer[1], *player2)

	deletePlayer3Err := scoreboardRepository.Delete(player3)
	testit.NotEqual(t, deletePlayer3Err, nil)

	deletePlayer1Err := scoreboardRepository.Delete(player1)
	testit.Equal(t, deletePlayer1Err, nil)

	deletePlayer2Err := scoreboardRepository.Delete(player2)
	testit.Equal(t, deletePlayer2Err, nil)
}
