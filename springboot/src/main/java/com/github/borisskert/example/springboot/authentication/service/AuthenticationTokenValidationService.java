package com.github.borisskert.example.springboot.authentication.service;

import com.github.borisskert.example.springboot.authentication.model.AuthenticationToken;
import com.github.borisskert.example.springboot.authentication.model.AuthenticationTokenValidation;
import com.github.borisskert.example.springboot.authentication.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationTokenValidationService {
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationTokenValidationService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    public AuthenticationTokenValidation validate(String accessToken, String refreshToken) {
        AuthenticationTokenValidation validation;

        if (accessToken == null && refreshToken == null) {
            validation = AuthenticationTokenValidation.missing();
        } else if (accessToken != null) {
            validation = validateTokens(accessToken, refreshToken);
        } else {
            validation = refreshTokens(accessToken, refreshToken);
        }

        return validation;
    }

    private AuthenticationTokenValidation validateTokens(String accessToken, String refreshToken) {
        AuthenticationTokenValidation validation;
        Optional<UserInfo> maybeUserInfo = authenticationService.tryToGetUserInfo(accessToken);

        if (maybeUserInfo.isPresent()) {
            validation = AuthenticationTokenValidation.valid(accessToken, refreshToken, maybeUserInfo.get());
        } else if (refreshToken == null) {
            validation = AuthenticationTokenValidation.invalid(accessToken, refreshToken);
        } else {
            validation = refreshTokens(accessToken, refreshToken);
        }

        return validation;
    }

    private AuthenticationTokenValidation refreshTokens(String accessToken, String refreshToken) {
        AuthenticationTokenValidation validation;
        Optional<AuthenticationToken> maybeRefreshedToken = authenticationService.tryToRefresh(refreshToken);

        if (maybeRefreshedToken.isPresent()) {
            AuthenticationToken refreshedToken = maybeRefreshedToken.get();
            Optional<UserInfo> userInfo = authenticationService.tryToGetUserInfo(refreshedToken.getAccessToken());

            if (userInfo.isPresent()) {
                validation = AuthenticationTokenValidation.refreshed(refreshedToken, userInfo.get());
            } else {
                throw new AuthenticationTokenValidationException("Should never happen: Cant get user info for recently refreshed access token");
            }
        } else {
            validation = AuthenticationTokenValidation.invalid(accessToken, refreshToken);
        }

        return validation;
    }

    static class AuthenticationTokenValidationException extends RuntimeException {
        public AuthenticationTokenValidationException(String message) {
            super(message);
        }
    }
}
