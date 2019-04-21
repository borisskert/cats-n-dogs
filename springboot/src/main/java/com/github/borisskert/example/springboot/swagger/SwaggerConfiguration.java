package com.github.borisskert.example.springboot.swagger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.InMemorySwaggerResourcesProvider;
import springfox.documentation.swagger.web.SwaggerResourcesProvider;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * https://github.com/springfox/springfox/issues/2291
 */
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    private final SwaggerProperties properties;

    @Autowired
    public SwaggerConfiguration(SwaggerProperties properties) {
        this.properties = properties;
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(SwaggerDocumented.class))
                .paths(PathSelectors.any())
                .build();
    }

    @Bean
    WebMvcConfigurer configurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                properties.getResources().stream()
                        .map(SwaggerProperties.SwaggerResource::getLocation)
                        .forEach(resource -> registry.addResourceHandler(resource)
                                .addResourceLocations("classpath:" + properties.getResourceLocation()
                                )
                        );
            }
        };
    }

    @Primary
    @Bean
    public SwaggerResourcesProvider swaggerResourcesProvider(InMemorySwaggerResourcesProvider defaultResourcesProvider) {
        return () -> {
            List<springfox.documentation.swagger.web.SwaggerResource> swaggerResources = new ArrayList<>(defaultResourcesProvider.get());
            swaggerResources.addAll(createSwaggerResources());

            return swaggerResources;
        };
    }

    private List<springfox.documentation.swagger.web.SwaggerResource> createSwaggerResources() {
        return properties.getResources()
                .stream().map(swaggerResource -> {
                    springfox.documentation.swagger.web.SwaggerResource wsResource = new springfox.documentation.swagger.web.SwaggerResource();
                    wsResource.setName(swaggerResource.getName());
                    wsResource.setSwaggerVersion(swaggerResource.getSwaggerVersion());
                    wsResource.setLocation(swaggerResource.getLocation());

                    return wsResource;
                }).collect(Collectors.toList());
    }
}
