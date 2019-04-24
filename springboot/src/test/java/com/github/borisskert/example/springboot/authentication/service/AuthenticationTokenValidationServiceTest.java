package com.github.borisskert.example.springboot.authentication.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.github.borisskert.example.springboot.authentication.model.AuthenticationToken;
import com.github.borisskert.example.springboot.authentication.model.AuthenticationTokenValidation;
import com.github.borisskert.example.springboot.authentication.model.UserInfo;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.hamcrest.core.IsSame.sameInstance;
import static org.mockito.Mockito.when;

public class AuthenticationTokenValidationServiceTest {

    private static final String MY_ACCESS_TOKEN = "my access token";
    private static final String MY_REFRESH_TOKEN = "my refresh token";
    private static final String MY_REFRESHED_ACCESS_TOKEN = "my refreshed access token";
    private static final String MY_REFRESHED_REFRESH_TOKEN = "my refreshed refresh token";

    private AuthenticationTokenValidationService validationService;

    @Mock
    AuthenticationService authenticationService;

    @Mock
    AuthenticationToken refreshedAuthenticationToken;

    @Mock
    UserInfo userInfoForAccessToken;

    @Mock
    UserInfo userInfoForRefreshedAccessToken;

    @Mock
    JwtService jwtService;

    @Mock
    DecodedJWT decodedJWT;

    @Mock
    UserInfoService userInfoService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        when(refreshedAuthenticationToken.getAccessToken()).thenReturn(MY_REFRESHED_ACCESS_TOKEN);
        when(refreshedAuthenticationToken.getRefreshToken()).thenReturn(MY_REFRESHED_REFRESH_TOKEN);

        validationService = new AuthenticationTokenValidationService(authenticationService, userInfoService, jwtService);
    }

    @Test
    public void shouldReturnInvalidWhenAccessTokenAndRefreshTokenNull() {
        AuthenticationTokenValidation validation = validationService.validate(null, null);
        assertThat(validation.isValid(), is(false));
        assertThat(validation.getValidatedRefreshAccessToken(), is(equalTo(null)));
    }

    @Test
    public void shouldReturnInvalidWhenTokenVerifierFailsAndRefreshTokenIsNull() {
        when(jwtService.tryToDecodeVerified(MY_ACCESS_TOKEN)).thenReturn(Optional.empty());

        AuthenticationTokenValidation validation = validationService.validate(MY_ACCESS_TOKEN, null);
        assertThat(validation.isValid(), is(false));
        assertThat(validation.getValidatedRefreshAccessToken(), is(equalTo(null)));
    }

    @Test
    public void shouldReturnValidWhenTokenVerifierSucceedAndRefreshTokenIsNull() {
        when(decodedJWT.getToken()).thenReturn(MY_ACCESS_TOKEN);
        when(jwtService.tryToDecodeVerified(MY_ACCESS_TOKEN)).thenReturn(Optional.of(decodedJWT));
        when(userInfoService.retrieveUserInfo(MY_ACCESS_TOKEN)).thenReturn(userInfoForAccessToken);

        AuthenticationTokenValidation validation = validationService.validate(MY_ACCESS_TOKEN, null);
        assertThat(validation.isValid(), is(true));
        assertThat(validation.isHasBeenRefreshed(), is(false));
        assertThat(validation.getUserInfo(), is(sameInstance(userInfoForAccessToken)));
        assertThat(validation.getValidatedRefreshAccessToken(), is(equalTo(null)));
    }

    @Test
    public void shouldReturnRefreshedWhenVerifierFailsForAccessTokenAndRefreshTokenIsValid() {
        when(jwtService.tryToDecodeVerified(MY_ACCESS_TOKEN)).thenReturn(Optional.empty());
        when(userInfoService.retrieveUserInfo(MY_REFRESHED_ACCESS_TOKEN)).thenReturn(userInfoForRefreshedAccessToken);
        when(authenticationService.tryToRefresh(MY_REFRESH_TOKEN)).thenReturn(Optional.of(refreshedAuthenticationToken));

        AuthenticationTokenValidation validation = validationService.validate(MY_ACCESS_TOKEN, MY_REFRESH_TOKEN);

        assertThat(validation.isValid(), is(true));
        assertThat(validation.isHasBeenRefreshed(), is(true));
        assertThat(validation.getRefreshedAuthenticationToken(), is(sameInstance(refreshedAuthenticationToken)));
        assertThat(validation.getUserInfo(), is(sameInstance(userInfoForRefreshedAccessToken)));
        assertThat(validation.getValidatedRefreshAccessToken(), is(equalTo(MY_REFRESHED_REFRESH_TOKEN)));
    }

    @Test
    public void shouldReturnInvalidWhenVerifierFailsForAccessTokenAndRefreshTokenIsInvalid() {
        when(jwtService.tryToDecodeVerified(MY_ACCESS_TOKEN)).thenReturn(Optional.empty());
        when(authenticationService.tryToRefresh(MY_REFRESH_TOKEN)).thenReturn(Optional.empty());

        AuthenticationTokenValidation validation = validationService.validate(MY_ACCESS_TOKEN, MY_REFRESH_TOKEN);

        assertThat(validation.isValid(), is(false));
        assertThat(validation.isHasBeenRefreshed(), is(false));
        assertThat(validation.getValidatedRefreshAccessToken(), is(equalTo(MY_REFRESH_TOKEN)));
    }

    @Test
    public void shouldReturnRefreshedWhenAccessTokenIsNullAndRefreshTokenIsValid() {
        when(userInfoService.retrieveUserInfo(MY_REFRESHED_ACCESS_TOKEN)).thenReturn(userInfoForRefreshedAccessToken);
        when(authenticationService.tryToRefresh(MY_REFRESH_TOKEN)).thenReturn(Optional.of(refreshedAuthenticationToken));

        AuthenticationTokenValidation validation = validationService.validate(null, MY_REFRESH_TOKEN);

        assertThat(validation.isValid(), is(true));
        assertThat(validation.isHasBeenRefreshed(), is(true));
        assertThat(validation.getRefreshedAuthenticationToken(), is(sameInstance(refreshedAuthenticationToken)));
        assertThat(validation.getUserInfo(), is(sameInstance(userInfoForRefreshedAccessToken)));
        assertThat(validation.getValidatedRefreshAccessToken(), is(equalTo(MY_REFRESHED_REFRESH_TOKEN)));
    }

    @Test
    public void shouldReturnInvalidWhenAccessTokenIsNullAndRefreshTokenIsInvalid() {
        when(userInfoService.retrieveUserInfo(MY_REFRESHED_ACCESS_TOKEN)).thenReturn(userInfoForRefreshedAccessToken);
        when(authenticationService.tryToRefresh(MY_REFRESH_TOKEN)).thenReturn(Optional.empty());

        AuthenticationTokenValidation validation = validationService.validate(null, MY_REFRESH_TOKEN);

        assertThat(validation.isValid(), is(false));
        assertThat(validation.isHasBeenRefreshed(), is(false));
        assertThat(validation.getValidatedRefreshAccessToken(), is(equalTo(MY_REFRESH_TOKEN)));
    }
}
