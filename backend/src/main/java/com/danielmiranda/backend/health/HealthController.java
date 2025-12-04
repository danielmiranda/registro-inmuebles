package com.danielmiranda.backend.health;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Endpoint básico de salud del backend.
 *
 * GET /health -> { "status": "UP", "timestamp": "...", "app": "..." }
 */
@RestController
public class HealthController {

    @Value("${spring.application.name:backend}")
    private String appName;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> body = new HashMap<>();
        body.put("status", "UP");
        body.put("timestamp", OffsetDateTime.now().toString());
        body.put("app", appName);
        return ResponseEntity.ok(body);
    }
}
