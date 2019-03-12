package com.github.borisskert.example.springboot.authentication.model;

public class AuthenticationTokenValidation {
    private final String validatedAccessToken;
    private final AuthenticationToken authenticationToken;
    private final UserInfo userInfo;

    private AuthenticationTokenValidation(String validatedAccessToken, AuthenticationToken authenticationToken, UserInfo userInfo) {
        this.validatedAccessToken = validatedAccessToken;
        this.authenticationToken = authenticationToken;
        this.userInfo = userInfo;
    }

    public boolean isValid() {
        return userInfo != null;
    }

    public boolean isHasBeenRefreshed() {
        return authenticationToken != null;
    }

    public AuthenticationToken getAuthenticationToken() {
        return authenticationToken;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public static AuthenticationTokenValidation invalid(String validatedAccessToken) {
        return new AuthenticationTokenValidation(validatedAccessToken, null, null);
    }

    public static AuthenticationTokenValidation missing() {
        return new AuthenticationTokenValidation(null, null, null);
    }

    public static AuthenticationTokenValidation refreshed(AuthenticationToken refreshedToken, UserInfo userInfo) {
        return new AuthenticationTokenValidation(refreshedToken.getAccessToken(), refreshedToken, userInfo);
    }

    public static AuthenticationTokenValidation valid(String validAccessToken, UserInfo userInfo) {
        return new AuthenticationTokenValidation(validAccessToken, null, userInfo);
    }

    public String getValidatedAccessToken() {
        return validatedAccessToken;
    }
}
