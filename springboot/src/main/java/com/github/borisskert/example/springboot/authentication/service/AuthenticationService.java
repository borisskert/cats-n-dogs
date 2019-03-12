package com.github.borisskert.example.springboot.authentication.service;

import com.github.borisskert.example.springboot.authentication.AuthenticationProperties;
import com.github.borisskert.example.springboot.authentication.model.AuthenticationToken;
import com.github.borisskert.example.springboot.authentication.model.LoginCredentials;
import com.github.borisskert.example.springboot.authentication.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class AuthenticationService {

    private static final HttpHeaders EMPTY_HEADERS = new HttpHeaders();
    private static final MultiValueMap<String, String> EMPTY_BODY = new LinkedMultiValueMap<>();

    private final AuthenticationProperties authenticationProperties;
    private final RestTemplate restTemplate;

    @Autowired
    public AuthenticationService(AuthenticationProperties authenticationProperties, RestTemplate restTemplate) {
        this.authenticationProperties = authenticationProperties;
        this.restTemplate = restTemplate;
    }

    public Optional<AuthenticationToken> tryToLogin(LoginCredentials credentials) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", authenticationProperties.getClientId());
        body.add("client_secret", authenticationProperties.getClientSecret());
        body.add("grant_type", "password");
        body.add("username", credentials.getUsername());
        body.add("password", credentials.getPassword());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, EMPTY_HEADERS);

        return requestAuthenticationToken(request);
    }

    public Optional<AuthenticationToken> tryToRefresh(String refreshToken) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", authenticationProperties.getClientId());
        body.add("client_secret", authenticationProperties.getClientSecret());
        body.add("grant_type", "refresh_token");
        body.add("refresh_token", refreshToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, EMPTY_HEADERS);

        return requestAuthenticationToken(request);
    }

    public Optional<UserInfo> tryToGetUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(EMPTY_BODY, headers);

        Optional<UserInfo> userInfo;
        try {
            ResponseEntity<UserInfo> response = restTemplate.exchange(
                    authenticationProperties.getUserInfoUri(),
                    HttpMethod.GET,
                    request,
                    UserInfo.class
            );
            userInfo = Optional.ofNullable(response.getBody());
        } catch (HttpClientErrorException e) {
            userInfo = Optional.empty();
        }

        return userInfo;
    }

    private Optional<AuthenticationToken> requestAuthenticationToken(HttpEntity<MultiValueMap<String, String>> request) {
        Optional<AuthenticationToken> token;

        try {
            ResponseEntity<AuthenticationToken> response = restTemplate.exchange(
                    authenticationProperties.getAccessTokenUri(),
                    HttpMethod.POST,
                    request,
                    AuthenticationToken.class
            );
            token = Optional.ofNullable(response.getBody());
        } catch (HttpClientErrorException e) {
            token = Optional.empty();
        }

        return token;
    }
}
