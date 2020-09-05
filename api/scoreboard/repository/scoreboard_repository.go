package repository

import (
	scoreboard ".."
	model "../../model"

	"database/sql"

	// Impl go-sqlite3
	_ "github.com/mattn/go-sqlite3"
)

type scoreboardRepository struct {
	db *sql.DB
}

// NewScoreboardRepository returns an interface with Get and Post functions
func NewScoreboardRepository(db *sql.DB) scoreboard.Repository {
	return &scoreboardRepository{db: db}
}

func (sr *scoreboardRepository) Get() ([]*model.Player, error) {
	var allPlayer []*model.Player
	queryRows, queryRowsErr := sr.db.Query("SELECT name, score, time FROM scoreboard LIMIT $1", 3)
	if queryRowsErr != nil {
		return nil, queryRowsErr
	}
	defer queryRows.Close()
	for queryRows.Next() {
		player := &model.Player{}
		if errScan := queryRows.Scan(&player.Name, &player.Score, &player.Time); errScan != nil {
			return nil, errScan
		}
		allPlayer = append(allPlayer, player)
	}
	if queryRows.Err() != nil {
		return nil, queryRows.Err()
	}
	return allPlayer, nil
}

func (sr *scoreboardRepository) Post(player *model.Player) error {
	insertRow, insertRowErr := sr.db.Prepare("INSERT INTO scoreboard (name, score, time) VALUES (?, ?, ?)")
	if insertRowErr != nil {
		return insertRowErr
	}
	if _, execRowErr := insertRow.Exec(player.Name, player.Score, player.Time); execRowErr != nil {
		return execRowErr
	}
	return nil
}

func (sr *scoreboardRepository) Delete(player *model.Player) error {
	checkRowExist := sr.db.QueryRow("SELECT name FROM scoreboard WHERE name = ?", player.Name).Scan(&player.Name)
	if checkRowExist != nil {
		return checkRowExist
	}
	deleteRow, deleteRowErr := sr.db.Prepare("DELETE FROM scoreboard WHERE name = ?")
	if deleteRowErr != nil {
		return deleteRowErr
	}
	if _, execRowErr := deleteRow.Exec(player.Name); execRowErr != nil {
		return execRowErr
	}
	return nil
}
