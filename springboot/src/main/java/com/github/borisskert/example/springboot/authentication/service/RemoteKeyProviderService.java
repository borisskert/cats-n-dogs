package com.github.borisskert.example.springboot.authentication.service;

import com.auth0.jwt.interfaces.RSAKeyProvider;
import com.github.borisskert.example.springboot.authentication.AuthenticationProperties;
import com.github.borisskert.example.springboot.authentication.exception.KeyProviderException;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.KeySourceException;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKMatcher;
import com.nimbusds.jose.jwk.JWKSelector;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.List;

@Service
public class RemoteKeyProviderService implements RSAKeyProvider {

    private final AuthenticationProperties properties;
    private final SpringResourceRetriever resourceRetriever;
    private final JWKSource<SecurityContext> jwkSource;

    @Autowired
    public RemoteKeyProviderService(
            AuthenticationProperties properties,
            SpringResourceRetriever resourceRetriever
    ) {
        this.properties = properties;
        this.resourceRetriever = resourceRetriever;
        this.jwkSource = buildJwkSource();
    }

    private JWKSource<SecurityContext> buildJwkSource() {
        URL certsUrl;
        try {
            certsUrl = new URL(properties.getCertsUri());
        } catch (MalformedURLException e) {
            throw new KeyProviderException(e);
        }
        return new RemoteJWKSet<>(certsUrl, resourceRetriever);
    }

    @Override
    public RSAPublicKey getPublicKeyById(String keyId) {
        JWKSelector jwkSelector = buildKeySelector(keyId);
        List<JWK> jwkSet = retrieveJwkSet(jwkSelector);

        JWK jwk = jwkSet.get(0);
        if (jwk instanceof RSAKey) {
            try {
                return ((RSAKey) jwk).toRSAPublicKey();
            } catch (JOSEException e) {
                throw new KeyProviderException(e);
            }
        } else {
            throw new KeyProviderException("Found key is not of type 'RSAKey'");
        }
    }

    private List<JWK> retrieveJwkSet(JWKSelector jwkSelector) {
        try {
            return jwkSource.get(jwkSelector, null);
        } catch (KeySourceException e) {
            throw new KeyProviderException(e);
        }
    }

    private JWKSelector buildKeySelector(String keyId) {
        JWKMatcher matcher = new JWKMatcher.Builder()
                .keyID(keyId)
                .build();
        return new JWKSelector(matcher);
    }

    @Override
    public RSAPrivateKey getPrivateKey() {
        return null;
    }

    @Override
    public String getPrivateKeyId() {
        return null;
    }
}
