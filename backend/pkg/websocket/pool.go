package websocket

import "log"

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {

		case client := <-pool.Register:
			pool.Clients[client] = true
			log.Println("Size of connection pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				log.Println("A new user joined...")
				client.Conn.WriteJSON(Message{
					Type: 1,
					Body: "A new user joined...",
				})
			}
			break

		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			log.Println("Size of connection pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				log.Println("A new user joined...")
				client.Conn.WriteJSON(Message{
					Type: 1,
					Body: "A user left the chat",
				})
			}
			break

		case message := <-pool.Broadcast:
			log.Println("sending message to all clients in pool")
			for client, _ := range pool.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					log.Printf("Error in sending message: %+v", err)
					return
				}
			}
			break
		}
	}
}
