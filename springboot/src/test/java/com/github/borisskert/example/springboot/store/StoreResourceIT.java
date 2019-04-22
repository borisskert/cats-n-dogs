package com.github.borisskert.example.springboot.store;

import com.github.borisskert.example.springboot.authentication.model.AuthenticationToken;
import com.github.borisskert.example.springboot.authentication.service.AuthenticationService;
import com.github.borisskert.example.springboot.spring.TestConfiguration;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.ConfigFileApplicationContextInitializer;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;

@RunWith(SpringRunner.class)
@ContextConfiguration(
        classes = {TestConfiguration.class},
        initializers = {ConfigFileApplicationContextInitializer.class}
)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("IT")
@DirtiesContext
public class StoreResourceIT {

    private static final ParameterizedTypeReference<Map<String, JsonCat>> CAT_MAP_TYPE_REFERENCE = new ParameterizedTypeReference<Map<String, JsonCat>>() {
    };
    private static final HashMap<String, Object> EMPTY_URL_VARIABLES = new HashMap<>();

    private static final HttpEntity<Object> EMPTY_ENTITY = new HttpEntity<>(new HttpHeaders());

    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    AuthenticationService authentication;

    @Test
    public void should() throws Exception {
        AuthenticationToken token = authentication.login("admin", "password123");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Cookie", "access_token=" + token.getAccessToken());

        HttpEntity<Object> entity = new HttpEntity<>(headers);

        ResponseEntity<Map<String, JsonCat>> cats = restTemplate.exchange(
                "/store/cat",
                HttpMethod.GET,
                entity,
                CAT_MAP_TYPE_REFERENCE,
                EMPTY_URL_VARIABLES
        );

        assertThat(cats.getStatusCode(), is(equalTo(HttpStatus.OK)));
        assertThat(cats.getBody().values(), hasSize(0));
    }

    private static class JsonCat {

        private String id;
        private String name;
        private Integer age;
        private String race;
        private String owner;

        public String getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public Integer getAge() {
            return age;
        }

        public String getRace() {
            return race;
        }

        public String getOwner() {
            return owner;
        }
    }
}
