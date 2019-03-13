package com.github.borisskert.example.springboot.authentication.service;

import com.github.borisskert.example.springboot.authentication.AuthenticationProperties;
import com.github.borisskert.example.springboot.authentication.TokenConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;

@Service
public class CookieService {

    private final AuthenticationProperties properties;

    @Autowired
    public CookieService(AuthenticationProperties properties) {
        this.properties = properties;
    }

    public Cookie createAccessTokenCookie(String token, Long expiration) {
        return createCookie(TokenConstants.ACCESS_TOKEN_COOKIE_NAME, token, "/", expiration.intValue());
    }

    public Cookie createRefreshTokenCookie(String token, Long expiration) {
        return createCookie(TokenConstants.REFRESH_TOKEN_COOKIE_NAME, token, "/", expiration.intValue());
    }

    public Cookie expireAccessTokenCookie() {
        return expireCookie(TokenConstants.ACCESS_TOKEN_COOKIE_NAME, "/");
    }

    public Cookie expireRefreshTokenCookie() {
        return expireCookie(TokenConstants.REFRESH_TOKEN_COOKIE_NAME, "/");
    }

    private Cookie createCookie(String name, String value, String path, int maxAge) {
        Cookie cookie = new Cookie(name, value);

        cookie.setSecure(properties.getUseSecureCookies());
        cookie.setHttpOnly(true);
        cookie.setPath(path);
        cookie.setMaxAge(maxAge);

        return cookie;
    }

    private Cookie expireCookie(String name, String path) {
        Cookie cookie = new Cookie(name, null);

        cookie.setSecure(properties.getUseSecureCookies());
        cookie.setHttpOnly(true);
        cookie.setPath(path);
        cookie.setMaxAge(0);

        return cookie;
    }
}
