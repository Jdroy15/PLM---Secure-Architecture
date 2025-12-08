FROM golang:1.20-alpine AS build
WORKDIR /src
COPY main.go .
RUN go build -o /bin/app main.go

FROM alpine
COPY --from=build /bin/app /app
EXPOSE 5002
ENTRYPOINT ["/app"]
