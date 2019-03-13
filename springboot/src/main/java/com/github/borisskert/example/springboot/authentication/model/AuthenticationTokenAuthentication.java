package com.github.borisskert.example.springboot.authentication.model;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AuthenticationTokenAuthentication extends UsernamePasswordAuthenticationToken {
    private static final long serialVersionUID = 8723464729187562871L;
    private final AccessAndRefreshToken accessAndRefreshToken;

    public AuthenticationTokenAuthentication(
            String principal,
            UserInfo credentials,
            Collection<? extends GrantedAuthority> authorities,
            AccessAndRefreshToken accessAndRefreshToken
    ) {
        super(principal, credentials, authorities);
        this.accessAndRefreshToken = accessAndRefreshToken;
    }

    public AccessAndRefreshToken getTokens() {
        return accessAndRefreshToken;
    }

    public static class AccessAndRefreshToken {
        private final String accessToken;
        private final String refreshToken;

        public AccessAndRefreshToken(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }

        public String getAccessToken() {
            return accessToken;
        }

        public String getRefreshToken() {
            return refreshToken;
        }
    }
}
