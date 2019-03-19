package com.github.borisskert.example.springboot.store;

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

    private final MongoTemplate mongoTemplate;

    @Autowired
    public StoreService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Map<String, Document> findAll(final String collectionName) {
        MongoCollection<Document> collection = getCollection(collectionName);
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

    public Document find(final String collectionName, final String id) {
        MongoCollection<Document> collection = getCollection(collectionName);
        return collection.find(idFilter(id)).first();
    }

    public String create(final String collectionName, final Document document) {
        MongoCollection<Document> collection = getCollection(collectionName);

        ObjectId id = ObjectId.get();
        String idAsHexString = id.toHexString();

        collection.insertOne(
                document
                        .append(MONGO_ID_PROPERTY_NAME, id)
                        .append(CUSTOM_ID_PROPERTY_NAME, idAsHexString)
        );

        return idAsHexString;
    }

    public void update(final String collectionName, final String id, final Document document) {
        MongoCollection<Document> collection = getCollection(collectionName);
        UpdateResult updateResult = collection.replaceOne(idFilter(id), document);

        if (!updateResult.wasAcknowledged() || updateResult.getMatchedCount() < 1) {
            throw new RuntimeException();
        }
    }

    public void delete(final String collectionName, final String id) {
        MongoCollection<Document> collection = getCollection(collectionName);
        collection.deleteOne(idFilter(id));
    }

    private MongoCollection<Document> getCollection(String collectionName) {
        MongoCollection<Document> collection;

        if (mongoTemplate.collectionExists(collectionName)) {
            collection = mongoTemplate.getCollection(collectionName);
        } else {
            collection = mongoTemplate.createCollection(collectionName);
        }
        return collection;
    }

    private Bson idFilter(String id) {
        return Filters.eq(new ObjectId(id));
    }
}
