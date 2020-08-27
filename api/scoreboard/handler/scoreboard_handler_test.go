package handler

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	db "../../db"
	model "../../model"
	repository "../repository"
	testit "github.com/enthusiast17/testit"
)

func TestPostHandler(t *testing.T) {
	database, databaseErr := db.Open("../../db/scoreboard.db")
	defer database.Close()
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

		reqPost, errPostReq := http.NewRequest("POST", "/scoreboard", bytes.NewReader(body))
		reqPost.Header.Set("content-type", test.header)
		testit.Equal(t, errPostReq, nil)

		testPostReq := httptest.NewRecorder()
		handlerPostFunc := http.HandlerFunc(scoreboardHandler.Post)
		handlerPostFunc.ServeHTTP(testPostReq, reqPost)

		status := testPostReq.Code

		testit.Equal(t, status, test.expectedStatus)

		reqPost.Body.Close()
	}
}

func TestGetHandler(t *testing.T) {
	database, databaseErr := db.Open("../../db/scoreboard.db")
	defer database.Close()
	testit.Equal(t, databaseErr, nil)

	scoreboardRepository := repository.NewScoreboardRepository(database)
	scoreboardHandler := NewScoreboardHandler(scoreboardRepository)

	tests := []struct {
		header         string
		expectedStatus int
	}{
		{
			header:         "application/json",
			expectedStatus: 200,
		},
		{
			header:         "",
			expectedStatus: 415,
		},
	}

	testPlayer := &model.Player{
		Name:  "enthusiast17",
		Score: 100,
		Time:  "00:50",
	}

	for _, test := range tests {
		reqGet, errGetReq := http.NewRequest("GET", "/scoreboard", nil)
		reqGet.Header.Set("content-type", test.header)
		testit.Equal(t, errGetReq, nil)

		testGetReq := httptest.NewRecorder()
		handlerGetFunc := http.HandlerFunc(scoreboardHandler.Get)
		handlerGetFunc.ServeHTTP(testGetReq, reqGet)

		statusCode := testGetReq.Code
		testit.Equal(t, statusCode, test.expectedStatus)

		if statusCode == 200 {
			var players []*model.Player

			bodyGet, errBodyGet := ioutil.ReadAll(testGetReq.Body)
			testit.Equal(t, errBodyGet, nil)

			errJsonUnmarshal := json.Unmarshal(bodyGet, &players)
			testit.Equal(t, errJsonUnmarshal, nil)
			testit.Equal(t, *players[0], *testPlayer)
		}

	}
	errDelete := scoreboardRepository.Delete(testPlayer)
	testit.Equal(t, errDelete, nil)
}
