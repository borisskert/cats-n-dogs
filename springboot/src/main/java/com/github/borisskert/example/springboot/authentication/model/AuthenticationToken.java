package com.github.borisskert.example.springboot.authentication.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represents a authentication token got from IDP. Should never be created manually.
 */
public class AuthenticationToken {
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("expires_in")
    private Long expiresIn;

    @JsonProperty("refresh_expires_in")
    private Long refreshExpiresIn;

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public Long getRefreshExpiresIn() {
        return refreshExpiresIn;
    }
}
