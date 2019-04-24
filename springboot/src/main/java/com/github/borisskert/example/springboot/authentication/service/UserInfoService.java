package com.github.borisskert.example.springboot.authentication.service;

import com.github.borisskert.example.springboot.authentication.AuthenticationProperties;
import com.github.borisskert.example.springboot.authentication.model.UserInfo;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class UserInfoService {

    private static final MultiValueMap<String, String> EMPTY_BODY = new LinkedMultiValueMap<>();

    private final AuthenticationProperties properties;
    private final RestTemplate restTemplate;

    private final LoadingCache<String, UserInfo> userInfos;

    @Autowired
    public UserInfoService(AuthenticationProperties properties, RestTemplate restTemplate) {
        this.properties = properties;
        this.restTemplate = restTemplate;
        this.userInfos = buildUserInfoCache(properties);
    }

    public UserInfo retrieveUserInfo(String accessToken) {
        try {
            return userInfos.get(accessToken);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    private UserInfo loadUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(EMPTY_BODY, headers);

        ResponseEntity<UserInfo> response = restTemplate.exchange(
                properties.getUserInfoUri(),
                HttpMethod.GET,
                request,
                UserInfo.class
        );

        return response.getBody();
    }


    private LoadingCache<String, UserInfo> buildUserInfoCache(AuthenticationProperties properties) {
        AuthenticationProperties.UserInfoCacheProperties userInfoCacheProperties = properties.getUserInfoCache();

        return CacheBuilder.newBuilder()
                .maximumSize(userInfoCacheProperties.getMaxEntries())
                .expireAfterWrite(userInfoCacheProperties.getExpiryInSeconds(), TimeUnit.SECONDS)
                .build(
                        new CacheLoader<String, UserInfo>() {
                            public UserInfo load(String key) {
                                return loadUserInfo(key);
                            }
                        });
    }
}
