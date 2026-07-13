package com.sanossalvos.petreport.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configurar para servir imágenes desde la carpeta uploads/
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/", "file:/app/uploads/");
    }
}