package com.github.borisskert.example.springboot.authentication.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JwtService {

    public List<SimpleGrantedAuthority> getAuthorities(String accessToken) {
        List.of();
        DecodedJWT decodedJwt = JWT.decode(accessToken);
        Map<String, Claim> claims = decodedJwt.getClaims();

        Map<String, Object> realmAccess = claims.get("realm_access").asMap();

        @SuppressWarnings("unchecked")
        List<String> realmRoles = (List)realmAccess.get("roles");

        return realmRoles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
