package com.github.borisskert.example.springboot.authentication.controller;

import com.github.borisskert.example.springboot.authentication.service.AuthenticationService;
import com.github.borisskert.example.springboot.authentication.service.CookieService;
import com.github.borisskert.example.springboot.swagger.SwaggerDocumented;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth/logout")
@SwaggerDocumented
public class LogoutResource {

    private final AuthenticationService authenticationService;
    private final CookieService cookieService;

    @Autowired
    public LogoutResource(
            AuthenticationService authenticationService,
            CookieService cookieService
    ) {
        this.authenticationService = authenticationService;
        this.cookieService = cookieService;
    }

    @PostMapping
    public void logout(
            HttpServletResponse response
    ) {
        authenticationService.logout();
        response.addCookie(cookieService.expireAccessTokenCookie());
        response.addCookie(cookieService.expireRefreshTokenCookie());
    }
}
