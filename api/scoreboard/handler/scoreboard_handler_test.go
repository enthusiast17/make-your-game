package handler

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	db "../../db"
	model "../../model"
	repository "../repository"
	testit "github.com/enthusiast17/testit"
)

func TestHandler(t *testing.T) {
	database, databaseErr := db.Open("../../db/scoreboard.db")
	testit.Equal(t, databaseErr, nil)

	scoreboardRepository := repository.NewScoreboardRepository(database)
	scoreboardHandler := NewScoreboardHandler(scoreboardRepository)

	tests := []struct {
		json           map[string]interface{}
		header         string
		expectedStatus int
	}{
		{
			json: map[string]interface{}{
				"name":  "enthusiast17",
				"score": 100,
				"time":  "00:50",
			},
			header:         "application/json",
			expectedStatus: 200,
		},
		{
			json: map[string]interface{}{
				"name":  "enthusiast17",
				"score": "hundred",
				"time":  "00:50",
			},
			header:         "application/json",
			expectedStatus: 400,
		},
		{
			json: map[string]interface{}{
				"name":  "enthusiast17",
				"score": 100,
				"time":  "00:50",
			},
			header:         "",
			expectedStatus: 415,
		},
	}

	for _, test := range tests {
		body, bodyErr := json.Marshal(test.json)
		testit.Equal(t, bodyErr, nil)

		req, errReq := http.NewRequest("POST", "/scoreboard/", bytes.NewReader(body))
		req.Header.Set("content-type", test.header)
		testit.Equal(t, errReq, nil)

		rr := httptest.NewRecorder()
		handlerFunc := http.HandlerFunc(scoreboardHandler.Post)
		handlerFunc.ServeHTTP(rr, req)

		status := rr.Code

		testit.Equal(t, status, test.expectedStatus)

		if test.expectedStatus == 200 {
			errDelete := scoreboardRepository.Delete(&model.Player{
				Name:  test.json["name"].(string),
				Score: test.json["score"].(int),
				Time:  test.json["time"].(string),
			})
			testit.Equal(t, errDelete, nil)
		}
		req.Body.Close()
	}
}
