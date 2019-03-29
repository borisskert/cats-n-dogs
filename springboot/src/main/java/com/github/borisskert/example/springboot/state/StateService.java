package com.github.borisskert.example.springboot.state;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StateService {

    private final StateRepository repository;

    @Autowired
    public StateService(StateRepository repository) {
        this.repository = repository;
    }

    public List<State> getAll() {
        return repository.findAll();
    }

    public List<State> getUntil(String to) {
        Optional<State> toState = repository.findById(to);

        if (toState.isPresent()) {
            State state = toState.get();
            return repository.findByState_TimestampBefore(state.getTimestamp());
        }

        return new ArrayList<>();
    }

    public List<State> getFrom(String from) {
        Optional<State> fromState = repository.findById(from);

        if (fromState.isPresent()) {
            State state = fromState.get();
            return repository.findByState_TimestampAfter(state.getTimestamp());
        }

        return new ArrayList<>();
    }

    public List<State> getBetween(String from, String to) {
        Optional<State> fromState = repository.findById(from);
        Optional<State> toState = repository.findById(to);

        if (fromState.isPresent() && toState.isPresent()) {
            return repository.findByState_TimestampBetween(fromState.get().getTimestamp(), toState.get().getTimestamp());
        }

        return new ArrayList<>();
    }

    public Optional<String> getLatest() {
        State lastState = repository.findTopByOrderByTimestampDesc();
        return Optional.ofNullable(lastState).map(State::getId);
    }

    public Optional<State> getById(String id) {
        return repository.findById(id);
    }

    public void create(String store, String id) {
        Action createAction = Action.create(store, id);
        State newState = State.fromAction(createAction);

        repository.save(newState);
    }

    public void update(String store, String id) {
        Action updateAction = Action.update(store, id);
        State newState = State.fromAction(updateAction);

        repository.save(newState);
    }

    public void delete(String store, String id) {
        Action deleteAction = Action.delete(store, id);
        State newState = State.fromAction(deleteAction);

        repository.save(newState);
    }
}
