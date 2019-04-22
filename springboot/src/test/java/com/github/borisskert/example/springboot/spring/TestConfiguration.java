package com.github.borisskert.example.springboot.spring;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
// https://stackoverflow.com/questions/46463908/unable-to-start-servletwebserverapplicationcontext-due-to-missing-servletwebserv
@EnableAutoConfiguration
@ComponentScan(basePackages = {"com.github.borisskert.example.springboot"})
public class TestConfiguration {
}
