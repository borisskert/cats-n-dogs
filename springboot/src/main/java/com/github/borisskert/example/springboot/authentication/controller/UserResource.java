package com.github.borisskert.example.springboot.authentication.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserResource {

    @GetMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }
}
