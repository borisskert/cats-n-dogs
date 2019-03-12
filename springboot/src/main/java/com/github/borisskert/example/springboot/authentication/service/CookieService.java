package com.github.borisskert.example.springboot.authentication.service;

import com.github.borisskert.example.springboot.authentication.TokenConstants;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;

@Service
public class CookieService {

    public Cookie createAccessTokenCookie(String token, Long expiration) {
        return creationCookie(TokenConstants.ACCESS_TOKEN_COOKIE_NAME, token, "/", expiration.intValue());
    }

    public Cookie createRefreshTokenCookie(String token, Long expiration) {
        return creationCookie(TokenConstants.REFRESH_TOKEN_COOKIE_NAME, token, "/", expiration.intValue());
    }

    private Cookie creationCookie(String name, String value, String path, int maxAge) {
        Cookie cookie = new Cookie(name, value);

        cookie.setSecure(false);
        cookie.setHttpOnly(true);
        cookie.setPath(path);
        cookie.setMaxAge(maxAge);

        return cookie;
    }
}
