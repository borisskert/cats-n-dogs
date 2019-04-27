package com.github.borisskert.example.springboot.authentication.model;

import com.auth0.jwt.interfaces.DecodedJWT;

public class AuthenticationTokenValidation {
    private final String validatedRefreshAccessToken;
    private final AuthenticationToken refreshedAuthenticationToken;
    private final DecodedJWT decodedToken;
    private final UserInfo userInfo;

    private AuthenticationTokenValidation(
            String validatedRefreshAccessToken,
            AuthenticationToken refreshedAuthenticationToken,
            DecodedJWT decodedToken, UserInfo userInfo
    ) {
        this.validatedRefreshAccessToken = validatedRefreshAccessToken;
        this.refreshedAuthenticationToken = refreshedAuthenticationToken;
        this.decodedToken = decodedToken;
        this.userInfo = userInfo;
    }

    public boolean isValid() {
        return userInfo != null;
    }

    public boolean isHasBeenRefreshed() {
        return refreshedAuthenticationToken != null;
    }

    public AuthenticationToken getRefreshedAuthenticationToken() {
        return refreshedAuthenticationToken;
    }

    public DecodedJWT getDecodedToken() {
        return decodedToken;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public static AuthenticationTokenValidation invalid() {
        return new AuthenticationTokenValidation(null, null, null, null);
    }

    public static AuthenticationTokenValidation invalid(String refreshToken) {
        return new AuthenticationTokenValidation(refreshToken, null, null, null);
    }

    public static AuthenticationTokenValidation missing() {
        return new AuthenticationTokenValidation(null, null, null, null);
    }

    public static AuthenticationTokenValidation refreshed(AuthenticationToken refreshedToken, DecodedJWT decodedToken, UserInfo userInfo) {
        return new AuthenticationTokenValidation(refreshedToken.getRefreshToken(), refreshedToken, decodedToken, userInfo);
    }

    public static AuthenticationTokenValidation valid(DecodedJWT decodedToken, String validRefreshToken, UserInfo userInfo) {
        return new AuthenticationTokenValidation(validRefreshToken, null, decodedToken, userInfo);
    }

    public String getValidatedRefreshAccessToken() {
        return validatedRefreshAccessToken;
    }
}
