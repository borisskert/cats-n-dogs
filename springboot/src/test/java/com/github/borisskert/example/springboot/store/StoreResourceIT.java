package com.github.borisskert.example.springboot.store;

import com.github.borisskert.example.springboot.authentication.model.AuthenticationToken;
import com.github.borisskert.example.springboot.authentication.service.AuthenticationService;
import com.github.borisskert.example.springboot.spring.TestConfiguration;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
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
import java.util.Map;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@RunWith(SpringRunner.class)
@ContextConfiguration(
        classes = {TestConfiguration.class},
        initializers = {ConfigFileApplicationContextInitializer.class}
)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("IT")
@DirtiesContext
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
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
    public void a_shouldNotHaveAnyCats() throws Exception {
        Map<String, JsonCat> cats = loadCats();
        assertThat(cats.values(), hasSize(0));
    }

    @Test
    public void b_shouldCreateCat() throws Exception {
        JsonCat catToCreate = new JsonCat();
        catToCreate.setName("my cat name");
        catToCreate.setAge(3);
        catToCreate.setRace("my cat race");
        catToCreate.setOwner("my cat owner");

        String catId = createCat(catToCreate);

        assertThat(catId, is(notNullValue()));

        Map<String, JsonCat> cats = loadCats();
        assertThat(cats.values(), hasSize(1));
        assertThat(cats, hasKey(catId));

        JsonCat createdCat = cats.get(catId);
        assertThat(createdCat.getId(), is(equalTo(catId)));
        assertThat(createdCat.getName(), is(equalTo(catToCreate.getName())));
        assertThat(createdCat.getRace(), is(equalTo(catToCreate.getRace())));
        assertThat(createdCat.getAge(), is(equalTo(catToCreate.getAge())));
        assertThat(createdCat.getOwner(), is(equalTo(catToCreate.getOwner())));
    }

    private Map<String, JsonCat> loadCats() {
        AuthenticationToken token = authentication.login("admin", "password123");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Cookie", "access_token=" + token.getAccessToken());

        HttpEntity<Object> entity = new HttpEntity<>(headers);

        ResponseEntity<Map<String, JsonCat>> response = restTemplate.exchange(
                "/store/cat",
                HttpMethod.GET,
                entity,
                CAT_MAP_TYPE_REFERENCE,
                EMPTY_URL_VARIABLES
        );

        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.OK)));
        return response.getBody();
    }

    private String createCat(JsonCat cat) {
        AuthenticationToken token = authentication.login("admin", "password123");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Cookie", "access_token=" + token.getAccessToken());

        HttpEntity<JsonCat> entity = new HttpEntity<>(cat, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "/store/cat",
                HttpMethod.POST,
                entity,
                String.class,
                EMPTY_URL_VARIABLES
        );

        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.CREATED)));
        return response.getBody();
    }

    public static class JsonCat {

        private String id;
        private String name;
        private Integer age;
        private String race;
        private String owner;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getAge() {
            return age;
        }

        public void setAge(Integer age) {
            this.age = age;
        }

        public String getRace() {
            return race;
        }

        public void setRace(String race) {
            this.race = race;
        }

        public String getOwner() {
            return owner;
        }

        public void setOwner(String owner) {
            this.owner = owner;
        }
    }
}
