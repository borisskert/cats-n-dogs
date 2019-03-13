package com.github.borisskert.example.springboot.authentication.model;

public class AuthenticationTokenValidation {
    private final String validatedAccessToken;
    private final String validatedRefreshAccessToken;
    private final AuthenticationToken authenticationToken;
    private final UserInfo userInfo;

    private AuthenticationTokenValidation(
            String validatedAccessToken,
            String validatedRefreshAccessToken,
            AuthenticationToken authenticationToken,
            UserInfo userInfo) {
        this.validatedAccessToken = validatedAccessToken;
        this.validatedRefreshAccessToken = validatedRefreshAccessToken;
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

    public static AuthenticationTokenValidation invalid(String validatedAccessToken, String validatedRefreshAccessToken) {
        return new AuthenticationTokenValidation(validatedAccessToken, validatedRefreshAccessToken, null, null);
    }

    public static AuthenticationTokenValidation missing() {
        return new AuthenticationTokenValidation(null, null, null, null);
    }

    public static AuthenticationTokenValidation refreshed(AuthenticationToken refreshedToken, UserInfo userInfo) {
        return new AuthenticationTokenValidation(refreshedToken.getAccessToken(), refreshedToken.getRefreshToken(), refreshedToken, userInfo);
    }

    public static AuthenticationTokenValidation valid(String validAccessToken, String validRefreshToken, UserInfo userInfo) {
        return new AuthenticationTokenValidation(validAccessToken, validRefreshToken, null, userInfo);
    }

    public String getValidatedAccessToken() {
        return validatedAccessToken;
    }

    public String getValidatedRefreshAccessToken() {
        return validatedRefreshAccessToken;
    }
}
