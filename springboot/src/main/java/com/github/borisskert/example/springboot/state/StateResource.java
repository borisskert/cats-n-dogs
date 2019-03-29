package com.github.borisskert.example.springboot.state;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class StateResource {

    private final StateService stateService;

    @Autowired
    public StateResource(StateService stateService) {
        this.stateService = stateService;
    }

    @GetMapping("/state/latest")
    public ResponseEntity<String> getState() {
        Optional<String> maybeLatestState = stateService.getLatest();

        return maybeLatestState
                .map(state -> new ResponseEntity<>(state, HttpStatus.OK))
                .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/state")
    public List<State> getAll(
            @RequestParam(value = "from", required = false) String fromVersion,
            @RequestParam(value = "to", required = false) String toVersion
    ) {
        List<State> states;

        if (fromVersion == null && toVersion == null) {
            states = stateService.getAll();
        } else if (fromVersion == null) {
            states = stateService.getUntil(toVersion);
        } else if (toVersion == null) {
            states = stateService.getFrom(fromVersion);
        } else {
            states = stateService.getBetween(fromVersion, toVersion);
        }

        return states;
    }

    @GetMapping("/state/{id}")
    public ResponseEntity<State> getById(@PathVariable String id) {
        return stateService.getById(id)
                .map(state -> new ResponseEntity<>(state, HttpStatus.OK))
                .orElse(new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }
}
