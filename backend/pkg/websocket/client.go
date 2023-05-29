package websocket

import (
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
	mu   sync.Mutex
}

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Printf("Err: %v", err)
			return
		}

		message := Message{
			Type: messageType,
			Body: string(p),
		}

		c.Pool.Broadcast <- message
		log.Printf("Message received: %+v", message)
	}

}
