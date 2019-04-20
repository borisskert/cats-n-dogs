package com.github.borisskert.example.springboot.swagger;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "swagger")
public class SwaggerProperties {

    private String resourceLocation;

    private List<SwaggerResource> resources;

    public String getResourceLocation() {
        return resourceLocation;
    }

    public void setResourceLocation(String resourceLocation) {
        this.resourceLocation = resourceLocation;
    }

    public List<SwaggerResource> getResources() {
        return resources;
    }

    public void setResources(List<SwaggerResource> resources) {
        this.resources = resources;
    }

    public static class SwaggerResource {

        private String name;
        private String swaggerVersion;
        private String location;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getSwaggerVersion() {
            return swaggerVersion;
        }

        public void setSwaggerVersion(String swaggerVersion) {
            this.swaggerVersion = swaggerVersion;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }
    }
}
