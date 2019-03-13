package com.github.borisskert.example.springboot.authentication.service;

import com.github.borisskert.example.springboot.authentication.model.AuthenticationTokenAuthentication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AccessTokenAndRefreshTokenProvider {

    public AuthenticationTokenAuthentication.AccessAndRefreshToken get() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();

        AuthenticationTokenAuthentication authenticationWithToken;
        if (authentication instanceof AuthenticationTokenAuthentication) {
            authenticationWithToken = (AuthenticationTokenAuthentication) authentication;
        } else {
            throw new RuntimeException("Should never happen: Missing or wrong authentication type in security context");
        }

        return authenticationWithToken.getTokens();
    }
}
