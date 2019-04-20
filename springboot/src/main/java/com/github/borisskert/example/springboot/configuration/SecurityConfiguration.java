package com.github.borisskert.example.springboot.configuration;

import com.github.borisskert.example.springboot.authentication.filter.AuthenticationFilter;
import com.github.borisskert.example.springboot.swagger.SwaggerProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final AuthenticationFilter authenticationFilter;
    private final SwaggerProperties swaggerProperties;

    @Autowired
    public SecurityConfiguration(AuthenticationFilter authenticationFilter, SwaggerProperties swaggerProperties) {
        this.authenticationFilter = authenticationFilter;
        this.swaggerProperties = swaggerProperties;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors()
                    .configurationSource(corsConfigurationSource())
                    .and()
                .authorizeRequests()
                    // https://stackoverflow.com/questions/53442381/cors-policy-no-access-control-allow-origin-header-is-present-on-the-requested
                    .antMatchers(HttpMethod.OPTIONS).permitAll()
                    .antMatchers(
                        "/",
                        "/auth/login"
                    ).permitAll()
                    .anyRequest().authenticated()
                    .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                .addFilterBefore(authenticationFilter, BasicAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(
                swaggerProperties.getResourceLocation() + "/**",
                "/v2/api-docs",
                "/swagger-resources",
                "/swagger-resources/configuration/ui",
                "/swagger-resources/configuration/security",
                "/swagger-ui.html",
                "/webjars/**"
        );
    }

    private CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", getCorsConfiguration());

        return source;
    }

    private CorsConfiguration getCorsConfiguration() {
        final CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Collections.singletonList("*"));
        configuration.setAllowedMethods(Collections.singletonList("*"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        configuration.setAllowCredentials(true);

        return configuration;
    }
}
