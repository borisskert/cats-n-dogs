package com.github.borisskert.example.springboot.authentication.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represents the user-info got from IDP. Should never be created manually.
 */
public class UserInfo {
    @JsonProperty("sub")
    private String subject;

    @JsonProperty("name")
    private String name;

    @JsonProperty("preferred_username")
    private String username;

    @JsonProperty("given_name")
    private String givenName;

    @JsonProperty("family_name")
    private String familyName;

    @JsonProperty("email")
    private String email;

    public String getSubject() {
        return subject;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getGivenName() {
        return givenName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public String getEmail() {
        return email;
    }
}
