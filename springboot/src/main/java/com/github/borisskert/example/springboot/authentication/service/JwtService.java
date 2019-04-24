package com.github.borisskert.example.springboot.authentication.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.borisskert.example.springboot.authentication.AuthenticationProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JwtService {

    private final JWTVerifier jwtVerifier;

    @Autowired
    public JwtService(
            AuthenticationProperties properties,
            RemoteKeyProviderService keyProviderService
    ) {
        Algorithm algorithm = Algorithm.RSA256(keyProviderService);
        this.jwtVerifier = JWT.require(algorithm)
                .withIssuer(properties.getIssuer())
                .build();
    }

    public List<SimpleGrantedAuthority> getAuthorities(DecodedJWT decodedToken) {
        Map<String, Claim> claims = decodedToken.getClaims();

        Map<String, Object> realmAccess = claims.get("realm_access").asMap();

        @SuppressWarnings("unchecked")
        List<String> realmRoles = (List) realmAccess.get("roles");

        return realmRoles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public Optional<DecodedJWT> tryToDecodeVerified(String accessToken) {
        try {
            DecodedJWT decodedToken = jwtVerifier.verify(accessToken);
            return Optional.of(decodedToken);
        } catch (AlgorithmMismatchException | SignatureVerificationException | TokenExpiredException | InvalidClaimException e) {
            return Optional.empty();
        }
    }

    public DecodedJWT decodeVerified(String accessToken) throws JWTVerificationException {
        return jwtVerifier.verify(accessToken);
    }
}
