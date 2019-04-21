package com.github.borisskert.example.springboot.authentication.controller;

import com.github.borisskert.example.springboot.authentication.model.AuthenticationToken;
import com.github.borisskert.example.springboot.authentication.model.LoginCredentials;
import com.github.borisskert.example.springboot.authentication.service.AuthenticationService;
import com.github.borisskert.example.springboot.authentication.service.CookieService;
import com.github.borisskert.example.springboot.swagger.SwaggerDocumented;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@RestController
@RequestMapping("/auth/login")
@SwaggerDocumented
public class LoginResource {

    private final AuthenticationService authenticationService;
    private final CookieService cookieService;

    @Autowired
    public LoginResource(AuthenticationService authenticationService, CookieService cookieService) {
        this.authenticationService = authenticationService;
        this.cookieService = cookieService;
    }

    @PostMapping
    public void login(
            @RequestBody LoginCredentials credentials,
            HttpServletResponse response
    ) {
        Optional<AuthenticationToken> maybeToken = authenticationService.tryToLogin(credentials);

        if (maybeToken.isPresent()) {
            AuthenticationToken authenticationToken = maybeToken.get();
            response.addCookie(cookieService.createAccessTokenCookie(authenticationToken.getAccessToken(), authenticationToken.getExpiresIn()));
            response.addCookie(cookieService.createRefreshTokenCookie(authenticationToken.getRefreshToken(), authenticationToken.getRefreshExpiresIn()));
        } else {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
    }
}
