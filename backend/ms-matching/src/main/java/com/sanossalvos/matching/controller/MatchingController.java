package com.sanossalvos.matching.controller;

import com.sanossalvos.matching.dto.MatchRequestDTO;
import com.sanossalvos.matching.dto.MatchResultDTO;
import com.sanossalvos.matching.service.MatchingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/matching")
public class MatchingController {

    private final MatchingService service;

    public MatchingController(MatchingService service) {
        this.service = service;
    }

    @PostMapping("/check")
    public List<MatchResultDTO> check(@RequestBody MatchRequestDTO request) {
        return service.findMatches(request);
    }

    @GetMapping("/test")
    public String test() {
        return "Matching service is running!";
    }
}
