package com.codewithjj.wasteless.config;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TomcatConfig {

    @Bean
    public TomcatServletWebServerFactory tomcatServletWebServerFactory() {
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();

        factory.addConnectorCustomizers(connector -> {
            connector.setMaxParameterCount(10000); // for total param count, optional
        });

        // This won't set FileCountMax, so you need a custom MultipartResolver
        return factory;
    }
}

