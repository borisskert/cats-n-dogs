package com.github.borisskert.example.springboot.authentication.filter;

import com.github.borisskert.example.springboot.authentication.TokenConstants;
import com.github.borisskert.example.springboot.authentication.model.AuthenticationToken;
import com.github.borisskert.example.springboot.authentication.model.AuthenticationTokenValidation;
import com.github.borisskert.example.springboot.authentication.model.UserInfo;
import com.github.borisskert.example.springboot.authentication.service.AuthenticationTokenValidationService;
import com.github.borisskert.example.springboot.authentication.service.CookieService;
import com.github.borisskert.example.springboot.authentication.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.util.WebUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class AuthenticationFilter extends GenericFilterBean {

    private final AuthenticationTokenValidationService validationService;
    private final CookieService cookieService;
    private final JwtService jwtService;

    @Autowired
    public AuthenticationFilter(
            AuthenticationTokenValidationService validationService,
            CookieService cookieService,
            JwtService jwtService
    ) {
        this.validationService = validationService;
        this.cookieService = cookieService;
        this.jwtService = jwtService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();

        if(authentication == null) {
            AuthenticationTokenValidation validation = validateTokensFromRequest((HttpServletRequest) request);
            Optional<Authentication> maybeAuthentication = tryToGetAuthentication(validation);

            context.setAuthentication(maybeAuthentication.orElse(null));

            if(validation.isHasBeenRefreshed()) {
                handleRefreshedTokens((HttpServletResponse) response, validation);
            }
        }

        chain.doFilter(request, response);
    }

    private void handleRefreshedTokens(HttpServletResponse response, AuthenticationTokenValidation validation ) {
        AuthenticationToken refreshedToken = validation.getAuthenticationToken();

        response.addCookie(cookieService.createAccessTokenCookie(refreshedToken.getAccessToken(), refreshedToken.getExpiresIn()));
        response.addCookie(cookieService.createRefreshTokenCookie(refreshedToken.getRefreshToken(), refreshedToken.getRefreshExpiresIn()));
    }

    private AuthenticationTokenValidation validateTokensFromRequest(HttpServletRequest request) {
        Optional<Cookie> accessTokenCookie = tryToGetCookieFrom(request, TokenConstants.ACCESS_TOKEN_COOKIE_NAME);
        Optional<Cookie> refreshTokenCookie = tryToGetCookieFrom(request, TokenConstants.REFRESH_TOKEN_COOKIE_NAME);

        return validationService.validate(
                accessTokenCookie.map(Cookie::getValue).orElse(null),
                refreshTokenCookie.map(Cookie::getValue).orElse(null)
        );
    }

    private Optional<Authentication> tryToGetAuthentication(AuthenticationTokenValidation validation) {
        Optional<Authentication> authentication;

        if(validation.isValid()) {
            authentication = Optional.of(getAuthentication(validation.getValidatedAccessToken(), validation.getUserInfo()));
        } else {
            authentication = Optional.empty();
        }

        return authentication;
    }

    private Optional<Cookie> tryToGetCookieFrom(HttpServletRequest request, String name) {
        Cookie nullableCookie = WebUtils.getCookie(request, name);
        return Optional.ofNullable(nullableCookie);
    }

    private Authentication getAuthentication(String accessToken, UserInfo userInfo) {
        List<SimpleGrantedAuthority> authorities = jwtService.getAuthorities(accessToken);
        return new UsernamePasswordAuthenticationToken(userInfo.getSubject(), userInfo, authorities);
    }
}
