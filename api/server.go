package main

import (
	"fmt"
	"log"
	"net/http"

	handler "./scoreboard/handler"
)

func router(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
	fmt.Println(r.Method, r.Referer(), r.Host)
	switch r.Method {
	case "GET":
		handler.Get(w, r)
	case "POST":
		handler.Post(w, r)
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

	http.HandleFunc("/scoreboard", func(w http.ResponseWriter, r *http.Request) {
		router(w, r)
	})

	fmt.Println("Server is listening... http://localhost:4000/")
	errListenAndServer := http.ListenAndServe(":4000", nil)

	if errListenAndServer != nil {
		log.Println(errListenAndServer)
		return
	}
}
