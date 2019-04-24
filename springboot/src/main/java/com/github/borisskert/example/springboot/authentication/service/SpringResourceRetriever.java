package com.github.borisskert.example.springboot.authentication.service;

import com.nimbusds.jose.util.Resource;
import com.nimbusds.jose.util.ResourceRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

@Service
public class SpringResourceRetriever implements ResourceRetriever {

    private final RestTemplate restTemplate;

    @Autowired
    public SpringResourceRetriever(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Resource retrieveResource(URL url) throws IOException {
        ResponseEntity<String> response = get(url);
        String content = response.getBody();
        MediaType contentType = response.getHeaders().getContentType();

        return new Resource(content, contentType.toString());
    }

    private ResponseEntity<String> get(URL url) {
        try {
            return restTemplate.getForEntity(url.toURI(), String.class);
        } catch (URISyntaxException e) {
            throw new RuntimeException("Should never happen; url is validated in configuration-properties", e);
        }
    }
}
