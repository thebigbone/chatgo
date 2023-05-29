package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/thebigbone/chatgo/backend/pkg/websocket"
)

func main() {
	fmt.Println("Websocket chat app")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}

func serveWS(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	log.Println("Reached websocket endponint")

	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%v", err)
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWS(pool, w, r)
	})
}
