package com.github.borisskert.example.springboot.authentication.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.borisskert.example.springboot.authentication.model.AuthenticationToken;
import com.github.borisskert.example.springboot.authentication.model.AuthenticationTokenValidation;
import com.github.borisskert.example.springboot.authentication.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationTokenValidationService {
    private final AuthenticationService authenticationService;
    private final UserInfoService userInfoService;
    private final JwtService jwtService;

    @Autowired
    public AuthenticationTokenValidationService(
            AuthenticationService authenticationService,
            UserInfoService userInfoService, JwtService jwtService
    ) {
        this.authenticationService = authenticationService;
        this.userInfoService = userInfoService;
        this.jwtService = jwtService;
    }

    public AuthenticationTokenValidation validate(String accessToken, String refreshToken) {
        AuthenticationTokenValidation validation;

        if (accessToken == null && refreshToken == null) {
            validation = AuthenticationTokenValidation.missing();
        } else if (accessToken != null) {
            validation = validateTokens(accessToken, refreshToken);
        } else {
            validation = refreshTokens(refreshToken);
        }

        return validation;
    }

    private AuthenticationTokenValidation validateTokens(String accessToken, String refreshToken) {
        AuthenticationTokenValidation validation;
        Optional<DecodedJWT> maybeToken = jwtService.tryToDecodeVerified(accessToken);

        if (maybeToken.isPresent()) {
            UserInfo userInfo = userInfoService.retrieveUserInfo(accessToken);
            validation = AuthenticationTokenValidation.valid(maybeToken.get(), refreshToken, userInfo);
        } else if (refreshToken == null) {
            validation = AuthenticationTokenValidation.invalid();
        } else {
            validation = refreshTokens(refreshToken);
        }

        return validation;
    }

    private AuthenticationTokenValidation refreshTokens(String refreshToken) {
        AuthenticationTokenValidation validation;
        Optional<AuthenticationToken> maybeRefreshedToken = authenticationService.tryToRefresh(refreshToken);

        if (maybeRefreshedToken.isPresent()) {
            AuthenticationToken refreshedToken = maybeRefreshedToken.get();
            DecodedJWT decodedToken = jwtService.decodeVerified(refreshedToken.getAccessToken());
            UserInfo userInfo = userInfoService.retrieveUserInfo(refreshedToken.getAccessToken());
            validation = AuthenticationTokenValidation.refreshed(refreshedToken, decodedToken, userInfo);
        } else {
            validation = AuthenticationTokenValidation.invalid();
        }

        return validation;
    }
}
