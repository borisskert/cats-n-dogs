package com.github.borisskert.example.springboot.authentication.service;

import com.github.borisskert.example.springboot.authentication.AuthenticationProperties;
import com.github.borisskert.example.springboot.authentication.model.AuthenticationToken;
import com.github.borisskert.example.springboot.authentication.model.AuthenticationTokenAuthentication;
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

    private static final String REFRESH_TOKEN_PARAM_NAME = "refresh_token";
    private static final String ACCESS_TOKEN_PARAM_NAME = "access_token";
    private static final String CLIENT_SECRET_PARAM_NAME = "client_secret";
    private static final String CLIENT_ID_PARAM_NAME = "client_id";
    private static final String GRANT_TYPE_PARAM_NAME = "grant_type";
    private static final String REFRESH_TOKEN_GRANT_TYPE = "refresh_token";
    private static final String USERNAME_PARAM_NAME = "username";
    private static final String PASSWORD_PARAM_NAME = "password";
    private static final String GRANT_TYPE_PASSWORD = "password";

    private final AuthenticationProperties authenticationProperties;
    private final RestTemplate restTemplate;

    private final AccessTokenAndRefreshTokenProvider tokenProvider;

    @Autowired
    public AuthenticationService(
            AuthenticationProperties authenticationProperties,
            RestTemplate restTemplate,
            AccessTokenAndRefreshTokenProvider tokenProvider
    ) {
        this.authenticationProperties = authenticationProperties;
        this.restTemplate = restTemplate;
        this.tokenProvider = tokenProvider;
    }

    public Optional<AuthenticationToken> tryToLogin(LoginCredentials credentials) {
        return tryToLogin(credentials.getUsername(), credentials.getPassword());
    }

    public Optional<AuthenticationToken> tryToLogin(String username, String password) {
        HttpEntity<MultiValueMap<String, String>> request = buildLoginRequest(username, password);
        return tryToRequestAuthenticationToken(request);
    }

    public AuthenticationToken login(String username, String password) {
        HttpEntity<MultiValueMap<String, String>> request = buildLoginRequest(username, password);
        return requestAuthenticationToken(request);
    }

    public void logout() {
        AuthenticationTokenAuthentication.AccessAndRefreshToken accessAndRefreshToken = tokenProvider.get();

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add(CLIENT_ID_PARAM_NAME, authenticationProperties.getClientId());
        body.add(CLIENT_SECRET_PARAM_NAME, authenticationProperties.getClientSecret());
        body.add(ACCESS_TOKEN_PARAM_NAME, accessAndRefreshToken.getAccessToken());
        body.add(REFRESH_TOKEN_PARAM_NAME, accessAndRefreshToken.getRefreshToken());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, EMPTY_HEADERS);

        restTemplate.exchange(
                authenticationProperties.getEndSessionEndpoint(),
                HttpMethod.POST,
                request,
                Void.class
        );
    }

    public Optional<AuthenticationToken> tryToRefresh(String refreshToken) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add(CLIENT_ID_PARAM_NAME, authenticationProperties.getClientId());
        body.add(CLIENT_SECRET_PARAM_NAME, authenticationProperties.getClientSecret());
        body.add(GRANT_TYPE_PARAM_NAME, REFRESH_TOKEN_GRANT_TYPE);
        body.add(REFRESH_TOKEN_PARAM_NAME, refreshToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, EMPTY_HEADERS);

        return tryToRequestAuthenticationToken(request);
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

    private HttpEntity<MultiValueMap<String, String>> buildLoginRequest(String username, String password) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add(CLIENT_ID_PARAM_NAME, authenticationProperties.getClientId());
        body.add(CLIENT_SECRET_PARAM_NAME, authenticationProperties.getClientSecret());
        body.add(GRANT_TYPE_PARAM_NAME, GRANT_TYPE_PASSWORD);
        body.add(USERNAME_PARAM_NAME, username);
        body.add(PASSWORD_PARAM_NAME, password);

        return new HttpEntity<>(body, EMPTY_HEADERS);
    }

    private Optional<AuthenticationToken> tryToRequestAuthenticationToken(HttpEntity<MultiValueMap<String, String>> request) {
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

    private AuthenticationToken requestAuthenticationToken(HttpEntity<MultiValueMap<String, String>> request) {
        ResponseEntity<AuthenticationToken> response = restTemplate.exchange(
                authenticationProperties.getAccessTokenUri(),
                HttpMethod.POST,
                request,
                AuthenticationToken.class
        );

        return response.getBody();
    }
}
