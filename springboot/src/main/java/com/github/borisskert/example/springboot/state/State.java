package com.github.borisskert.example.springboot.state;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
public class State {

//    private ObjectId _id;
    private String _id;
    private Action action;
    private LocalDateTime timestamp;

    public String getId() {
        return _id;
    }
//
//    public void setId(String id) {
//        this.id = id;
//    }

    public Action getAction() {
        return action;
    }

    private void setAction(Action action) {
        this.action = action;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    private void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public static State fromAction(Action action) {
        State newState = new State();
        newState.setAction(action);
        newState.setTimestamp(LocalDateTime.now());

        return newState;
    }
}
