package com.github.borisskert.example.springboot.store.validation;

import org.bson.Document;
import org.everit.json.schema.Schema;
import org.everit.json.schema.ValidationException;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Service
public class JsonSchemaValidator {

    private final Map<String, Schema> jsonSchemas;

    public JsonSchemaValidator() {
        jsonSchemas = new HashMap<>();
        jsonSchemas.put("cat", loadSchemaFor("/schemas/cat.json"));
    }

    public void validate(String store, Document document) throws JsonSchemaValidationException {
        Schema schema = jsonSchemas.get(store);

        try{
            schema.validate(new JSONObject(document));
        } catch (ValidationException e) {
            throw new JsonSchemaValidationException(e);
        }
    }

    private Schema loadSchemaFor(String schemaPathname) {
        InputStream resourceAsStream = this.getClass().getResourceAsStream(schemaPathname);
        JSONTokener jsonTokener = new JSONTokener(resourceAsStream);
        JSONObject schemaJson = new JSONObject(jsonTokener);

        return SchemaLoader.load(schemaJson);
    }
}
