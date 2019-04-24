package com.github.borisskert.example.springboot.authentication;

import org.hibernate.validator.constraints.URL;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Component
@ConfigurationProperties(prefix = "application.authentication")
@Validated
public class AuthenticationProperties {

    @NotNull
    @Size(min = 1)
    private String clientId;

    @NotNull
    @Size(min = 1)
    private String clientSecret;

    @NotNull
    @Size(min = 1)
    @URL
    private String accessTokenUri;

    @NotNull
    @Size(min = 1)
    @URL
    private String userInfoUri;

    @NotNull
    @Size(min = 1)
    @URL
    private String endSessionEndpoint;

    @NotNull
    @Size(min = 1)
    private String issuer;

    @NotNull
    @Size(min = 1)
    @URL
    private String certsUri;

    private Boolean useSecureCookies = true;

    @NotNull
    @Valid
    private UserInfoCacheProperties userInfoCache;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getAccessTokenUri() {
        return accessTokenUri;
    }

    public void setAccessTokenUri(String accessTokenUri) {
        this.accessTokenUri = accessTokenUri;
    }

    public String getUserInfoUri() {
        return userInfoUri;
    }

    public void setUserInfoUri(String userInfoUri) {
        this.userInfoUri = userInfoUri;
    }

    public String getEndSessionEndpoint() {
        return endSessionEndpoint;
    }

    public void setEndSessionEndpoint(String endSessionEndpoint) {
        this.endSessionEndpoint = endSessionEndpoint;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public String getCertsUri() {
        return certsUri;
    }

    public void setCertsUri(String certsUri) {
        this.certsUri = certsUri;
    }

    public Boolean getUseSecureCookies() {
        return useSecureCookies;
    }

    public void setUseSecureCookies(Boolean useSecureCookies) {
        this.useSecureCookies = useSecureCookies;
    }

    public UserInfoCacheProperties getUserInfoCache() {
        return userInfoCache;
    }

    public void setUserInfoCache(UserInfoCacheProperties userInfoCache) {
        this.userInfoCache = userInfoCache;
    }

    public static class UserInfoCacheProperties {

        @NotNull
        @Min(1)
        private Integer maxEntries;

        @NotNull
        @Min(1)
        private Long expiryInSeconds;

        public Integer getMaxEntries() {
            return maxEntries;
        }

        public void setMaxEntries(Integer maxEntries) {
            this.maxEntries = maxEntries;
        }

        public Long getExpiryInSeconds() {
            return expiryInSeconds;
        }

        public void setExpiryInSeconds(Long expiryInSeconds) {
            this.expiryInSeconds = expiryInSeconds;
        }
    }
}
