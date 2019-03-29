package com.github.borisskert.example.springboot.store.validation;

import org.bson.Document;
import org.everit.json.schema.ValidationException;
import org.hamcrest.MatcherAssert;
import org.junit.Before;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import static com.googlecode.catchexception.CatchException.catchException;
import static com.googlecode.catchexception.CatchException.caughtException;
import static org.hamcrest.Matchers.instanceOf;

public class JsonSchemaValidatorTest {

    private JsonSchemaValidator validator;

    @Before
    public void setup() throws Exception {
        validator = new JsonSchemaValidator();
    }

    @Test
    public void shouldReturnTrueForValidCat() throws Exception {
        String resource = readResource("/valid_cat.json");
        Document cat = Document.parse(resource);

        validator.validate("cat", cat);
    }

    @Test
    public void shouldReturnFalseForInvalidCatName() throws Exception {
        String resource = readResource("/invalid_name.json");
        Document cat = Document.parse(resource);

        catchException(validator).validate("cat", cat);

        MatcherAssert.assertThat(caughtException(), instanceOf(JsonSchemaValidationException.class));
    }

    private String readResource(String filename) throws Exception {
        String pathname = "/" + this.getClass().getName() + filename;
        InputStream resourceAsStream = this.getClass().getResourceAsStream(pathname);

        if (resourceAsStream == null) {
            throw new RuntimeException("Cannot read file: " + pathname);
        }

        return readToString(resourceAsStream);
    }

    private static String readToString(InputStream inputStream) throws IOException {
        BufferedReader reader = null;
        StringBuilder builder = new StringBuilder();

        String line;
        try {

            reader = new BufferedReader(new InputStreamReader(inputStream));
            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }

        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return builder.toString();
    }
}
