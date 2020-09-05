package db

import (
	"database/sql"

	// Impl go-sqlite3
	_ "github.com/mattn/go-sqlite3"
)

// Init creates scoreboard table and returns a pointed sql.DB struct or returns error
func Init(path string) (*sql.DB, error) {
	database, databaseErr := sql.Open("sqlite3", path)
	if databaseErr != nil {
		return nil, databaseErr
	}
	table, tableErr := database.Prepare("CREATE TABLE IF NOT EXISTS scoreboard (id INTEGER PRIMARY KEY, name TEXT, score INTEGER, time TEXT)")
	if tableErr != nil {
		return nil, tableErr
	}
	table.Exec()
	return database, nil
}

// Open checks if database exists by given path and returns a pointed sql.DB struct or returns error
func Open(path string) (*sql.DB, error) {
	database, databaseErr := sql.Open("sqlite3", path)
	if databaseErr != nil {
		return nil, databaseErr
	}
	if pingErr := database.Ping(); pingErr != nil {
		return nil, pingErr
	}
	return database, nil
}
