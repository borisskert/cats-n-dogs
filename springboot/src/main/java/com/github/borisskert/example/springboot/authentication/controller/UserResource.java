package com.github.borisskert.example.springboot.authentication.controller;

import com.github.borisskert.example.springboot.swagger.SwaggerDocumented;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/user")
@SwaggerDocumented
public class UserResource {

    @GetMapping
    public Principal user(Principal principal) {
        return principal;
    }
}
