package com.github.borisskert.example.springboot.store;

import com.github.borisskert.example.springboot.state.StateService;
import com.github.borisskert.example.springboot.store.validation.JsonSchemaValidator;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class StoreService {
    private static final String MONGO_ID_PROPERTY_NAME = "_id";
    private static final String CUSTOM_ID_PROPERTY_NAME = "id";

    private final JsonSchemaValidator validator;
    private final MongoTemplate mongoTemplate;
    private final StateService stateService;

    @Autowired
    public StoreService(
            JsonSchemaValidator validator,
            MongoTemplate mongoTemplate,
            StateService stateService
    ) {
        this.validator = validator;
        this.mongoTemplate = mongoTemplate;
        this.stateService = stateService;
    }

    public Map<String, Document> findAll(final String store) {
        MongoCollection<Document> collection = getCollection(store);
        return StreamSupport.stream(
                collection.find().spliterator(),
                false
        ).collect(
                Collectors.toMap(
                        (d) -> d.get(CUSTOM_ID_PROPERTY_NAME).toString(),
                        Function.identity()
                )
        );
    }

    public Document find(final String store, final String id) {
        MongoCollection<Document> collection = getCollection(store);
        return collection.find(idFilter(id)).first();
    }

    public String create(final String store, final Document document) {
        validator.validate(store, document);

        MongoCollection<Document> collection = getCollection(store);

        ObjectId id = ObjectId.get();
        String idAsHexString = id.toHexString();

        collection.insertOne(
                document
                        .append(MONGO_ID_PROPERTY_NAME, id)
                        .append(CUSTOM_ID_PROPERTY_NAME, idAsHexString)
        );

        stateService.create(store, idAsHexString);

        return idAsHexString;
    }

    public void update(final String store, final String id, final Document document) {
        validator.validate(store, document);

        MongoCollection<Document> collection = getCollection(store);
        UpdateResult updateResult = collection.replaceOne(idFilter(id), document);

        if (!updateResult.wasAcknowledged() || updateResult.getMatchedCount() < 1) {
            throw new RuntimeException();
        }

        stateService.update(store, id);
    }

    public void delete(final String store, final String id) {
        MongoCollection<Document> collection = getCollection(store);
        collection.deleteOne(idFilter(id));

        stateService.delete(store, id);
    }

    private MongoCollection<Document> getCollection(String store) {
        MongoCollection<Document> collection;

        if (mongoTemplate.collectionExists(store)) {
            collection = mongoTemplate.getCollection(store);
        } else {
            collection = mongoTemplate.createCollection(store);
        }
        return collection;
    }

    private Bson idFilter(String id) {
        return Filters.eq(new ObjectId(id));
    }
}
