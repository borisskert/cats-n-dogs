package com.github.borisskert.example.springboot.state;

public class Action {

    private ActionType type;
    private String store;
    private String id;

    public ActionType getType() {
        return type;
    }

    private void setType(ActionType type) {
        this.type = type;
    }

    public String getStore() {
        return store;
    }

    private void setStore(String store) {
        this.store = store;
    }

    public String getId() {
        return id;
    }

    private void setId(String id) {
        this.id = id;
    }

    public static Action create(String store, String id) {
        Action action = new Action();
        action.setType(ActionType.CREATE);
        action.setStore(store);
        action.setId(id);

        return action;
    }

    public static Action update(String store, String id) {
        Action action = new Action();
        action.setType(ActionType.UPDATE);
        action.setStore(store);
        action.setId(id);

        return action;
    }

    public static Action delete(String store, String id) {
        Action action = new Action();
        action.setType(ActionType.DELETE);
        action.setStore(store);
        action.setId(id);

        return action;
    }
}
