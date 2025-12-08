package main
import (
  "encoding/json"
  "net/http"
  "strings"
)
func writeJSON(w http.ResponseWriter, v interface{}) {
  w.Header().Set("Content-Type","application/json")
  json.NewEncoder(w).Encode(v)
}
func index(w http.ResponseWriter, r *http.Request) {
  user := r.Header.Get("X-Auth-Request-User")
  email := r.Header.Get("X-Auth-Request-Email")
  groups := r.Header.Get("X-Auth-Request-Groups")
  writeJSON(w, map[string]string{"message":"protected resource","user":user,"email":email,"groups":groups})
}
func admin(w http.ResponseWriter, r *http.Request) {
  groups := r.Header.Get("X-Auth-Request-Groups")
  if !strings.Contains(groups, "police_admins") {
    w.WriteHeader(403)
    writeJSON(w, map[string]string{"error":"forbidden"})
    return
  }
  writeJSON(w, map[string]string{"message":"admin area"})
}
func main(){
  http.HandleFunc("/", index)
  http.HandleFunc("/admin", admin)
  http.ListenAndServe(":5002", nil)
}
