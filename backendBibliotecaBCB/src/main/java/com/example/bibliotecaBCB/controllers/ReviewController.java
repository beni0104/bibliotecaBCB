package com.example.bibliotecaBCB.controllers;


import com.example.bibliotecaBCB.data.dto.ReviewDTO;
import com.example.bibliotecaBCB.data.entity.Review;
import com.example.bibliotecaBCB.data.service.ReviewService;
import com.example.bibliotecaBCB.security.jwt.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final JwtUtils jwtUtils;

    public ReviewController(ReviewService reviewService, JwtUtils jwtUtils) {
        this.reviewService = reviewService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Review>> getAllReviews(){
        return ResponseEntity.ok(reviewService.findAll());
    }

    @PostMapping("/create")
    public ResponseEntity<Review> createReview(@RequestBody ReviewDTO reviewDTO){
        Review review = new Review(reviewDTO.getRating(), reviewDTO.getDescription());
        reviewService.save(review);
        return ResponseEntity.ok(review);
    }

}
