package main

import (
	"log"
	"net/http"

	"github.com/googollee/go-socket.io"
	"github.com/rs/cors"
)

func main() {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})
	server.On("connection", func(so socketio.Socket) {
		log.Print("on connection")
		so.Join("chat")

		so.On("chat message", func(msg string) {
			log.Print("emit:", so.Emit("chat message", msg))
			so.BroadcastTo("chat", "chat message", msg)
		})
		so.On("chat ack", func(msg string) string {
			return msg
		})
		so.On("disconnection", func() {
			log.Print("on disconnect")
			log.Print("emit count:", so.Emit("user count", server.Count()))
			so.BroadcastTo("chat", "user count", server.Count())
		})
		so.On("chat user check in", func(msg string) {
			log.Print("emit count:", so.Emit("user count", server.Count()))
			so.BroadcastTo("chat", "user count", server.Count())
		})
	})
	server.On("error", func(so socketio.Socket, err error) {
		log.Println("error", err)
	})

	http.Handle("/socket.io/", c.Handler(server))
	http.Handle("/", http.FileServer(http.Dir("./dist")))
	log.Print("serve on 9999 ")
	log.Fatal(http.ListenAndServe(":9999", nil))
}
