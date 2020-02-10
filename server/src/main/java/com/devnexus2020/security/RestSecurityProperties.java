package com.devnexus2020.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties("security")
@Data
public class RestSecurityProperties {

    List<String> alloweddomains;
    List<String> allowedheaders;
    List<String> allowedmethods;
    List<String> allowedpublicapis;
}