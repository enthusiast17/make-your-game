package repository

import (
	scoreboard ".."
	model "../../model"

	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type scoreboardRepository struct {
	db *sql.DB
}

func NewScoreboardRepository(db *sql.DB) scoreboard.Repository {
	return &scoreboardRepository{db: db}
}

func (sr *scoreboardRepository) Get(player *model.Player) error {
	return nil
}

func (sr *scoreboardRepository) Post(player *model.Player) error {
	return nil
}
