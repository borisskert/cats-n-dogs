package com.github.borisskert.example.springboot.store;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/store")
public class StoreResource {

    private final StoreService storeService;

    @Autowired
    public StoreResource(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping("/{type}")
    public Map<String, Document> getAll(@PathVariable String type) {
        return storeService.findAll(type);
    }

    @GetMapping("/{type}/{id}")
    public ResponseEntity<Document> getOne(@PathVariable String type, @PathVariable String id) {
        Document document = storeService.find(type, id);

        if(document == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(document, HttpStatus.OK);
    }

    @PostMapping("/{type}")
    public ResponseEntity<String> post(@PathVariable String type, @RequestBody Document document) {
        String createdId = storeService.create(type, document);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{type}/{id}")
    public void put(@PathVariable String type, @PathVariable String id, @RequestBody Document document) {
        storeService.update(type, id, document);
    }

    @DeleteMapping("/{type}/{id}")
    public void delete(@PathVariable String type, @PathVariable String id) {
        storeService.delete(type, id);
    }
}
